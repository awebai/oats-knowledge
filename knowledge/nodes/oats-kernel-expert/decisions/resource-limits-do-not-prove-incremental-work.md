---
type: Decision
title: Resource limits do not prove bounded or incremental reconciliation
description: Reconciliation acceptance measures memory and new-content work with resource caps disabled, then proves continued progress with caps enabled, because a bounded wrapper can conceal an unbounded algorithm or repeated non-progress.
tags: [kernel, reconciliation, performance, evidence, resource-limits]
timestamp: 2026-10-13
---
# Decision

Treat resource limits as a protective backstop, not evidence that a
reconciliation algorithm uses bounded memory or does incremental work.
The source reports founder direction and agreement from both maintainer
lanes on 2026-10-13 rejecting a bounded wrapper as the algorithm correction
[1]. Fix and qualify the memory and work behavior independently of service
migration or its resource policy.

Acceptance needs separate evidence:

1. With resource caps disabled, increase input size while keeping record
   size fixed and measure memory scaling. A process stopped by a limit has
   not demonstrated that its allocation is independent of history size.
2. With caps disabled, measure content read and records parsed for unchanged
   input and small appends, including fresh processes. Work must track newly
   appended content rather than repeatedly reading and parsing old history.
3. With caps enabled, demonstrate continued progress across bounded passes.
   One successful capped pass does not establish that later passes reach
   the backlog or finish the required work.

A capped worker can repeatedly stop at the same point while respecting
every limit. Streaming can remove a large allocation while still rereading
the entire journal on every invocation. Neither result alone proves both
memory boundedness and incremental work. Keep the limits as defense, but do
not use them to excuse input-size allocations, historical rescans or a
worker that cannot make progress.

# Elimination route

Correct the algorithm and retain small deterministic allocation and
content-work regressions in the permanent suite. Count bytes read and
records parsed for unchanged input, small growth and fresh processes; keep
large scaling measurements outside ordinary CI. These checks enforce the
acceptance distinction; the durable decision records why success under
caps cannot substitute for them. This records implementation direction,
not completed fixes, landed tests or measured performance.

# Related

[Observation must not harm the observer](/nodes/oats-kernel-expert/lessons/observation-must-not-harm-the-observer.md)
owns the security boundary for observing another agent's tree. This decision
adds a separate resource-and-progress acceptance criterion for reconciliation.

[Narrow race evidence needs unpaused controls and bounded fixtures](/nodes/oats-kernel-expert/lessons/narrow-race-evidence-needs-unpaused-controls.md)
owns experimental resource containment; disabling the worker's caps for a
measurement does not remove that fixture discipline.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-upgrade-fixes, 2026-10-13; notes/resource-limits-do-not-prove-incremental-work.md.

1. The proposal and named note attribute algorithm-first direction to the
   founder and agreement to both maintainer lanes in
   [awebai/oats#1108, direction](https://github.com/awebai/oats/issues/1108#issuecomment-6151859713),
   [release-lane agreement](https://github.com/awebai/oats/issues/1108#issuecomment-6151968578)
   and [lead acceptance](https://github.com/awebai/oats/issues/1108#issuecomment-6152021799).
   Acceptance is source-reported: this harvest read the proposal and named
   note, not those discussions, and did not reproduce a performance measurement.
