---
type: Decision
title: Lost sessions resume locally through the kernel into their own conversation
description: Lost-session recovery is always on and retriggered by local loss, with a per-boot bound and proven harness selectors, while preserving the instance's conversation, user-owned prompt choices and local-only scope.
tags: [runtime, recovery, lifecycle, clients, locality, supersession]
timestamp: 2026-10-27
---
# Direction and rationale

The 2026-10-27 direction is to recover a session lost to shutdown, reboot or
crash in **that instance incarnation's own harness conversation**, with the
settings it was launched with. Recovery belongs to one per-home kernel
primitive, reused by one machine-wide sweep of the deployments registry.
Desktop and TUI request the sweep on open and again when a status read shows
a local lost row, subject to the bounds below. The client does not implement
a second lifecycle or limit recovery to its open deployments. The registry
is the machine's deployment inventory; a client's open views are not.

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

# Always on, continuous and bounded per boot

The product-owner direction reported on 2026-10-27 makes lost-session
recovery **always on**: no setting, preference or flag opts out. Stopping an
instance through OATS is the explicit intent record that keeps it down.
Only **lost** sessions are eligible; stopped and exited sessions stay down.
The lack of an opt-out is deliberate, not a missing setting for a future
maintainer to add.

Recovery is not limited to client startup. A later status read showing a
local lost row also triggers the sweep, with one sweep in flight, a minimum
interval and the machine lock. Continuous triggering does not mean an
unbounded restart loop: **the kernel caps automatic resumes of each home
per boot**, refusing further automatic recovery for that home until the
next boot once the cap is reached. A harness that repeatedly gets killed
must not restart forever. This bound is what makes continuous, always-on
recovery acceptable without an opt-out; throttling a sweep alone does not
bound the number of restarts.

The cap and the sweep interval are implementation-review parameters, not
fixed constants in this decision. Preserve the per-home, per-boot bound and
its refusal behavior when reviewing those values.

# Conversation and prompt boundaries

Find the conversation through native runtime records filtered to the
instance incarnation, not merely its pathname. A resumed conversation gets
one line explaining the resume, asserting only what holds for every
instance. If there is no conversation to resume, start fresh from the
briefing. The universal-text constraint is already owned by
[kernel-composed instructions](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md),
not a new assumption about knowledge files or capability presence.

The maintainer's revision-2 gate adds two safeguards:

- **No unproven resume selector ships.** A harness selector needs an
  end-to-end proof; until then that harness takes the fresh-start path with
  a named reason. Selecting an apparently suitable native record is not
  evidence that the harness actually resumes it.
- **Resume-time confirmation and cost choices belong to the user.** Recognize
  the dialog and report the resume as blocked; never answer it or suppress
  it through undocumented harness internals. Always-on recovery is not
  permission to accept a cost choice. This is a known limit of unattended
  resume, not a prompt-bypass requirement.

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

The later **2026-10-27 always-on refinement** explicitly supersedes this
concept's earlier once-on-client-open trigger with open-plus-status-driven
sweeps. It also supersedes the source's earlier gate proposal for an opt-out
setting; that setting was not an accepted rule in this base. Local-only
scope, incarnation-bound conversation selection, the one-line notice, fresh
fallback and ordinary Start/Restart semantics remain unchanged.

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

For the later refinement on the same date, the source reports that the
product owner directed always-on recovery to the lead and then directly
confirmed that direction to the source maintainer. The source also records
the continuous trigger and per-boot safeguard, plus its revision-2 selector
and prompt rulings. Keep the explicit human direction distinct from the
maintainer's implementation-gate conclusions; this harvest did not
independently audit the correspondence. The note's earlier startup-only and
opt-out passages are historical and superseded by its later dated direction
change, not concurrent requirements.

The source reports a harness resume-cost dialog as the concrete reason for
the prompt ruling. This record does not certify a particular harness version
or a universal absence of documented suppression controls.

At both proposal checkpoints nothing was built. This record preserves the
chosen shape, scope and rejected alternatives, not a release claim, verified
recovery behavior, fixed retry/interval values or a fixed CLI spelling.

# Citations

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/session-resume-gate.md.

The source identifies its design and gate correspondence and code at
`d5443cc3` as context. Only the captured proposal and named note were used as
source evidence; this harvest did not read the correspondence, audit the
implementation repository or exercise any harness resume behavior.
