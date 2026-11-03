---
type: Decision
title: Messaging does not compose task coordination
description: Keep task teaching and task-only prerequisites in oats.aweb-tasks rather than oats.aweb, because choosing messaging does not choose a task layer and even conditional guidance teaches unavailable behavior.
tags: [capabilities, composition, messaging, tasks, readiness]
timestamp: 2026-11-03
---
# Decision and rationale

Choosing aweb messaging does not choose aweb task coordination. Task teaching
belongs only in `oats.aweb-tasks`, for homes that compose it. The source
reports explicit human direction to keep all task teaching out of
`oats.aweb`: its inject, Comms line and skills, including bundled aweb skills.
Even a conditional pointer to the tasks capability is excluded. It still
puts task vocabulary and commands into every messaging-only home's context,
encouraging an agent to reach for a layer it was never given.

The rationale is independent composition, not a preference for a particular
task backend. The directing human expects many deployments to use aweb only
for messaging. A workspace must be able to make that choice without receiving
instructions for task claiming. This specializes the broader
[capability-owned coordination boundary](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md)
at the messaging/tasks seam; it does not move coordination into core.

# Task-only costs follow the composed capability

The same boundary applies to behavior and prerequisites. A change needed only
for aweb task claims, such as a claim-heartbeat readiness floor, its warning
or upgrade advice, applies only where `oats.aweb-tasks` is composed. A
messaging-only home does not acquire task claiming or a new prerequisite for
an unused task feature merely because both capabilities use the same CLI.

Forcing that upgrade on every messaging deployment charges them for a feature
they did not select. Review the purpose of the new requirement and the
capability that uses it before widening a floor. This is not a waiver of
actual messaging prerequisites or faults in selected features; the
[healthy-default warning lesson](/nodes/oats-maintainer/lessons/healthy-defaults-do-not-warn-about-optional-features.md)
remains canonical for that distinction.

# Enforcement and evidence limits

Enforce the instructional boundary with a test of the text composed by
`oats.aweb`, bundled skills included, rather than a reviewer remembering every
teaching point. Pair task-only readiness cases with messaging-only cases that
prove the extra check and warning are absent. These are prevention routes,
not a claim that this harvest changes tests, skills or the instructions in
existing homes.

Acceptance is **source-reported**: Pepe directly in the source maintainer's
session on 2026-11-03. The proposal also reports the other maintainer side's
agreement on scope in aweb thread `e0d7902a` that day. Neither the session nor
the thread was inspected; this is not independently verified human authorship
or evidence of a shipped change. No existing human-accepted decision is
superseded.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/oats-aweb-teaches-no-tasks.md;
notes/aweb-task-claiming-only-under-aweb-tasks.md.
