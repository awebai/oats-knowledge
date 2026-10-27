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

At proposal time nothing was built. This record preserves the chosen shape,
scope and rejected alternatives, not a release claim, verified recovery
behavior or a fixed CLI spelling.

# Citations

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/session-resume-gate.md.

The source identifies its design and gate correspondence and code at
`d5443cc3` as context. Only the captured proposal and named note were used as
source evidence; this harvest did not read the correspondence, audit the
implementation repository or exercise any harness resume behavior.
