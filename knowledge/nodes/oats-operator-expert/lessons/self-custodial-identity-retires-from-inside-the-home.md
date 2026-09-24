---
type: Lesson
title: "Retire ordering for self-custodial identities: de-register from inside the home before removing it, and treat stranded-record cleanup as a deferred re-check"
description: When an instance's external identity is self-custodial (its signing key lives in the instance home), retire must stop the runtime, self-delete the identity from inside the home, and only then remove the directory. If that step was skipped, the stranded remote record is liveness-guarded and cleaned by one scheduled re-check after the staleness window, never by an immediate roster check or a retry loop.
tags: [lesson, operator, lifecycle, retire, identity, custody, messaging, roster-hygiene, teardown]
timestamp: 2026-07-08
---

Judgement formed 2026-07-08 by the maintainer after a live probe on a hosted
messaging team; adopted as operator content in the 2026-09-24 seeding.

# Rule

For any capability whose external identity is **self-custodial** — the
credential that proves "this is `<resident>`" is a signing key stored inside
the instance home — the retire sequence is fixed and asymmetric:

1. Stop the runtime (the session, window, or process that heartbeats).
2. From **inside the instance home**, have the instance de-register its own
   identity with the remote service. This is the only path that is
   immediate: it is authenticated by the key the home still holds.
3. Only then remove the directory.

Never the reverse. Never "simplify" it to a plain directory removal during a
rebuild, a cleanup pass, or a botched-spawn tidy-up. This is not a
one-provider rule: it applies to every capability that places an identity
in the instance home, and it applies again each time such a capability is
added to a deployment.

# Why

The instance home is the custody boundary for the identity. Delete the
directory first and the credential that could have retired the remote record
immediately no longer exists anywhere — the operator has not retired the
resident, they have orphaned it. From the service's point of view a silent
member is indistinguishable from one whose machine is merely offline, so it
refuses a third party's delete until it has observed heartbeat silence for
its staleness window. The kernel-side principle is the same one recorded in
[preserve authority until cleanup is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md):
do not destroy the thing that holds authority before the cleanup it
authorises has actually happened.

Two consequences follow that operators reading the docs consistently get
wrong:

- **Stranded-record cleanup is deferred by design, not by failure.** A
  remote delete of a record the service still considers active is refused
  with a "still active" answer. That answer means *not stale yet*. It is not
  a permissions problem, not a transient error, and not something a retry
  loop will change. The window is minutes, not seconds, and its exact length
  is a provider fact — ask the package expert, do not measure it in the
  retire path.
- **An immediate roster check after a forced teardown is a false
  positive.** The record will still be there. Checking once, seeing the
  leftover, and opening an investigation wastes the time of everyone who
  reads the roster. The honest sequence is: note the forced teardown,
  schedule **one** re-check after the window, verify then, and only
  investigate if the record survives that.

# What goes wrong

- A rebuild or migration removes instance homes by hand "because we are
  starting fresh anyway"; the team roster on the messaging service then
  shows residents that no longer exist on any host, and the next operator
  reads them as live members. See
  [rebuild starts fresh provider state](/nodes/oats-operator-expert/playbooks/rebuild-starts-fresh-provider-state.md)
  for why fresh provider state must be *reached*, not assumed.
- An operator, seeing "still active", loops the remote delete every few
  seconds, or escalates to the provider's owner as an outage.
- A well-meaning simplification of the retire procedure drops the
  "from inside the home" step because "the directory is going away anyway",
  reintroducing the stranding for every subsequent retire.
- The forced-teardown case is handled correctly once, but because the
  reasoning was never written down, the next cleanup pass reverts to
  directory removal.

# Consequences for the operator

- Treat the instance home as holding a credential, not just files. Before
  removing any home, ask which capabilities placed an identity there and
  whether each has already been de-registered from inside it. This is the
  same custody question as
  [resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md):
  the host that holds the key is the only one that can act immediately.
- Record the ordering **as rationale** in the deployment's operating notes
  — what breaks if it is reversed — so that later "simplifications" have to
  argue against a reason rather than delete an unexplained step.
- After any forced teardown, put a dated re-check on the calendar rather than
  a roster inspection in the same session; an outsider verifying the rebuild
  (see
  [outsider verification of a rebuild](/nodes/oats-operator-expert/playbooks/outsider-verification-of-a-rebuild.md))
  should be told which records are pending staleness so they are not read as
  leftovers.
- In a cutover, this ordering is what places identity retirements before any
  directory or repository move — see
  [cutover is sequenced per deployment](/nodes/oats-operator-expert/playbooks/cutover-is-sequenced-per-deployment.md).

# Routed

- The retire-hook contract (that retire runs a capability's de-registration
  before the home is removed, and how a hook reports a failure of that
  step) belongs to the kernel node.
- The provider's commands, status vocabulary, HTTP responses, the length of
  the staleness window, and why "leave" is not the path for a sole team are
  the messaging package expert's facts.

# Citations

- Legacy lesson `lessons/aweb-workspace-lifecycle.md` in the oats-expert
  bundle (probe on a hosted messaging team, 2026-07-08; retire order and
  staleness observations; probe client version 1.32.5 recorded there).
