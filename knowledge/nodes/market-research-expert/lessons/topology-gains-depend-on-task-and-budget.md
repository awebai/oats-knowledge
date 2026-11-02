---
type: Lesson
title: Compare agent topologies by task dependence, capability baseline and budget
description: The 2026-11-02 research synthesis treats task dependence, single-agent capability and compute budget as separate comparison variables, without establishing a universal single-writer or multi-agent advantage.
tags: [research, multi-agent, topology, evaluation, compute, model-capability]
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

# Generation-anchored recency update, 2026-11-02

A later pass makes **single-agent capability on the tested task** an explicit
comparison variable, not just model name or release date. The source now
identifies the scaling study's models as GPT-5, Gemini 2.x and Claude 3.7–4.5;
that is not a measurement on the newer models named below. Its reported
journal-publication update does not establish that the preprint's figures
survived unchanged, so no new publication status or threshold is asserted here.

The source reports a Vals AI comparison, page dated 2026-10-09, of **GPT 6 Sol
and Claude Opus 5.5**, one run over 50 apps [3]. It reports higher costs for a
lead with five subagents, a significant gain only at the weakest baseline,
no significant gain at the high baselines, and a larger gain from increasing
single-agent reasoning effort. This is a bounded reported result, not a
replicated current-generation verdict. The capture does not retain methods,
uncertainty or configurations sufficient to reuse its numerical effects or
to establish an equal-cost causal comparison.

Keep the counterexample: the source reports that Agensh, **GPT-5.6-sol**,
raised pass rates with parallel writers but lacked an equal-cost control [4].
Neither report establishes that teams never improve high-capability models,
that more writers cause the gain, or that single-writer execution is universal.
Anthropic's 2026-10-22 one-loop-first guidance is vendor advice, not a measured
comparison; it supplies no measured-model result in this capture [5].

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
context budgets. Record the single-agent baseline and compare adding agents
with spending more effort on that baseline; report quality, cost and wall-clock
time separately. Apply the [model-generation reporting decision](/nodes/market-research-expert/decisions/date-evidence-and-name-model-generations.md)
rather than treating a recent publication as a current-model measurement.
Separate read-only decomposition from shared-state writes,
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
3. Vals AI, single-agent versus lead-plus-subagents comparison, page dated
   2026-10-09 by the source; no exact page URL is supplied in the capture.
4. Agensh, [arXiv 2609.26781](https://arxiv.org/abs/2609.26781), dated
   2026-09-22 by the source.
5. Anthropic, *When to fold subagents into your main agent loop*, claude.com,
   dated 2026-10-22 by the source; vendor guidance without published data
   according to the proposal.

The recency update uses the captured proposal and note, not independent
page fetches or experimental replication. Model names and dates above are
source-supplied; they do not establish which models are currently leading.

Evidence: OKF proposal from market-research-expert/coord-frontier-research-expert,
2026-11-02; notes/single-writer-parallel-readers.md (initial synthesis and
subsequent generation-anchored recency update).

Evidence: OKF proposal from market-research-expert/coord-personal-research-expert,
2026-11-02; notes/personal-agents-organise-by-data-ownership-not-roles.md
(personal-workflow transfer limit).
