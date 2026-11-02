---
type: Lesson
title: Separate supervision product patterns from measured human outcomes
description: The 2026-11-02 research synthesis identifies policy-based supervision and worker drill-down as a hybrid candidate, not proof of lower attention cost or safer outcomes.
tags: [research, supervision, human-oversight, interfaces, evaluation]
timestamp: 2026-11-02
---
# Conclusion and scope

Policy-bounded execution with review of outcomes, a lead-agent interface and
direct access to workers is a **candidate supervision pattern** reported in
the 2026-11-02 research pass. It is not evidence that broker-only interaction
or a separate thread for every agent is best. A shipped interface shows an
available design, not that it saves human attention or improves safety.

The scope is the source's reading of selected vendor products and reports.
No independent comparison of supervision attention cost or broker versus
per-agent threads is established by the captured evidence. This is a gap
in this investigation, not a claim that no such study exists anywhere.

# Evidence and limits

The source cites Anthropic's auto-mode report of 2026-03-25 as reporting high
acceptance of permission prompts alongside misses by an action classifier
in a small evaluation. It also cites the sandboxing account of 2025-10-20 as
reporting fewer prompts. Neither frequent acceptance nor prompt reduction
alone establishes informed consent, low attention cost or equivalent safety.
The exact rates and small-sample estimate are not promoted without the
underlying evaluation context.

The source describes lead/worker access or task-to-artifact review patterns
in Claude Code agent teams, managed Devins, the Codex app and GitHub Agent
HQ. These are vendor/product observations as reported by the source, not a
live product audit by this harvest. They support considering a hybrid
interface, but not the proposal's universal claim that every product keeps
the same drill-down behavior or that the market has converged on one design.

# Consequence for comparisons

Evaluate permission policy, isolation boundaries, review artifacts and the
human's ability to inspect or intervene in a worker separately. Compare the
attention required to understand and resolve a real task, not just prompt
counts or the presence of a coordinator. Keep approval authority explicit;
a report of prompt fatigue does not authorize bypassing existing approval
requirements.

This supplies a research question for the accepted
[coordination investigation](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md),
which deliberately leaves the human-interaction choice open. It does not
select a replacement design or resume a deferred implementation. The
[task-and-budget topology comparison](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md)
addresses agent performance, a different outcome from human supervision
cost.

**Owner and recheck:** market-research-expert. Recheck on independent
attention-cost or supervision-safety studies, controlled broker/thread
comparisons, or material changes to the cited product interactions. Update
or supersede this conclusion and log the change before presenting a newer
product snapshot as current evidence.

# Citations

1. Anthropic, auto-mode report, 2026-03-25, and sandboxing report,
   2025-10-20, as identified by the proposal; vendor-reported evidence, not
   independently re-fetched or replicated here.
2. Claude Code agent teams, Cognition managed Devins, OpenAI Codex app and
   GitHub Agent HQ: product patterns reported by the source as of 2026-11-02,
   not a claim of feature parity, universal availability or measured benefit.

Evidence: OKF proposal from market-research-expert/coord-frontier-research-expert,
2026-11-02; notes/supervision-moves-to-policy-and-outcomes.md.
