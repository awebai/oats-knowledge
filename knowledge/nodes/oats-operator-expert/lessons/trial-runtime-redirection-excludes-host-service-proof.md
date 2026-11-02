---
type: Lesson
title: Trial runtime redirection excludes host-service proof
description: A Linux trial reported that redirecting runtime state made the user service manager unreachable, so its successful tick-loop wake proves neither host-service installation nor complete containment.
tags: [operator, trials, isolation, runtime, evidence]
timestamp: 2026-11-02
---
# Finding

The source's scratch-deployment investigation reports that redirecting
`XDG_RUNTIME_DIR` into the trial root, within a deliberately constructed
`env -i` environment, made the host user's systemd manager unreachable.
OATS then warned that the harness shared the tmux server's cgroup. That was
an expected consequence of the selected trial boundary, not evidence that
normal host scope placement was broken.

This adds an operator's observed way of excluding one host surface to the
existing [scratch-deployment boundary](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md#scratch-deployment-boundary):
relocating a deployment alone is not isolation. It does not replace that
rule with a guarantee that one environment variable blocks all routes to
the host, prevents every timer installation or provides a security sandbox.

**A surface deliberately excluded from the fixture is also excluded from
the proof.** The source's scheduled-wake acceptance used a tick loop. It
therefore does not establish installation or execution through the host's
per-user scheduler or wake service. A trial meant to test those surfaces
needs a separately authorized environment that actually exercises them;
do not restore access to the live host merely to make the check pass.

# What remained shared

The source retained the host's native `CLAUDE_CONFIG_DIR` without copying
credentials. Its outside-root scan attributed writes to Claude transcripts,
history and native configuration/backups. Preserve that as an observation
from the examined runs, not an exhaustive allowlist of every future Claude
write. Neither successful mail nor process teardown proves absence of other
file or service effects.

The proposal also recommends redirecting HOME and all state roots for every
command. **That blanket prescription is not adopted here.** The accepted
[native-authentication decision](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md)
forbids substituting private HOME/configuration/profile contexts to make
isolation evidence pass. The proposal cites no human acceptance superseding
it. Keeping a native config selector is not a general exemption from that
boundary. Preserve native authentication, name the residual shared state,
and stop if the required boundary cannot be obtained through supported
interfaces without violating that decision.

Similarly, Docker was unavailable in the source's environment; that is not
a general reason to reject containers or equate environment redirection
with container isolation.

# Turn the observed traps into launcher checks

The source also found two practical limits: a trial root inside a real
deployment risks OATS walking up to that deployment's configuration, and a
long root can exceed the Unix socket-path limit for the private tmux server.
Its approximate 100-character socket-path guard is not a portable platform
constant. Refuse ancestor deployment discovery and validate the actual
socket path for the selected platform in the launcher rather than relying
on an operator remembering these traps.

The [runner-isolation lesson](/nodes/oats-expert/lessons/automatic-per-user-writes-need-runner-isolation.md)
already owns state-write guards and interruption cleanup. The
[fixture-principal lesson](/nodes/oats-expert/lessons/real-proof-boundaries-preserve-fixture-isolation.md)
already owns deliberate child environments: a private tmux socket does not
prevent inherited instance or messaging selectors from choosing a live
principal. Link those rules rather than treating an unset list as sufficient.
Executable checks should exercise contaminated caller environments, state
escape, nested roots, socket length and interrupted cleanup. No such
regression coverage is certified by this harvest.

# Evidence and limits

Evidence: OKF proposal from oats-operator-expert/coord-trial-kit-expert, 2026-11-02; notes/scratch-deployment-isolation.md.

The source reports development and smoke runs on one Linux (Arch) host with
OATS 0.69.8, aw 1.36.35, Claude Code 2.1.308 and oats.aweb 1.32.1. This
harvest did not inspect the kit, transcripts or host, or repeat the scan.
The report supports the bounded runtime-manager observation and its proof
limit, not a supported cross-platform isolation procedure.
