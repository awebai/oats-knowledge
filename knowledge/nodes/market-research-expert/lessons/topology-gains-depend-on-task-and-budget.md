---
type: Lesson
title: Compare agent topologies by task dependence and compute budget
description: The 2026-11-02 research synthesis favors testing coordinated parallel reading separately from coupled writes and does not establish a universal single-writer or multi-agent advantage.
tags: [research, multi-agent, topology, evaluation, compute]
timestamp: 2026-11-02
---
# Conclusion and scope

Treat coordinated parallel reading and single-writer execution as a useful
**candidate baseline**, not a late-2026 consensus or a universally best
architecture. The source's research distinguishes decomposable search and
analysis from tightly coupled sequential work. Extra agents can add context
and inference budget as well as coordination overhead; a performance gain
alone does not identify which change caused it.

This is a source-reported synthesis dated **2026-11-02**. It informs how to
compare systems, not a prescription that every OATS task must have one writer.

# Evidence and the disagreement to preserve

The source identifies a Google/DeepMind/MIT scaling study, arXiv 2512.08296,
v3 dated 2026-04-08, as reporting sharply different multi-agent outcomes by
task: gains on decomposable finance work, losses on sequential planning, and
less error amplification with central coordination than independent agents.
The captured summary does not supply enough experimental detail to turn its
aggregate, threshold or benchmark-specific figures into general rules.

Two practitioner accounts do not settle the same write-topology question:

- Cognition's *Multi-Agents: What's Actually Working* (2026-04-22) is reported
  to favor single-threaded writes with additional read/review intelligence.
- Cursor's scaling account (2026-01-14) is reported to reject flat lock-based
  peers in favor of planners, workers and a judge, while retaining a case
  for parallel writers under hierarchy.

Thus these accounts support examining coordination structure, **not** a
claim that all successful systems serialize writing. The source also
reports that Anthropic's research-system improvement (2025-06-13) used a
substantially larger token budget. Its summary of equal-compute studies
includes an exception but insufficient study detail to resolve the issue;
no blanket equal-compute verdict is retained.

# Transfer to personal-agent workflows is untested here

A separate personal-use research pass, also dated 2026-11-02, reports that
its controlled multi-agent evidence concerns coding, research, finance and
QA, not personal mail, calendars or notes. It establishes no controlled
personal-workflow comparison and documents no personal-store clobbering
incident. These are limits of that investigation, not proof that no study
or incident exists.

Consequently, do not present file-ownership guidance from coding products
as a measured advantage for personal data stores. Data ownership is a
candidate design axis to test there, not an established replacement for
roles. Recheck this transfer boundary when controlled personal-workflow
studies or vendor reports with measured personal-use outcomes appear. The
[persona-attribution lesson](/nodes/market-research-expert/lessons/persona-labels-need-isolated-ablation.md)
remains the canonical home for role-label evidence; neither finding tests
or supersedes durable specialization.

# Consequence for research

Compare topologies on the same task and model with explicit token/cost and
context budgets. Separate read-only decomposition from shared-state writes,
and test whether the integration step preserves the workers' useful output.
A centralized coordinator is itself an error source to evaluate, not an
assumed cure. Do not equate adding agent names with adding expertise; see
[persona-label ablations](/nodes/market-research-expert/lessons/persona-labels-need-isolated-ablation.md).

This provides evidence questions for the
[coordination investigation](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md),
not a chosen replacement for existing OATS coordination policy.

**Owner and recheck:** market-research-expert. Recheck on controlled topology
studies with matched budgets, evidence about conflicting parallel writes,
or changed lab guidance. Update or supersede the conclusion and log the
change rather than extending it to a new model generation silently.

# Citations

1. Scaling study, [arXiv 2512.08296](https://arxiv.org/abs/2512.08296),
   v3 2026-04-08 as identified in the proposal.
2. Cognition, *Multi-Agents: What's Actually Working*, 2026-04-22; Cursor,
   scaling-agents account, 2026-01-14; Anthropic, multi-agent research-system
   account, 2025-06-13. These are the source's attributions, not independent
   reproductions or re-fetches by this harvest.

Evidence: OKF proposal from market-research-expert/coord-frontier-research-expert,
2026-11-02; notes/single-writer-parallel-readers.md.

Evidence: OKF proposal from market-research-expert/coord-personal-research-expert,
2026-11-02; notes/personal-agents-organise-by-data-ownership-not-roles.md
(personal-workflow transfer limit).
