---
type: Decision
title: Spawn deadlines follow the confirmed preview, not the request lifetime
description: A preview-derived deadline bounds long spawns while a short apply response and typed compensation outcomes prevent transport limits from becoming false failure or unsafe retry.
tags: [desktop, spawn, deadlines, transport, compensation, truthfulness]
timestamp: 2026-10-08
---
# Decision and rationale

Decided by the Desktop expert on 2026-10-08 for worktree-hook spawns. The
source records maintainer agreement to preserve typed hook failures through
the kernel's spawn failure path and land the kernel and Desktop changes
together [1]. This is the Desktop request/deadline decision, not a second
specification of the kernel's hook transaction.

**Derive the apply deadline from the preview the operator confirmed.** On a
kernel declaring `worktree-event`, a non-empty preview `worktreeHooks` gives
an apply bound of 60 seconds + n × 30 minutes + 60 seconds, where n is the
number of hooks. The kernel bounds each hook at 30 minutes; the longer bound
therefore follows the confirmed work rather than a guess about how long a
spawn usually takes. Otherwise the apply bound remains 60 seconds.

**The transport owns that timer on these kernels.** At the deadline it sends
SIGTERM while continuing to read stdout, and escalates to SIGKILL only after
a grace period. The source reports a review finding that the built-in
`execFile` timeout lost the kernel's post-SIGTERM `E_INTERRUPTED` envelope.
A timer that discards the answer destroys the distinction between confirmed
rollback and an unknown outcome. Consume the kernel's final envelope; the
local timeout alone is not proof of compensation.

**Bound the response separately from the work.** The apply request returns
an outcome or `pending` within a window shorter than the IPC proxy's limit.
The broker retains the CLI, and the job follows `result` to its own absolute
deadline, preserved across a renderer reload. The request need not live as
long as the operation. This does not promise that a broker job survives
server death: [server lifetime](bundled-server-owner-lifetime.md) deliberately
leaves CLI children alone without guaranteeing receipt of their result.

Allow bounded concurrency across independent applies, while admitting only
one apply per workspace and soul. One long spawn must not monopolize every
workspace's apply capacity.

# A compensated failure is a known outcome

Gate this interpretation on the declared `worktree-event` feature, not a
version guess or a generic error. For `E_INTERRUPTED`,
`E_REQUIRED_HOOK_FAILED` and `E_HOOK_ENVIRONMENT_CONTRACT`, absence of
`details.unconfirmed` means the kernel confirmed compensation. Present a
refused spawn with no surviving created instance, not an unknown outcome.
This does not mean no effects occurred before rollback.

With `details.unconfirmed`, present a final notice that cleanup is owed and
Retire completes it; never re-apply that job with the same key. Do not infer
compensation from a missing marker on arbitrary `E_SPAWN_FAILED` answers:
older kernels made no such promise. The decision to keep the typed codes
preserves the evidence Desktop needs to tell these outcomes apart.

# Rejected alternatives

- **No timeout for hooked spawns:** it leaves an unbounded operation.
- **One long fixed timeout for every spawn:** a hung ordinary spawn consumes
  a slot for half an hour despite having no confirmed long-running hooks.
- **Hold the HTTP request open for the whole spawn:** sleep, reload and proxy
  limits can end the request while the kernel still works.
- **One backend-wide apply slot:** a single long hook blocks unrelated
  spawns. Per-workspace-and-soul exclusion is not global serialization.
- **Treat any unmarked generic spawn failure as rolled back:** it silently
  assigns a new compensation guarantee to kernels that never offered it.

# Related

This applies [declared CLI feature authority](standalone-product-and-cli-authority.md)
and the separation of creation, readiness and success in
[truthful async outcomes](../lessons/asynchronous-intent-and-truthful-outcomes.md).
The kernel's reason for choosing the hook seam remains in
[Worktree setup is a capability hook](/nodes/oats-kernel-expert/decisions/worktree-setup-is-a-capability-hook.md).
Live implementation details belong in the
[Desktop CLI contract](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md).

# Citations

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-parity-049, 2026-10-08; notes/long-spawn-transport-decision.md.

1. The proposal identifies [awebai/oats#819](https://github.com/awebai/oats/pull/819)
   as the Desktop implementation following
   [#801](https://github.com/awebai/oats/pull/801), and
   [#802](https://github.com/awebai/oats/issues/802) as the originating issue.
   It reports a long hook returning `pending` before completion and a
   deadline-triggered interruption returning confirmed rollback. Maintainer
   agreement, merge status and live outcomes are source-reported, not
   independently audited or rerun by this harvest. The note predates merge;
   the proposal records the later choice to retain typed codes rather than
   the note's possible generic-error fallback.
