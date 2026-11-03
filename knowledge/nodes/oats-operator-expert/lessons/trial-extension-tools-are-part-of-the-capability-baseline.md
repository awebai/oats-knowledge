---
type: Lesson
title: Trial extension tools are part of the capability baseline
description: A pi trial reused host configuration and inherited extension tools, including out-of-framework delegation, so record effective capabilities and per-run use rather than assume equal availability removes the confound.
tags: [operator, trials, measurement, pi, extensions]
timestamp: 2026-11-03
---
# Reusing authentication context also carried extra tools

In the source's 2026-11-03 T6 campaign, agents under test used the host's pi
configuration in place. That exposed host extension tools, not merely the
intended login and messaging capability. The source reports PR-watch/status
tool use across runs and an agent spawning subagents outside OATS through
an extension. It also reports uneven tool use between the campaign's models.

This is a source-reported observation on OATS 0.69.9 and pi 1.3.0, with
Copilot claude-opus-5.5 and gpt-6-sol. It is not a claim that every pi install
loads the same extensions or that every available tool was used. Equal
access across experimental arms does not establish equal use, nor does it
isolate the effect of the coordination design under test. Out-of-framework
delegation can add participants and work not described by that design.

# Record the effective capability baseline, not just the framework

Before interpreting a trial as a comparison of framework roles, record the
extensions and tools actually available to its participating seats. Retain
per-run tool use and out-of-framework delegation as explicit confounds;
distinguish availability, invocation and resulting work. A control on the
judge or trial driver does not prove the same control held for agents under
test. Include these observations in the trial report rather than treating
a shared configuration or successful messaging probe as a clean baseline.

The general [task, capability and budget comparison lesson](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md)
owns causal comparison discipline. This operator lesson supplies a concrete
way the declared baseline was exceeded, not a model or topology ranking.
[Model enforcement](/nodes/oats-operator-expert/lessons/trial-model-identity-needs-launch-enforcement.md)
and [runtime redirection](/nodes/oats-operator-expert/lessons/trial-runtime-redirection-excludes-host-service-proof.md)
prove different boundaries; neither establishes extension-tool exclusion.

# Preserve native launch and authentication

The proposed private trial pi folder with a login reference is **not adopted
as an isolation recipe**. The accepted [native-launch decision](/nodes/oats-kernel-expert/decisions/harness-native-launch.md)
rejects per-instance isolation adapters, and the [native-authentication decision](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md)
forbids surrogate configuration/profile contexts and credential handling to
make isolation evidence pass. The proposal cites no human acceptance
superseding those decisions. Keeping a login by reference does not itself
establish compliance or a supported boundary.

Record and disclose residual capabilities. If a comparison requires a
boundary that cannot be obtained through authorized supported interfaces
while preserving those decisions, name the limitation instead of rebuilding
an isolation adapter or presenting the trial as controlled.

# Elimination route and limits

Put effective-tool inventory and per-run usage/delegation capture into the
trial launcher and collector, with checks that every measured seat is
covered. Test reporting against a fixture with an unexpected extension and
with out-of-framework delegation; missing records must remain unknown, not
zero use. These are proposed measurement controls for separate implementation,
not a certified exclusion mechanism or a defense delivered by this lesson.

Evidence: OKF proposal from oats-operator-expert/coord-blind-trial-kit-expert, 2026-11-03; notes/pi-in-scratch-kit.md.

The capture describes one campaign on one host. This harvest read only the
proposal and named note, not the configuration, tool traces, metrics or
trial results. It did not repeat a launch or establish any effect on cost,
quality or arm outcomes. The reported aggregate use count is not retained
as an independently audited rate or evidence of a stable model propensity.
