---
type: Decision
title: Machine-scoped notices are action-free and driven by home outcomes
description: Preserve an inert machine-wide summary across workspace changes only as an app-scoped sticky notice, and create recovery notices for home outcomes rather than routine sweep diagnostics.
tags: [desktop, notifications, scope, recovery, truthfulness]
timestamp: 2026-10-27
---
# Scope follows what the notice can act on

The Desktop expert's 2026-10-27 decision makes an inert machine-wide summary
app-scoped, not workspace-scoped. Clearing context-bound feedback when the
workspace or connection changes protects against acting on a replacement
context. Applying that clearing rule to a machine-wide recovery summary,
however, loses a still-relevant result on the first workspace switch.

Admit app scope only for a sticky notice with **no descriptor, activation
callback or buttons**. Such a notice survives workspace and connection
clears and leaves only on explicit dismissal or notification-center disposal.
Reject invalid combinations rather than silently stripping their actions.
An action is what binds the notice to a context: the narrow exception is safe
because an inert summary has nothing that can target the wrong workspace.

This explicitly narrows the source's earlier clear-every-entry behavior;
it does not weaken [async intent ownership](../lessons/asynchronous-intent-and-truthful-outcomes.md)
or make an action-bearing notice safe after a context change. Ordinary
context-bound entries retain their existing clearing behavior.

# A sweep answer is not automatically a notice

Create a recovery notice only when a home was resumed, started fresh, is
blocked, or has a newly reportable refusal. Running or skipped homes,
unswept deployments and host warnings alone are quiet. Routine inventory or
readiness diagnostics already have the operator and roster surfaces; raising
them at every open trains people to dismiss the summary that should tell
them something happened to a home.

Repeated standing refusals follow the [shared trigger's news rule](observation-triggered-recovery-settles-targets.md#report-news-not-the-standing-answer).
Sweep-level host warnings are different from home outcomes: include each
once per client run in the next notice justified by a home. A quiet sweep
must not consume that once-only opportunity, because no warning was shown.
Receiving diagnostic data and presenting it to the person are distinct facts.

Rejected: showing a notice for every non-empty sweep response. It produces
persistent launch noise even when the response contains no home outcome.
Silence here is a presentation choice, not a claim that diagnostics vanished
or that a blocked session is ready for work. Preserve the existing
creation/readiness/success distinctions.

# Enforcement and evidence limits

Validate app scope at the notification boundary and test invalid action
combinations, both context-change paths, dismissal and disposal. Test the
outcome predicate separately from rendering, including warning-only quiet
sweeps followed by a home outcome, duplicate refusals and recovery. These
are code/test enforcement routes, not a permanent manual notice checklist.

Evidence: OKF proposal from oats-desktop-expert/session-resume-desktop-expert,
2026-10-27; notes/machine-scoped-notice-survives-workspace-switch.md;
notes/resume-notice-only-for-home-outcomes.md.

The older note's opt-out examples are historical: the proposal reports that
product direction removed opt-outs. They are not a concurrent preference
requirement. The decision retained here is outcome-driven presentation, not
who may opt out or which homes the kernel may recover. The source identifies
[awebai/oats#1564](https://github.com/awebai/oats/pull/1564), then unmerged, and
reports notification tests and a live launch notice. Continuous grouping was
unit-tested rather than proved live; this harvest did not audit or rerun the
implementation and makes no shipment or real-deployment recovery claim.
