---
type: Lesson
title: When changing a shared layer, enumerate the guarantees the old behaviour held up
description: Before removing shared behaviour or allowing unilateral state changes, list the guarantees the old design kept, assign each a disposition, and verify those that no longer hold by construction.
tags: [planning, specification, verification, cross-area, shared-layers, delivery, contracts]
timestamp: 2026-10-27
---
# A removed side effect was doing more than its name says

A shared layer's behaviour is usually named after one job and quietly does
several. Specifying its removal by negation ("present without
acknowledging", "detach without signalling", "write without locking") keeps
the named job in view and loses the rest. The spec reads as complete, the
developers build exactly what it says, and the dropped guarantees surface
later as bugs nobody specified against.

In the source's effort to give humans a threaded channel to long-lived
agents, the one-line wake was specified as presenting a message without
acknowledging it. A reviewer from another lane pointed out that the
acknowledgement had been doing two more jobs: suppressing redelivery of the
same message, and defining what recovery after a crash means. Both had to be
restated as separate requirements with named owners (a client-side record of
what has been presented for suppression; at-least-once re-presentation
reconciled against the conversation for recovery). Caught in review, this
cost one rewrite of a section; built as first written, it would have
produced duplicate wakes and an undefined recovery path across two
projects.

# Rule: list the jobs, then reassign each one

Before a spec removes or weakens a behaviour from a shared layer:

- write down every job the behaviour currently does, not only the one it is
  named for: what it suppresses, what it guards, what state it defines, what
  other components read from it;
- for each job, write a requirement that names which component now does it,
  or states explicitly that the job is no longer needed and why;
- when a job moves to a component in another project, record it as a
  dependency for the maintainer, as in [tracing each "done" item to its
  owning code](/nodes/oats-expert/lessons/trace-done-items-to-owning-code-before-accepting-repo-list.md).

A review from a lane that owns the shared layer is the natural place for
this check to be caught; it is cheaper to run it before asking for that
review. The delivery semantics decided for the threaded channel belong to
the messaging capability's owners and the maintainer's accepted
[threads decision](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md);
this lesson keeps only the method.

# Verification: what used to hold by construction?

The 2026-10-27 refinement extends the same check from removing a named side
effect to adding unilateral state changes. At verification, ask: **what
invariant did the old design keep by construction that this change no
longer guarantees?** A property may have needed no explicit check only
because no component could previously invalidate another's state.

The source reports a window take-over that moved authority while the old
holder was loading or reloading. The holder missed the one-way release
notification and later treated its stale local state as authority. Earlier,
the authority never moved that binding unilaterally, so local and
authoritative state agreed without an explicit confirmation. Developer
review and lead verification both missed the newly possible divergence.

For each such invariant, identify the newly reachable stale state, which
component now enforces the guarantee, and what happens when the affected
consumer is absent or not yet listening. Sending a notification is not
proof that the consumer received or acted on it. Check the interruption
case against the claimed guarantee rather than treating additional review
rounds as that evidence.

This is the verification counterpart of the planning method above, not a
second Desktop take-over specification. Receiver-start confirmation and
authority-side enforcement were the source's reported repair; their exact
placement and Desktop mechanics belong to that domain's owner. Its
[privileged-surface verification lesson](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md)
owns proving guards through the real boundary.

# Elimination route

Once an invariant is identified, preserve it in the authority's architecture
and cover the newly reachable interruption state with a regression that
fails when enforcement is removed. Review questions are discovery aids,
not replacements for those protections. No new regression is claimed
executed here.

A spec template for changes to a shared contract could require a "what this
behaviour currently does" list and a per-item disposition before the
section is accepted. Until the engineering skills carry that field, this
lesson is the reminder. No test can supply the list: the missing jobs are
exactly the ones the author did not know the behaviour had. The same field
can capture formerly implicit invariants for the verifier to challenge;
this harvest changes no engineering skill.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-threaded-channel,
2026-10-26; notes/summary-wake-needs-presented-record-not-read-state.md.

One effort, one review and one shared layer, source-reported; this harvest
did not read the design record or the review. The lesson is a planning
method, not a claim about which jobs any particular acknowledgement does.

Evidence: OKF proposal from oats-expert/oats-expert-workspace-sidebar,
2026-10-27; notes/takeover-binding-drift.md.

The added verification finding is source-reported from one Desktop
incident on 2026-10-23 in
[awebai/oats#1488](https://github.com/awebai/oats/pull/1488). This harvest did
not audit the implementation, reproduce the race or verify the reported
repair. It does not establish a universal two-gate solution for all shared
state or supersede any Desktop authority decision.
