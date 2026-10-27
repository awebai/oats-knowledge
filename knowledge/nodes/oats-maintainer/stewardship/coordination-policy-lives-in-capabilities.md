---
type: Decision
title: Coordination policy lives in capabilities, not in the kernel or oats.core
description: Review separates neutral lifecycle mechanisms from team coordination policy, including when to retire children, and keeps core authority wording from contradicting a composed capability.
tags: [stewardship, coordination, capabilities, instructions, retirement]
timestamp: 2026-10-27
---
**Owner: oats-maintainer. Update-on-change: whoever changes this coordination
boundary records the new decision and its rationale here.**

# Decision and rationale

The source reports product-owner direction on 2026-10-27 applying the
capability boundary to automatic retirement as well as shared-work flags.
The kernel and `oats.core` supply and neutrally describe mechanisms; the
team's composed capabilities decide when its agents use them. For OATS's
engineering process, guidance about when a parent retires finished children
belongs in `oats.engineering`, not in `oats.core` or kernel instructions.

This is not a flag-specific exception. Putting a team's coordination policy
in generally composed operating instructions imposes that process on souls
that never selected it. Keeping the mechanism neutral lets teams compose
different processes without teaching contradictory rules in the common layer.
It applies the existing
[kernel/capability responsibility boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md);
the [shared-work decision](/nodes/oats-maintainer/decisions/parent-child-lines-require-declared-shared-work.md)
remains the canonical home of that flag's semantics and engineering convention.

# Review consequence

When a change adds guidance about **when** to act to a kernel block or
`oats.core`, distinguish a mechanism's requirements from a coordination
policy. Move the latter to the capability that owns the process. Core may
need an authority clarification so a composed capability can authorize the
action alongside a task or the human, but that clarification must not teach
the capability's policy itself or independently authorize an action.

The rejected retirement design placed a mandatory parent-retirement rule in
the core inject and a checklist defining finished work in `oats-operate`.
Moving only the checklist out would leave the policy in the wrong layer.
Neutral documentation of the retire mechanism is not the rejected policy;
this decision does not remove lifecycle operations or their safety requirements.

The operating review belongs in the maintainer's `direction-gate` skill.
Structural composition tests should check which capability owns a protocol;
semantic neutrality still needs review, as the
[composed-text lesson](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md)
explains. This harvest changes no skill and claims no new enforcement.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer, 2026-10-27; notes/coordination-policy-lives-in-capabilities.md.

The source attributes the retirement direction to the product owner, relayed
by the lead during [awebai/oats#1580](https://github.com/awebai/oats/pull/1580),
and distinguishes it from the earlier shared-work direction. Acceptance is
source-reported, not independently audited here. At capture the core change
and engineering retirement change were not yet merged. This records the
ownership decision and rejected design, not shipped policy, an operational
retirement checklist or permission to retire any particular instance.
