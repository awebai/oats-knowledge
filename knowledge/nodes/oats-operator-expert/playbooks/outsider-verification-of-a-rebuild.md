---
type: Playbook
title: "Outsider verification of a rebuild: an operator who did not write the guide reproduces the topology on a scratch rig against the published combination and verifies by positive enumeration"
description: A rebuild guide is accepted only when an outside operator, holding none of the authoring state, reproduces the target topology on a scratch rig against the published combination and walks an ordered invariant list by positive enumeration. Passes on working trees or half-published cross-package fixes are rehearsals, not acceptances.
tags: [playbook, operator, rebuild, verification, migration, acceptance, published-combination, positive-enumeration]
timestamp: 2026-09-25
---

Method formed 2026-09-23/24 by the OSS coordinator and an outside operator
over four consecutive outsider runs on a two-team scratch rig; the last run
declared PASS 2026-09-24. The method is chartered in
[the roster amendment](/nodes/oats-expert/decisions/roster-amendment-operator-and-integration-experts.md).

# Rule

A rebuild or migration guide is **accepted** only when three conditions hold
at once:

1. **The verifier is not the author.** An outside operator — one who holds
   none of the authoring state (no working tree of the kernel, no memory of
   what the guide "means") — reproduces the target topology on a scratch rig,
   from the guide alone.
2. **The combination is the published one.** Kernel from the registry,
   packages resolved from the catalog at their pinned commits, the lock
   written the way a real deployment writes it. A pass on git working trees, or on a
   kernel half published while the provider half is still git-pinned (or the
   reverse), is a *rehearsal*. When a fix lands in halves across kernel and
   provider, the deployment stays blocked until both halves are on their
   published channel and verified together.
3. **Verification is positive enumeration, in order,** before the first real
   spawn — not "nothing refused, so it worked".

Only a pass under all three unblocks dependent rebuilds. Record the
combination that passed in a Citations section, never in the rule.

# Why

**No tooling checks a guide's behavioural claims.** The validator checks the
guide's examples against schemas; nothing checks that a sentence about what
the kernel or a provider *does* has a consumer in code. The first outsider run
found a documented lookup order the kernel did not honour and payload keys the
guide named that no shipped provider read. The outsider is the only check that
exists for claims, so the guide must be treated as a contract and each claim
exercised.

**Authors pass their own guides.** An author's rig carries the state the guide
omits — a clone already at the right place, a lock already written, a
provider already at the intended rather than the shipped version. The
outsider's scratch rig has none of it, which is exactly why it finds the gaps.
This is the same judgement as
[the installed provider is the authority for a setting](/nodes/oats-operator-expert/lessons/the-installed-provider-is-the-authority-for-a-setting.md):
write and verify what the shipped provider reads, not the intended grammar.

**Migration failures are silent omissions, not refusals.** A clean v2 without
a converter refuses old *schemas* loudly, but the things that go wrong in a
rebuild do not refuse:

- a soul left at the old path is invisible to listing and to spawn; nothing
  warns;
- an unlabelled soul receives only the base payload and lands outside every
  team-addressed block; nothing refuses it;
- a repo test or CI check that enumerates the old soul path keeps passing on
  an empty match;
- a payload key the guide names may be delivered by the kernel and ignored by
  the provider — the preview shows it arrived, the provider does nothing with
  it.

Absence of errors therefore proves nothing. Only listing what *should* exist
and confirming each item does — souls with origin and team, capabilities with
origin, the merged payload per provider with the host facts visibly present —
catches omission.

# The invariant list

A passing rebuild demonstrates these, in this order, on the scratch rig:

1. Member clones resolve at `<deployment>/<member-repo>` with no flags, and a
   deliberately wrong clone entry is **refused**, not silently used.
2. Every package syncs non-interactively from the catalog at its pinned
   commit (a scripted rebuild must be possible); the lock records the
   package's integrity and capability list, and the kernel refuses an edited
   capability list or a tampered integrity (`E_PACKAGE_INTEGRITY`) and a
   stale entry for a package the workspace no longer declares
   (`E_PACKAGE_MISSING`). Kernels before 0.26.0 additionally required a
   per-version executable approval at this step; a lock written by 0.26.0
   is refused by those kernels, so the rig's kernel and its lock belong to
   one deployment directory.
3. A spawned instance carries **exactly one** kernel identity block; two means
   the core module did not resolve.
4. Soul-source drift appears in status after a member commit — information,
   not a fault.
5. The composed provider settings preview shows the per-team selection with
   local delivery applied and the team map stripped; the fresh state directory
   and the team block have visibly arrived.
6. A workspace-mode spawn records modules at pinned commits and soul identity
   as `<repo-key>#<soul>`; the knowledge owner pin is that identity, not a
   path.
7. A second spawn of the same soul after a member commit and sync keeps the
   **same owner**; the owner record is unchanged and both per-commit soul
   directories are present.
8. Retire removes the home **and** any scheduled jobs the instance owned;
   nothing is left for an operator to clean by hand.

Items 6–7 are where a half-published fix hides: the kernel half can pass alone
and the deployment still fails on the provider half. See also
[rebuild starts fresh provider state](/nodes/oats-operator-expert/playbooks/rebuild-starts-fresh-provider-state.md).

# What goes wrong without it

Dependent rebuilds start on a guide that describes behaviour nobody shipped;
the first real spawn of a knowledge-owning soul is refused, or worse, a soul
quietly spawns outside its team with a dead scheduler row left behind on
retire. Each such finding costs a full swarm round and a release. Four
outsider runs found ten disagreements before the first PASS; every one would
otherwise have surfaced in a production deployment.

# Consequences

- Treat the rebuild guide as a contract: each behavioural claim gets a test on
  the kernel side, and the outsider exercises the whole against the published
  combination.
- Sequence cutover so no deployment depends on a combination that has not
  passed — see
  [cutover is sequenced per deployment](/nodes/oats-operator-expert/playbooks/cutover-is-sequenced-per-deployment.md).
- Tell the outsider which remote identity records are pending staleness from
  earlier teardowns, so they are not read as leftovers — see
  [self-custodial identities retire from inside the home](/nodes/oats-operator-expert/lessons/self-custodial-identity-retires-from-inside-the-home.md).
- A rehearsal on working trees is still valuable; it is simply not the
  acceptance and must be labelled so.

See also [second-operator acceptance](/nodes/oats-expert/lessons/second-operator-acceptance.md),
the maintainer's standing gate for published definitions — why an operator
without authoring state is the gate, its exit criterion and how to classify
its failures; this playbook is the operator's concrete method for running
that gate on a rebuild (scratch rig, published combination, ordered
invariant list).

# Citations

- oats-expert stewardship delivery log, entries 2026-09-23 and 2026-09-24
  (outsider runs R1–R10; verifications on kernel 0.25.2 at `3a57d06c`,
  0.25.3 + git-pinned oats.okf `a52082f`, and the published combination
  kernel 0.25.5 + catalog oats.okf v2.1.4 `2af47ad3` + oats.aweb v1.12.0
  `9d8cc740`, declared PASS).
- `docs/rebuild-to-v2.md` (rationale for the soul-move, team-label,
  fresh-state-directory and preview steps).
