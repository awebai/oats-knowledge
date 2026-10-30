---
type: Decision
title: An idle waiter's checkpoint wake belongs to the waiter
description: A waiter-owned kernel job supplies an external checkpoint without depending on harness timers or messaging, but does not prove a child stalled or guarantee timely delivery.
tags: [integration, delegation, scheduling, harnesses, rationale]
timestamp: 2026-10-30
---
# Choice and rationale

The source's 2026-10-30 investigation chose a kernel wake job attached to the
**waiter's own home** to bring an idle lead back to an expected-result
checkpoint. An agent that has ended its turn cannot run its next instruction
without an external wake. Reusing the kernel's wake path avoids making the
checkpoint depend on a particular harness timer or messaging layer, without
requiring a new kernel capability.

This records the source's integration choice and rejected alternatives, not
human acceptance, released delegation guidance or a new lifecycle policy.
The generalist's [overdue-handback lesson](/nodes/oats-expert/lessons/overdue-handbacks-need-a-record-check.md)
already owns why delegated work needs an expected checkpoint and an
authorized record check. This concept adds the wake-selection rationale;
it does not duplicate that coordination rule.

# Why the simpler-looking routes were rejected

- **The waiter's next turn boundary:** an idle waiter may have no next turn.
- **Harness-native timers:** the investigation found Claude's timer to be
  session-bound, and found no equivalent for the tested Codex or pi. That
  was insufficient for a harness-neutral choice, not proof that every
  version of every harness lacks a suitable timer.
- **A wake configured at child spawn:** the reported binding is to the
  child's home, so it wakes the wrong participant in the dependency.
- **A date-pinned cron as a one-shot deadline:** in the investigated scheduler,
  a matching minute missed while the host slept was not replayed. Pinning
  day and month could leave the next match a year away. A daily or weekday
  form offered another opportunity after a miss; it did not provide catch-up
  or an elapsed-time guarantee.
- **A short recurring cron:** it substitutes periodic inspection for an
  expected-result checkpoint and recreates the polling loop the generalist
  lesson rejects. Recurrence chosen for recovery from a missed checkpoint
  still needs a bounded lifetime in the owning delegation procedure.

A checkpoint need not wait for a diagnosis before prompting an authorized
record check or escalation. The source's logged-out Codex had the same coarse
lifecycle observations as a possible stall: a running harness, no waiting
claim, and launch as the latest event. These records did not distinguish a
sign-in screen, a provider stall and long work. Preserve
[producer-reported activity](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md);
unknown activity does not become idle because a result is overdue.

# Limits and implementation home

A wake is an opportunity to reassess, not permission to interrupt or replace
a child. The exact escalation count and replacement policy belong in reviewed
lead delegation guidance, within existing lifecycle authority. Neither this
decision nor a timer establishes that work has stopped progressing.

The reported path needs a functioning host timer and permission to register
the job. A busy harness can defer consumption until a tool or turn boundary;
a sleeping host can miss a scheduled minute. The source also flags that a
wake can start a stopped home: job ownership and cleanup matter, and stopping
alone must not be treated as cancellation. Exact commands and cleanup
semantics belong in the current scheduler and delegation guidance, not a
second operational recipe here.

The implementation route is the existing lead guidance using the existing
scheduler. Reusable acceptance coverage should assert which home is woken,
idle versus busy consumption, missed-minute behavior and job cleanup. Those
checks can prevent regressions in the mechanism; they cannot diagnose a
child or confer intervention authority. No skill or scheduler change is
delivered by this knowledge record.

# Evidence

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-10-30; notes/waiter-owned-wake-job-is-the-checkpoint.md; notes/idle-waiter-wake-rehearsal.md.

On OATS 0.69.6, the notes report actual waiter-created jobs and host-timer
wakes for an idle and a busy pi 1.3.0, and for an idle Claude Code session.
The busy pi consumed its wake after the foreground command returned. The
notes do not establish a Claude busy-case result. Codex 0.160.0 used the
[separate partial-proof method](/nodes/integrations-expert/lessons/credential-free-harness-probes-have-bounded-proof.md),
not a kernel-launched instance or a timer tick. All observations are
source-reported and were not rerun by this harvest. The proposal describes
the associated guidance as unmerged at capture; no release or universal
cross-harness delivery guarantee is claimed.
