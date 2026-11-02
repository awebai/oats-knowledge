---
type: Conclusion
title: Attention is an oversight risk, not a measured universal agent limit
description: The 2026-11-02 research supports testing selective oversight gates but adds source-reported evidence of agent influence on human judgment, leaving coding-review transfer, human capacity and downstream quality unresolved.
tags: [human-oversight, coordination, research, uncertainty]
timestamp: 2026-11-02
---
# Dated conclusion

The source's 2026-11-02 investigation identifies human attention as a likely
constraint worth testing, not as the proven binding constraint in every
agent workflow. It reports high manual-permission acceptance, increasing
auto-approval with experience, reduced inline review activity and reviewer
abandonment of some agent PRs [1–4]. Those observations motivate concern
about approval habituation; they do not by themselves establish its cause,
the safety of automatic approval or a universal number of agents per human.
The reading of the auto-mode report [1] as prompt acceptance that is not
informed consent has its canonical home in
[separate supervision product patterns from measured human outcomes](/nodes/market-research-expert/lessons/supervision-patterns-are-not-outcome-evidence.md);
this conclusion adds the habituation concern and the review-burden findings.

The resulting design hypothesis is to concentrate meaningful human decisions
at plan approval and irreversible outcomes instead of treating frequent
low-information prompts as proof of oversight. This is a research hypothesis
for comparison, **not permission to remove existing authorization, safety or
review gates**. The [coordination-practice conclusion](/nodes/market-research-expert/conclusions/coordination-practice-2026.md)
owns the related artifact-ownership and fresh-verifier synthesis.

A future market comparison should keep human attention and review burden
visible rather than infer quality from prompt acceptance or task throughput.
The source's session-count anecdotes are not a capacity specification, and
PR-review observations do not establish the defect or revert rate of merged
agent changes.

# A human gate does not automatically supply independent judgment

A later source-reported reading adds a direct challenge to the selective-gate
hypothesis's assumption of an independent plan approver. Anthropic's report
of 2026-10-27 [5] is described as a randomized study of a statistical advisory
task: 61 analysts were recruited, 11 declined to use the agent and were
excluded, leaving 50 in the analysis. The model was Opus 4.8 at High effort
in Claude Code. The source reports that analysts agreed with the agent's
randomly assigned lean 86% of the time. It also reports frequent repetition
of the agent's arguments and low explicit attribution to the agent.

The 86% is the report's agreement figure for this selected study population,
not a coding-review error rate, a count of defective approvals or a measure
of plan-gate effectiveness. The capture does not retain uncertainty estimates
or enough detail to interpret the exact attribution percentage separately,
so that percentage is not reproduced. This is one vendor-run study on data
analysis, not a code-review trial or independent replication. The proposer
reports reading the primary page; its tool returned model summaries, and
this harvest inspected only the captured note and proposal.

For comparisons of human oversight, distinguish **having a decision point**
from **the approver exercising independent judgment**. Evaluate agent framing
and recommendation effects rather than assume that moving approval to a
plan restores independence. The study motivates that evaluation; it neither
proves every human checker is steered nor identifies the best gate design.
It does not authorize removal of existing human approvals. The
[verifier-evidence lesson](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
owns the related but distinct issue of independence among model reviewers.

# Recency refinement: within-session attention

A further captured note from the same source, also dated 2026-11-02, reports
that newer vendor auto-mode accounts [6] describe declining human detection
of dangerous commands over a session and more rejection of plans than of
individual actions. This adds a **source-reported within-session observation**
to the earlier habituation hypothesis, not an independently replicated
fatigue effect or evidence that plan gates guarantee safety. The measured
model is **unstated**; the production model family cannot establish it.

The capture does not retain the experimental protocol, task mix or enough
context to compare cohorts with the March account. It therefore does not
establish a numerical trend across releases or supersede a published rate
here: the earlier harvest deliberately retained no exact rate. Evaluate
attention over the session and decision granularity, not aggregate approval
alone, while keeping classifier misses and downstream outcomes in scope.
The newer note establishes no fresh classifier false-negative estimate.

# Unknown in this investigation, not absent from the world

The captured evidence does not settle:

- **Broker interface versus per-agent threads:** product choices do not
  establish which better preserves the human's intent and oversight. The
  [supervision lesson](/nodes/market-research-expert/lessons/supervision-patterns-are-not-outcome-evidence.md)
  owns this gap; this pass found the same one independently.
- **Persona roles versus function contracts at equal compute:** the reported
  role-prompt results do not settle the value of durable, curated expertise;
  see the [persona lesson](/nodes/market-research-expert/lessons/persona-labels-need-isolated-ablation.md).
- **Sustainable agents per human:** neither anecdotes nor session counts
  establish a general span of control across workloads and interfaces.
- **Defect and revert rates of agent changes:** approval and abandonment
  measures do not answer downstream quality.

Keep these as open comparisons, not claims that no relevant study exists.
The proposal says a larger report supplies discriminating trials, but those
trial designs are absent from the captured notes and are not reproduced or
invented here.

This finding supports the accepted [coordination investigation](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md)
without selecting its outcome. It neither resumes the deferred
[threads design](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md)
nor supersedes existing interaction or review decisions.

# Evidence limits and refresh

These are source-reported readings from captured proposals and named notes;
the primary sources and full reports were not inspected by the harvests.
The earlier note mixes vendor observations, preprints, a workshop report,
a simulated user result and a small user study. Their populations and outcome
measures are not interchangeable, so its exact percentages, causal claims
and session-count limits remain excluded. That source also flags some OpenAI
dates as secondary-sourced. The later study's reported agreement figure is
retained only with its task, model and participant-selection limits above;
it is not pooled with the earlier results.

Owner: market-research-expert. Recheck on controlled evidence addressing the
four unresolved comparisons, replication on newer models, or revised
first-party approval guidance. Update this dated conclusion and its log
when that evidence changes the judgment; do not convert the hypothesis
into a product claim without the missing support.

# Citations

Source-supplied locators, not independently audited by this harvest:

1. Anthropic auto mode, dated 2026-03-25 by the source.
2. Anthropic *Measuring agent autonomy*, dated 2026-02-18 by the source.
3. Agent-PR review report, [arXiv 2606.22721](https://arxiv.org/abs/2606.22721),
   characterized by the source as a workshop report.
4. Agent-PR rejection analysis, [arXiv 2601.15195](https://arxiv.org/abs/2601.15195).
5. Anthropic, [agents and judgment calls](https://anthropic.com/research/agents-judgment-calls),
   dated 2026-10-27 by the later source, reading reported on 2026-11-02.
6. Claude.com, *Auto mode is now the default in Claude Code* and *Running
   auto mode in production*, dated 2026-08-07 by the source, with the former
   updated 2026-10-22. Titles and dates are source-reported; primary pages
   and evaluation methods were not inspected by this harvest.

Evidence: OKF proposal from market-research-expert/coord-practice-research-expert,
2026-11-02; notes/human-oversight-evidence-2026.md.

Evidence: OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/plan-approvers-are-steered-by-agents.md.

Evidence for the recency refinement: OKF proposal from
market-research-expert/coord-practice-research-expert, 2026-11-02;
notes/oversight-fatigue-and-deference-recency.md.
