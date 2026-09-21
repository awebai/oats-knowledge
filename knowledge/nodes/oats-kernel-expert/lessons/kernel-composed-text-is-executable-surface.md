---
type: Lesson
title: Kernel-composed instructions are executable surface and may assert only what every instance has
description: Instructions win over code because they are what the agent acts on; shared text states the invariant and defers the variable part, composed blocks are a set, and anything a capability supplies belongs in that capability's own injection.
tags: [kernel, instructions, injections, composition, provider-neutrality]
timestamp: 2026-07-27
---
# Lesson

Learned 2026-07-27, across six review rounds of the instance-placement
hardening. The kernel was hardened against instances homing in the wrong place
— resolution, then containment, then the containment's bases, then the race —
while its own packaged briefing still told every agent to move into the work
tree and stay there. Every instance read that at wake-up and then ran
operational commands from exactly the place the code was being hardened
against. **The instructions and the code were arguing, and the instructions
win**, because they are what the agent acts on. A fix for "the agent operates
from the wrong place" is complete only when the text that teaches placement
changes too: grep the injections for the behaviour just made impossible in
code.

**Say what each directory is for, not where to sit.** The replacement was
deliberately not "stay home" — that is the same failure mirrored. State the
purpose of each location and let the agent move.

**Shared text states the invariant and defers the variable part.** A block
that read as mode-neutral was one mode's rules with the label filed off; it
contradicted the read-only workspace mode, the episodic state the same text
placed in the home, and the report a shipped service agent is required to
write. Write the general block *after* the specific cases, or it is one case in
disguise.

**Composed instructions are a set.** Each block was defensible alone; two of
them gave one kind of instance opposite answers, and no test saw it because no
tested composition included that kind. A contradiction can only exist where two
blocks meet, so every conditional variant — kind × mode × layer — needs its own
composed assertion. Structure is testable where prose is not: assert which
block owns a protocol, not whether some phrase appears.

**Text composed for every instance may assert only what every instance has.**
The fix for one contradiction wrote a knowledge-capture protocol into the
kernel block; an instance without that capability has neither the files nor the
command, and service agents have that layer suppressed by design. Anything a
capability supplies — its files, commands, protocol — belongs in that
capability's own injection, appearing exactly when the capability does. The
kernel block's job is to state the invariant and defer. Likewise, a skill that
describes the *environment* rather than the *work* is describing what the
spawner varies: enumerate the cases or name the briefing as the authority.

**Provider neutrality of prose is not machine-decidable.** The ladder —
substring denylist → broader denylist → passage snapshot → whole-surface hash —
was climbed over five review rounds and every rung rejected by the maintainer.
A denylist built from this deployment's brands cannot establish neutrality; a
snapshot selects decoy markers; a hash proves only that nobody refreshed a
checksum and turns a semantic property into a mechanical chore. The signal
missed: when each fix is strictly more clever than the last and the finding
rate does not fall, the target is not machine-checkable. Tests pin bounded
observable properties (no shipped surface issues an unconditional
layer-specific command; exactly one composed block owns the knowledge
protocol, none when the layer is suppressed); semantic neutrality remains a
review obligation whenever the prose changes. Related craft: a revert check
that silently no-ops proves nothing — assert that the revert applied.

**Accepted risk is documented where operators read.** A residual the runtime
cannot close, described only in a source comment, is a prerequisite no
deployment ever sees. If a security decision shifts responsibility to the
operator, public documentation says so in the section they would consult.

# Related

[Separate operational home from granted work authority](/nodes/oats-kernel-expert/decisions/home-work-authority.md);
[Keep kernel responsibilities generic and capability runtimes complete](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md);
[External knowledge needs source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md).

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/generated-instructions-executable-surface.md` (2026-07-27); SHA-256 `5ad73de51708527522ca490f5bffe0da56e23217f50de6c11a4a46e6c8107e4a`.
2. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/shared-skill-spawn-paths-briefing-authority.md` (2026-07-27), environment-versus-work rule only.
