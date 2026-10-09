---
type: Lesson
title: A raw-mode terminal child does not protect its wrapper's whole lifetime
description: Terminal signal handling must cover setup through cleanup, preserving the child's outcome before teardown instead of relying on raw mode or a normal-exit test.
tags: [kernel, terminal, signals, cleanup, exit-status, testing]
timestamp: 2026-10-09
---
# Discovery and consequence

A terminal child's raw mode is temporary protection from the terminal's
signal-generating keys, not a property of the wrapping command. Before a
client such as tmux takes over terminal mode and after it restores that mode,
the line discipline can again signal the foreground process group. If the
Node wrapper is in that group, a key handled as input by the client can now
terminate the wrapper: `C-\` commonly maps to SIGQUIT, and `C-c` to SIGINT.
The actual mappings and foreground arrangement matter.

The source reported on 2026-10-09 that an unhandled SIGQUIT ended Node with
shell status 131, bypassing `finally`. With a listener installed, a signal
sent during a synchronous child call was handled after that call returned
and the process survived. Post-client work is still exposed: a repeated key
can arrive while the wrapper reads an outcome marker or tears down temporary
resources. Reviewing only the period when the interactive child is running
misses the failure.

For catchable termination signals in the command's terminal contract,
**install handling before the first side effect and keep it through cleanup**.
In particular, handling INT, TERM and HUP does not cover a QUIT-generating
key. A caught signal listener is not an inherited ignore disposition: on
POSIX exec, caught dispositions reset to their defaults. This is not a
promise of cleanup after a crash or an uncatchable signal.

# Preserve the outcome before destroying its evidence

The child's action can precede Node observing its exit. If that action has a
separate witness, the signal path must read it before cleanup removes it;
otherwise a completed user action can be reported as an interruption. The
source found this ordering necessary for a detach marker set by the key
binding before the client exited.

Nor does a clean child exit prove why it ended. The source observed cleanup
ending a tmux viewer client with status 0 before a subsequent child kill took
effect. Keep the command's semantic outcome distinct from the incidental
status produced by teardown. This applies the existing
[CLI machine-boundary lesson](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md),
not a new universal exit-code table.

# Elimination route

Fix the wrapper's signal-handler lifetime and outcome-before-cleanup
ordering in code; a remembered warning is not the fix. Guard those invariants
with deterministic boundary tests. A disposable executable shim ahead of the
real terminal client on a test-only PATH can signal its wrapper parent at the
post-client call, rather than depending on a human timing a second keypress.
Assert both resource cleanup and the semantic exit status, including when
the action witness already exists. Keep signal injection confined to the
test-owned process.

The proposal reports that removing either the QUIT listener or the handler's
marker read made the developer's tests fail. Retain that regression intent
when changing the interactive command; a no-terminal happy-path test cannot
prove it. The lasting knowledge is why setup and teardown belong to the
signal boundary even when raw-mode interaction itself appears safe.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-attach-detach-key, 2026-10-09; notes/tty-quit-key-after-the-client-exits.md; notes/detach-exit-status-is-a-new-code.md.

The source attributes the implementation and tests to
[awebai/oats#856](https://github.com/awebai/oats/issues/856) and
[awebai/oats#858](https://github.com/awebai/oats/pull/858), with tmux 3.7c in its
reported probes. This harvest did not rerun the experiments or independently
verify the implementation's completion.
