---
type: Lesson
title: Process identity must survive different readers and host conventions
description: A persisted PID and start token need environment-stable readers, existence checks independent of ps output, and an explicit unknown result that blocks destructive recovery.
tags: [kernel, process, liveness, portability, recovery, fail-closed]
timestamp: 2026-10-08
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

# Elimination route

The fix belongs in the shared process-identity machinery and the lifecycle
callers that consume its tri-state answer, not in operator reminders or a UI
workaround. The source reports these fixes in awebai/oats#801 [1]. Preserve
regression coverage that forces the `ps` path on Linux with a macOS-shaped
stub on `PATH`, so native `/proc` success cannot bypass the failure shape.
Cover cross-environment token equality, dead-PID output, unreadable starts
and the exit-during-read recheck. A Linux-only happy path is not portability
evidence.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-worktree-setup, 2026-10-08; notes/process-liveness-across-hosts.md.

1. The proposal and named note attribute the reproductions, maintainer recovery condition and fixes to the review of [awebai/oats#801](https://github.com/awebai/oats/pull/801). These are source-reported findings; the harvest did not replay the host experiments or audit implementation/test coverage.
