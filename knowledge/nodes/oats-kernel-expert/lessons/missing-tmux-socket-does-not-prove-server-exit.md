---
type: Lesson
title: A missing tmux socket does not prove the server exited
description: A tmux server can retain sessions after its socket file is removed, so a missing endpoint needs independent liveness evidence before lifecycle code treats work as stopped.
tags: [kernel, tmux, process, liveness, lifecycle, recovery]
timestamp: 2026-10-08
---
# Discovery

The source reports a tmux 3.7c probe on 2026-10-08 that separated two failures
which had been treated as one lost-server answer [1]:

| Endpoint condition | Reported tmux diagnostic | What it establishes |
| --- | --- | --- |
| A socket file exists but has no listener | `no server running on <path>` | The connection to that socket was refused. |
| The socket file is absent | `error connecting to <path> (No such file or directory)` | The endpoint is missing; server exit is not established. |

A reboot can leave the second condition, but so can removal of a live
server's socket file by a temporary-file cleaner or a person. In the latter
case the server retains its sessions and harnesses. The source reports that
SIGUSR1 caused that live server to recreate its socket and answer again.
The diagnostic distinction was the same for `has-session` and
`list-windows`; changing the tmux read does not remove the ambiguity.

A refused connection is a narrower observation than proof that no relevant
work exists anywhere. In particular, neither diagnostic is authority to
signal an unverified PID. The discovery is the persistence of work after
endpoint loss, not a general recovery recipe or a promise about every tmux
version's wording.

# Why the distinction changes lifecycle decisions

Treating a missing endpoint as stopped was reported to make status show live
instances as stopped, let start launch another harness in the same home,
and let stop report idle. Endpoint reachability is not work liveness.
Before an ambiguous endpoint answer justifies creating a session, reporting
stopped or removing a home, corroborate it with evidence about the work.

The reported repair uses the per-home process scan. Its
[explicit visibility limit](/nodes/oats-kernel-expert/decisions/home-process-scan-has-an-explicit-visibility-limit.md)
must remain visible to consumers; it is not an omniscient absence test.
An unavailable scan cannot be converted to no work, consistent with
[preserving recovery authority until outcomes are proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).

**A new home's emptiness cannot establish the shared server's absence.**
The home-level corroboration does not by itself solve spawn's shared-server
question, because the new home has no existing work to inspect. The source
identified this boundary in awebai/oats#839 [2]. Do not generalize a proof
about one existing home's work into a proof about every session on the server.

# Elimination route

The behavioral fix belongs in shared lifecycle liveness classification and
all its callers, with regression tests, rather than in a reminder for
operators. Keep the missing-endpoint and refused-connection cases distinct;
exercise the decisions made by status, start, stop and retirement. A real-tmux
regression that removes a live server's socket and observes it answer again
after socket recreation establishes the failure mode that canned diagnostics
alone cannot prove.

The proposal points to such a real-tmux test and the lifecycle repair in
awebai/oats#838 [1]. This lesson preserves why the distinction exists and
why a per-home check has a shared-server boundary; it is not a substitute for
those tests or a claim that every lifecycle gap has been fixed.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-08.

1. The proposal reports the tmux 3.7c probe, lifecycle consequences and real-tmux regression in [awebai/oats#838](https://github.com/awebai/oats/pull/838), addressing [awebai/oats#624](https://github.com/awebai/oats/issues/624). The named note `notes/decision-625-scan-blind-spot.md` corroborates only the scan decision and the fact that a tmux probe was reported; detailed probe results come from the proposal. The harvest did not read the source log, replay the experiment or audit the implementation.
2. [awebai/oats#839](https://github.com/awebai/oats/issues/839) is the source's reference for the shared-server spawn boundary, not a claim about the issue's current state.
