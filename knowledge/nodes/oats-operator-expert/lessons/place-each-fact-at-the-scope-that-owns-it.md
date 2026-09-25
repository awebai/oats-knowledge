---
type: Lesson
title: Place each fact at the scope that owns it — organisation-wide in the workspace, host facts in the uncommitted local file, single-holder facts at spawn — and let meaning, not type, break ties
description: A deployment has three legal surfaces for configuration facts and the docs say what each accepts, not which one a given fact belongs to. Place by ownership scope, and when a fact is legal in two homes let its meaning (who may hold it) decide, not its type (path, string, flag).
tags: [lesson, operator, placement, workspace, local-file, spawn, blast-radius, rebuild, messaging-seat]
timestamp: 2026-09-23
---

Judgement formed 2026-09-23 by the OSS coordinator while moving host paths out of
the old config chain during a two-team rebuild.

# Rule

A rebuilt deployment offers exactly three legal homes for a configuration fact,
and each has one owner:

1. **The shared workspace definition** (committed, read by every machine and
   every member) owns **organisation-wide facts**: which repos are members,
   which package versions everyone runs, the team labels, the defaults every
   soul inherits, the declared messaging intent per label.
2. **The uncommitted local file** on each machine owns **host facts**: absolute
   paths, where a member clone actually sits on this disk, machine-level
   provider settings such as the knowledge state directory or a delivery mode.
   These never enter the committed file, and during a rebuild this is where
   they *move to* from the retired config chain — not "somewhere sensible", here.
3. **The spawn** owns **single-holder, per-instance facts**: anything that is
   true of one instance and must not become true of the next instance of the
   same soul.

The placement question is therefore never "does this file accept this fact?"
(it usually does, or it refuses loudly) but **"who else would this fact reach
if I put it here?"** Choose the narrowest home whose scope matches the set of
holders the fact is meant to have.

# Why the docs are not enough

The repository documentation describes each surface's grammar and its merge
position, and it states one hard refusal (no absolute paths in the shared
workspace file — the kernel node owns that rationale and the merge order; route
questions about *why* there). What it cannot state is the classification of a
fact the operator is holding in their hands, because the same fact is often
grammatically legal in two homes. A competent operator reading the schemas will
correctly reject the illegal home and then pick between the two legal ones by
**type** — "it is an absolute path, paths are host facts, host facts go in the
local file". That reasoning is sound and produces a wrong deployment.

# The tie-breaker: meaning over type

The case that formed this judgement was a retained messaging seat. Its value is
an absolute path on one machine, so by type it is a host fact and the local
file is a legal home. But a seat can be **held once**. Its meaning is
per-instance: exactly one running instance is that identity, and every other
instance of the same soul — and of every other messaging soul — must mint
fresh. A machine-level placement would hand the seat to every instance of every
messaging soul spawned on that host; the file accepts it, nothing refuses it,
and the first two instances to come up would share an identity nobody meant to
share. The seat belongs on the spawn, recorded against that one instance,
regardless of what its value looks like.

So when two homes are legal, ask what the fact **means** — how many holders it
is allowed to have — and ignore what it **is**. Type is a floor (it rules out
the illegal home); meaning picks among the rest. See the sibling decision on
why the custody *directory* for a resident identity is nonetheless a host fact:
[resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md)
— the directory is about where a machine keeps things; the seat is about who
holds one of them.

# What goes wrong

- **Host fact committed to the workspace.** Refused at the schema level for
  paths, but a machine-level provider setting that is *not* a path can slip
  into the shared defaults and silently become policy for every member on
  every machine — see
  [the installed provider is the authority for a setting](/nodes/oats-operator-expert/lessons/the-installed-provider-is-the-authority-for-a-setting.md)
  for how to find out what a setting even does before deciding where it lives.
- **Per-instance fact placed at machine level.** Legal, accepted, and the
  blast radius is every future spawn on that host. The retained seat is the
  canonical example; anything that names one identity, one lease, one
  external registration behaves the same way.
- **Organisation fact placed locally.** Each machine drifts independently and
  the outside verifier of the rebuild finds two deployments that "run the same
  workspace" and disagree — the check in
  [outsider verification of a rebuild](/nodes/oats-operator-expert/playbooks/outsider-verification-of-a-rebuild.md)
  surfaces exactly this.

# Consequences for a rebuild

Walk the retired config chain fact by fact and classify each one by holder
count before touching the new files: everyone → workspace; this machine →
local file; this one instance → spawn. Do it in that order so the shared file
is settled before per-machine work begins (the cutover sequencing playbook,
[cutover is sequenced per deployment](/nodes/oats-operator-expert/playbooks/cutover-is-sequenced-per-deployment.md),
depends on it). Use the spawn preview as the check: the merged payload it shows
is what the provider will receive for *that* instance — if a single-holder fact
appears there for an instance that should not hold it, the fact is one scope
too wide. The clean-v2 rationale behind having three surfaces at all is in
[workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md).

Two special cases of the same rule have their own concepts: the disclosure
audience of the member list itself
([private member requires a private workspace host](/nodes/oats-operator-expert/decisions/private-member-requires-a-private-workspace-host.md))
and the deployment-bounded messaging root
([messaging root placement decides the team](/nodes/oats-operator-expert/lessons/messaging-root-placement-decides-the-team.md)).

# Citations

- [`docs/rebuild-to-v2.md` at v0.25.9](https://github.com/awebai/oats/blob/v0.25.9/docs/rebuild-to-v2.md) (removed from the current tree by the 0.26.0 legacy sweep; the current homes are `docs/packages.md` "Declaring packages" and `docs/configuration.md`) — the rationale paragraphs of the local-file step
  ("move host paths … here", "do not commit") and the retained-seat step
  ("because it is an absolute path it is a fact about one machine … prefer the
  spawn form: a machine-level setting would give the seat to every instance of
  every messaging soul on that machine, and a seat can be held once"), and the
  "What disappears" table's three-way replacement of the old config chain
  (0.25.x rebuild round, decision 14 of workspace-model-v2).
