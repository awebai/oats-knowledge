---
type: Lesson
title: Trial model identity needs launch enforcement and observation
description: Fixed-model trials need observed model identity and an enforced launch boundary that preserves native CLI subcommands, because preferences can miss the control and wrappers can invalidate probes.
tags: [operator, trials, measurement, launch, claude, pi]
timestamp: 2026-11-03
---
# A preference did not establish the experimental control

In the source's 2026-11-02/03 trial campaign, souls declared the intended
model, but the selected launch configuration supplied none. Some recorded
launches had a null model and the panes ran Claude's default instead. A
builder also spawned its reviewer with another explicit model, which reached
the reviewer. The intended single-model control was therefore not in force.

This is a source-reported observation on OATS 0.69.8 and Claude Code 2.1.308,
not proof that the kernel never reads a soul's model field or a complete
precedence contract. The source explicitly left that implementation question
unconfirmed. Do not repair ordinary deployments from this observation by
inventing settings or replacing their launch policy.

# What worked in the controlled fixture

The trial's launch executable removed incoming model options and supplied
the experiment's selected model. A probe deliberately spawned with a
different model reportedly showed the intended Sonnet 5.5 in its pane;
reported messaging and running-state checks still passed. That establishes
one successful fixture probe, not that every later seat or harness is pinned.

For an experiment that deliberately holds model identity fixed, test the
launch boundary against default selection and conflicting child-spawn
arguments. Check the effective model at the first settled startup of the
participating seats, including reviewers, rather than treating a soul's
preference or a requested model as execution evidence. A mismatch or unknown
model disqualifies the run from a claimed fixed-model comparison until its
actual population is established. Pricing usage at the intended model does
not correct a run that used another one.

This is distinct from an ordinary
[host-wide launch preference](/nodes/oats-setup-admin/lessons/a-host-wide-pi-model-is-one-launch-set-write.md):
a preference expresses a host choice; this fixture intentionally constrains
experiment inputs. The wrapper is a reported trial remedy, not a required
production launcher or permission to override an operator's model choice.
Keep native authentication, discovery and permission policy intact under
[the native-launch decision](/nodes/oats-kernel-expert/decisions/harness-native-launch.md).

# A model wrapper must preserve native subcommand dispatch

In a later 2026-11-03 delivery probe on OATS 0.69.9 and pi 1.3.0, the source
reports that prepending a model option to every invocation broke the spawn
probe. The probe invoked pi's package-list subcommand through the wrapper;
with the model option prepended, pi reportedly treated the subcommand word
as a prompt and the probe reported the messaging extension as not installed.
That diagnostic did not establish an absent package: the wrapper had changed
what was being executed. Passing subcommands through without the model
prefix was the reported correction.

Qualify the wrapper's command dispatch as well as its model control. A
package probe and an agent launch are different invocations of the same
executable. Keep native subcommands intact and exercise the real probe
through the selected wrapper. This is a version-bound failure report, not a
permanent list of pi subcommands or a prescription to replace production
launchers. Any mirrored command set needs a regression against the supported
CLI, as the [dispatch-drift lesson](/nodes/oats-kernel-expert/lessons/per-command-enumerations-drift-from-the-dispatch.md)
explains.

# Elimination route and limits

Put the model invariant and a version-qualified startup check in the trial
launcher, with regressions for absent model arguments, conflicting nested
spawns and native subcommand/probe dispatch through a wrapper. Record
requested and observed model identity separately; do not make manual pane
inspection the permanent enforcement mechanism. These are checks to
implement and requalify, not tests certified by this harvest. They complement
[run, origin and message identity](/nodes/oats-operator-expert/lessons/claude-trial-metrics-need-origin-and-message-identity.md),
which owns population selection and usage counting. Model pinning also says
nothing about the [ambient extension capabilities](/nodes/oats-operator-expert/lessons/trial-extension-tools-are-part-of-the-capability-baseline.md)
that an agent can use.

Evidence: OKF proposal from oats-operator-expert/coord-trial-kit-expert, 2026-11-03; notes/kit-model-pin-and-private-tmp.md.

The harvest read the captured proposal and note, not the launcher, panes or
transcripts, and repeated no probe. The evidence covers one host and harness
version; early mixed-model runs are not Sonnet 5.5 comparison evidence, and
no corrected billing totals or universal model-selection rule are established.

Evidence for the pi wrapper refinement: OKF proposal from oats-operator-expert/coord-blind-trial-kit-expert, 2026-11-03; notes/pi-in-scratch-kit.md.

The later probe and correction are source-reported. This harvest did not
read the wrapper or repeat the probe; no cross-version dispatch guarantee
or exhaustive subcommand inventory is established.
