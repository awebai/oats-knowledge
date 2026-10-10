---
type: Lesson
title: Process identity must survive different readers and host conventions
description: Process identity needs environment-stable readers and fail-closed unknown handling, while PID existence and a matching start token do not prove an unreaped holder can still act.
tags: [kernel, process, liveness, portability, recovery, fail-closed]
timestamp: 2026-10-10
---
# Discovery

During the worktree lifecycle review on 2026-10-08, the source reports that
maintainers reproduced four different start strings for one live macOS PID
under different timezone and locale settings. Records containing
`{pid, processStart}` looked like a reused PID to a reader in a different
environment. Claim takeover, rollback or retirement could therefore act on
state whose holder was still live. Linux's `/proc` path concealed the defect
from ordinary Linux testing [1].

The start token is part of an identity comparison, not display text. Its
meaning must survive the environment of every later reader on that host.
This is a local-process identity rule across supported host implementations,
not a way to compare PIDs on different machines.

# What made the comparison safe

- **Stabilize the token at the producer and every reader.** `ps -o lstart=`
  renders local time in a locale-dependent format. The fix runs `ps` with
  only `PATH`, `LC_ALL=C` and `TZ=UTC`, rather than inheriting the caller's
  presentation settings. Normalizing only one side leaves the comparison
  unsafe.
- **Separate existence from reading identity.** Use `kill(pid, 0)` for
  existence: `ESRCH` means absent; success or `EPERM` means it exists; other
  failures remain unknown. Read the start token only for an existing PID,
  and recheck existence after a failed token read to distinguish a process
  that exited during the probe from an unreadable live process. Existence
  alone does not prove the recorded identity.
- **Do not infer absence from a tool's output convention.** A later macOS
  run found that `ps` for a dead PID did not have the assumed nonzero-exit,
  empty-output shape. Treating that shape as the absence test made abandoned
  state permanently unknown. Parsing another platform's diagnostic is not
  a portable existence check.
- **Keep alive, gone and unknown distinct.** An unreadable start token is
  not evidence of a different or absent process. Collapsing it to the same
  null value as absence made destructive recovery fail open. For these
  lifecycle identity checks, unknown permits no automatic takeover,
  rollback, retirement or signalling.

# A matching identity can still be a zombie

On 2026-10-10, a later source reported that an exited but unreaped child
still passed both probes: `kill(pid, 0)` succeeded, and its start token
remained readable through `/proc` or `ps`. A claim, pending marker or
in-progress marker using only PID existence and start-token equality can
therefore classify that holder as alive even though the process itself can
no longer act [2]. **Exists with the recorded start is not the same as can
still act.** This is a limitation of what the probes establish, not a new
fourth return value or permission to collapse unknown into gone.

The observed failure was in tests that killed a child and immediately tried
to perform its deferred completion in the test process. The child had not
yet been reaped, so the takeover was refused as busy. The workaround that
worked was to let the parent reap the test-owned child and observe
`kill(pid, 0)` return `ESRCH` before attempting takeover, without weakening
the takeover assertions. Sending a kill is not that observation; neither is
an arbitrary probe error. A busy refusal need not mean a holder will ever
make progress.

The duration of this condition depends on the parent reaping the child;
this harvest establishes no production-frequency or guaranteed-reaping
claim. Whether these lifecycle checks should classify a zombie as gone
remains undecided in the source evidence: the holder cannot act itself,
but its children may still act. Do not infer that detecting a zombie alone
makes destructive takeover safe.

# Safe refusal must still lead somewhere

The maintainers required an unknown refusal to name an existing recovery
route or the exact claim/record needing operator attention, not invent a new
flag. Preserve that distinction in the producer's result too: unresolved
identity is rollback-incomplete, not evidence that work is in progress.
Reporting it as progress leaves a UI waiting indefinitely for a transition
that has not been established.

This extends the asymmetry in
[Record locks favor recoverable refusal over live-holder theft](/nodes/oats-kernel-expert/decisions/record-lock-liveness-tradeoff.md):
refusal can be recovered from; concurrent destructive action cannot. It does
not silently replace that record-store decision's separately documented
foreign/unreadable-holder age fallback. Nor does an operator override prove
cleanup; [recovery authority stays until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).

# Related

[Home process scans state their visibility limit](/nodes/oats-kernel-expert/decisions/home-process-scan-has-an-explicit-visibility-limit.md)
covers scanning for home membership, not verifying a recorded PID. Its
unreadable-entry tradeoff does not supersede this lesson's unknown-identity
refusal.

# Elimination route

The fix belongs in the shared process-identity machinery and the lifecycle
callers that consume its tri-state answer, not in operator reminders or a UI
workaround. The source reports these fixes in awebai/oats#801 [1]. Preserve
regression coverage that forces the `ps` path on Linux with a macOS-shaped
stub on `PATH`, so native `/proc` success cannot bypass the failure shape.
Cover cross-environment token equality, dead-PID output, unreadable starts
and the exit-during-read recheck. A Linux-only happy path is not portability
evidence.

The zombie limitation is **knowledge debt**, not a permanent workaround or
an accepted takeover policy. The proposal names
[awebai/oats#870](https://github.com/awebai/oats/issues/870) as its elimination
route: first decide what an unreaped holder and any surviving children mean
for takeover, then make process-state handling agree in both the `/proc`
and fixed-environment `ps` readers. Regression coverage must exercise an
unreaped child and the chosen takeover behavior through both readers;
waiting for reaping in unrelated tests does not resolve the policy question.
Update this lesson when that decision and implementation replace the
limitation; the harvest does not establish the issue's current status [2].

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-worktree-setup, 2026-10-08; notes/process-liveness-across-hosts.md.

1. The proposal and named note attribute the reproductions, maintainer recovery condition and fixes to the review of [awebai/oats#801](https://github.com/awebai/oats/pull/801). These are source-reported findings; the harvest did not replay the host experiments or audit implementation/test coverage.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-exclusive, 2026-10-10; notes/zombie-reads-as-alive.md.

2. The proposal and named note report the unreaped-child discovery and successful wait-for-reaping test workaround. The proposal associates the test failures with awebai/oats#871; the note attributes the discovery to work on awebai/oats#863. Both name awebai/oats#870 as the follow-up. The harvest preserves the shared finding without resolving that task attribution, replaying the experiments or auditing the implementation.
