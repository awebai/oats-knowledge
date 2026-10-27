---
type: Decision
title: Stop intent is recorded before termination, but recording is best effort
description: Every intentional kernel stop attempts to record the ended start before termination, but a failed write must not block retirement, accepting a documented double-failure recovery ambiguity.
tags: [kernel, lifecycle, stop, retire, recovery, failure-tradeoff]
timestamp: 2026-10-27
---
# Decision and rationale

Every kernel path that intentionally ends a harness, including retirement's
own window termination, attempts to record the stop and the start it ends
**before** ending the session. This implements the distinction already owned
by the [lost-session recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md):
lifecycle evidence distinguishes stopped on purpose from lost; it is not a
second intent field or a new recovery policy.

The ordering matters because a sweep can observe the gap after termination
and before retirement finishes. The source reports that retirement's bare
window termination omitted the record and left homes looking lost. A record
written only by the ordinary Stop command cannot represent every intentional
kernel stop. New termination paths must participate in the same recording
rule, rather than leave an automatic starter to infer intent from absence.

**The write is best effort, not a new gate on the stop or retirement.** A full
disk is precisely when an operator may need to retire work to free space.
Refusing to end the session because its safety record cannot be written
would turn that record into a new cause of an unretirable home. Best effort
requires attempting the write; it is not permission to omit a path.

# Deliberate residual and rejected alternatives

The [whole-run lifecycle claim](/nodes/oats-kernel-expert/decisions/retire-exclusion-is-a-whole-run-claim.md#refinement-automatic-resume-joins-the-whole-run-claim)
excludes automatic resume while retirement is running. It cannot make the
stop record durable if the write failed. If **both the record write and the
retirement fail**, a retained home can still read lost and may be resumed if
otherwise eligible. The source records this as a documented exception, not
a closed failure mode.

Two alternatives were rejected: refuse retirement before killing the window
when the record cannot be written, or keep documentation claiming that an
intentional stop can never appear lost. The first sacrifices the needed
operator act; the second conceals the accepted limit. Recording first and
recording successfully are different guarantees.

This tradeoff is narrow. It does not weaken lifecycle exclusion, authorize
recovery of an ineligible home, or bypass the independent work-preservation
and cleanup gates in [preserve recovery authority](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).
Nor does it claim that every failed restart stays classified stopped: the
proposal explicitly leaves failed-relaunch classification outside this repair.

# Enforcement and evidence limits

The enforcement route belongs in the kernel's termination paths and
regression tests, not in a permanent reviewer checklist alone. Account for
every path that ends a harness, assert the record is attempted before
termination, exercise a record-write failure without blocking the act, and
keep the write-plus-retirement failure visible as the documented residual.
The current path inventory belongs in code and tests, not this concept.

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert, 2026-10-27; notes/decision-retire-stop-record-is-best-effort.md; notes/decision-resume-takes-the-lifecycle-claim.md.

The proposal identifies [awebai/oats#1599](https://github.com/awebai/oats/pull/1599)
as the repair; the stop-record note reports reviewer agreement on the
residual. This harvest read the captured proposal and notes, not the private
correspondence or implementation. Agreement, repair and test results remain
source-reported; no human acceptance, completed all-path audit, test rerun or
release is certified here.
