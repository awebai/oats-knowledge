---
type: Decision
title: Lost sessions resume locally through the kernel into their own conversation
description: Lost-session recovery reuses the instance's own harness conversation and launch settings through one kernel primitive and a local-machine sweep, without turning client opening into authority to restart remote agents.
tags: [runtime, recovery, lifecycle, clients, locality, supersession]
timestamp: 2026-10-27
---
# Direction and rationale

The 2026-10-27 direction is to recover a session lost to shutdown, reboot or
crash in **that instance incarnation's own harness conversation**, with the
settings it was launched with. Recovery belongs to one per-home kernel
primitive, reused by one machine-wide sweep of the deployments registry.
Desktop and TUI each invoke the sweep once when they open; the client does
not implement a second lifecycle or limit recovery to its open deployments.
The registry is the machine's deployment inventory; a client's open views
are not.

**The sweep is local-only.** Opening a client on one machine is no evidence
that another machine lost its sessions and must not restart that machine's
agents. A server runs the sweep itself. This is a scope decision, not a
remote feature awaiting implementation.

Derive whether a session was lost or intentionally stopped from kernel
lifecycle evidence, rather than adding a second intent field to the instance
record. The design extends the existing exit marker with the harness exit
status and the stop receipt with the start identity it ended. Preserve the
reason for this choice: lifecycle evidence stays with the lifecycle that
produced it instead of creating parallel state on the stop path. Exact keys
and command names belong with implementation documentation; kernel-private
file formats are not a client contract.

Harness-specific resume arguments belong beside the harness's launch
arguments. Reuse the frozen launch recipe and launch hooks for the same
settings, not an independently replayed command. This applies the existing
[kernel/capability boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)
and [native-launch decision](/nodes/oats-kernel-expert/decisions/harness-native-launch.md).
The [runtime ownership decision](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
still requires a supported execution receipt and one live identity holder;
resuming a conversation does not bypass those requirements.

# Automatic recovery needs the kernel's own recent-loss evidence

The later 2026-10-27 contract refinement narrows automatic eligibility:
**being lost is necessary, not sufficient**. The kernel must have observed
this home's current start running, and no earlier sweep may have judged
this loss. Two distinct recency bounds also apply:

- The first not-running observation, by any read, must still be recent when
  the sweep judges the loss.
- Within one boot, the last running observation must be close enough to
  that first not-running observation to establish a recent loss.

At the captured agreement both windows were 24 hours: first seen lost less
than 24 hours ago, and, within one boot, last seen running within 24 hours
of the first not-running look. The proposal leaves constants open to
implementation review. Preserve both bounds and their different purposes,
not an immutable timeout copied away from the owning contract.

A status read may establish when loss was first seen, but **does not consume
the loss's opportunity for a sweep judgment**. Observation and action are
separate. Missing or insufficient observation history does not authorize a
start: skip automatic recovery, keep the row visibly lost and leave manual
resume available. A first sweep after an upgrade with no history must not
turn discovery into proof of a recent loss.

The reason is historical-loss safety, not merely rate limiting. The source
reports that a machine contained sessions lost weeks earlier, including
ones in deployments where starting a seat needs its owner's approval. A
loss within a long-running boot leaves no marker that dates it. Boot time
and the mere existence of a lost row cannot supply the missing observation.

Rejected simplifications each fail a different case:

- **Use a boot-time bound.** A session may have died weeks ago inside the
  same long boot; boot identity alone cannot date its loss.
- **Give the first not-running look only ten minutes.** An agent's overnight
  status read would expire recovery before the person's morning client
  open, even though no sweep had judged the loss.
- **Have no first-seen bound.** On a server without client sweeps, a first
  manual sweep weeks later would revive historical losses.

The bounded policy deliberately leaves a loss seen only by status reads on
Friday for manual recovery if no client sweeps until Monday. Do not repair
that accepted skip by dropping the first-seen bound. Likewise, an external
kill is not a durable stop-intent record; OATS Stop is the intentional-stop
path. This is not a promise that every external kill will be automatically
recovered within a deadline.

The [private-observation decision](/nodes/oats-maintainer/decisions/read-side-observations-must-not-change-the-read.md)
owns the conditions for status to retain this evidence without changing its
answer. Enforce eligibility in the kernel sweep, with regression cases for
no history, long boots, overnight reads, delayed server sweeps and repeated
judgment; do not make each client infer freshness. These are enforcement
targets, not test results from this harvest.

# Conversation and prompt boundaries

Find the conversation through native runtime records filtered to the
instance incarnation, not merely its pathname. A resumed conversation gets
one line explaining the resume, asserting only what holds for every
instance. If there is no conversation to resume, start fresh from the
briefing. The universal-text constraint is already owned by
[kernel-composed instructions](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md),
not a new assumption about knowledge files or capability presence.

The existing [pi fresh-home signal](/nodes/oats-kernel-expert/decisions/pi-fresh-home-uses-runtime-sessions.md)
is a prompt heuristic with stated limits, not authority to select a recovery
conversation. Likewise, [a missing tmux socket does not prove server exit](/nodes/oats-kernel-expert/lessons/missing-tmux-socket-does-not-prove-server-exit.md):
this recovery direction does not turn an unreachable endpoint into proof
that a second harness may start.

# Explicit partial supersession

For **lost sessions only**, this direction supersedes the earlier repository
documentation rule that every start opens a fresh harness conversation.
Ordinary **Start and Restart remain fresh**. The source identifies the old
rule in `docs/desktop-instance-start.md` at `a5961dfa` and reports no recorded
rationale for it. This is a deliberate exception, not a silent change to all
start behavior; the harvest did not independently establish the old rule's
acceptance history.

The later recent-loss refinement explicitly narrows the initial recovery
scope: a lost classification alone no longer qualifies a home for an
automatic sweep. It does not change local-only scope, incarnation-bound
conversation selection, launch receipts, manual recovery or ordinary
Start/Restart semantics. Trigger frequency and other automatic-recovery
safeguards are separate decisions, not replaced by this eligibility bound.

# Rejected alternatives

- **Continue the latest conversation at this path.** A reused instance path
  can select an earlier incarnation's conversation.
- **Have OATS choose the conversation ID at launch.** The source reports
  that a harness clear operation can create another ID and that Codex cannot
  take an OATS-chosen ID. A launch-time choice is therefore not a stable,
  cross-harness record of the conversation to recover.
- **Record a separate intent field when stopping.** Rejected in favor of
  deriving the distinction from the existing lifecycle receipts above.
- **Let each client recover only deployments it has open.** That confuses
  view state with the machine's recovery scope and leaves other local work
  out of the sweep.
- **Resume remote servers when a client opens.** A local client event is not
  evidence of loss or recovery intent on another machine.

# Acceptance and evidence limits

The source reports a human request and a direction-gate design on
2026-10-27. It records that the lane's human, after receiving the
maintainer's recommendations for local-only scope, the one-line notice and
fresh fallback, delegated those choices to the maintainer; the maintainer
then selected them. This is source-reported delegated acceptance, not an
independently audited conversation or direct human specification of every
mechanism.

At the initial proposal checkpoint nothing was built. The later proposal
reports agreement between both maintainer sides on the recent-loss bound
on 2026-10-27, with implementation still under review. This is source-reported
contract agreement, not independently audited correspondence or new direct
human acceptance. The initial human-delegated decision above remains part
of the acceptance history; the narrowing must not silently erase it.

This record preserves the chosen shape, scope and rejected alternatives,
not a release claim, verified recovery behavior, fixed recency constants or
a fixed CLI spelling.

# Citations

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/session-resume-gate.md.

The source identifies its design and gate correspondence and code at
`d5443cc3` as context. Only the captured proposal and named note were used as
source evidence; this harvest did not read the correspondence, audit the
implementation repository or exercise any harness resume behavior.

For the recent-loss refinement the source identifies
[awebai/oats#1567](https://github.com/awebai/oats/issues/1567), particularly
final amendment 6440072509 and confirmation 6440081107, and the then-unmerged
implementation [#1563](https://github.com/awebai/oats/pull/1563). The earlier
ten-minute formulation in the note is historical, superseded by its final
item 3. These references are evidence pointers supplied by the source, not
implementation or acceptance checks performed by this harvest.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/session-resume-gate.md (recent-loss refinement).
