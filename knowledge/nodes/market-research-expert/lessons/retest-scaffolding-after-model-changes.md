---
type: Lesson
title: Re-test coordination scaffolding when model capability changes
description: The 2026-11-02 research synthesis treats a harness component's value as model- and task-dependent and does not equate durable files with demonstrated learning gains.
tags: [research, harnesses, memory, evaluation, model-capability]
timestamp: 2026-11-02
---
# Conclusion and scope

A coordination component that helps one model on one task can become
unnecessary overhead on another. Preserve the reason for each planner,
evaluator or progress mechanism so a later comparison can test whether it
still earns its cost. This is a reason for controlled re-evaluation, not a
prediction that every harness shrinks monotonically or that safety and
authority boundaries become optional when a model improves.

This is a **source-reported research conclusion as of 2026-11-02**. It does
not authorize removal of any OATS role, reviewer or accepted procedure.

# Evidence and limits

The source contrasts Anthropic's long-running-agent engineering accounts of
2025-11-26 and 2026-03-24. It reports that explicit initialization and
progress artifacts helped earlier setups, while an evaluator became
overhead with a stronger model on tasks within that model's reach. The
within-reach qualification matters: it is not evidence that evaluators
never help or that compaction alone solves long-running work generally.
The captured note lacks enough matched experimental detail to retain its
cost/time comparison as a causal effect size.

The same research pass reports continued use of plain-file progress and
memory artifacts, including a Devin account dated 2026-10-05 and secondary
reporting about Anthropic in May 2026. **Persistence format is not evidence
of improved outcomes.** No independently checked memory-outcome evaluation
is established by this capture; it cannot support the universal assertion
that no vendor publishes one, nor a ranking of memory systems.

The source also cites Chroma's context-rot work (2025-07-14) as a warning
against assuming that longer supplied context always helps. That alone
does not prove a particular curation method beats full context. Claims that
memory benchmarks are saturated or mutually non-comparable are not retained
without their missing experimental scope.

# Newer-model evidence added on 2026-11-02

A later source reports re-reading a **claude.dev post dated 2026-07-24** [3]
in which Anthropic describes substantial Claude Code system-prompt removal
for **Claude Opus 5 and Claude Fable 5**, with no measured loss on its coding
evaluations. This is a **source-reported vendor claim**, not an independent
ablation: the captured note says no evaluation design or scores were
published, and retains no exact post URL. It motivates testing older prompt
scaffolding on those models; it does not establish a transferable safe
removal fraction or justify removing authority controls.

The same note supplies a **secondhand researcher summary** of *Memory Tax*
[4], dated **2026-10-25**, on **GPT-5.6 “Luna”**. It reports two-round
retrieval-augmented generation outperforming full context and the eleven
memory systems compared on **LongMemEval-s**. The proposer explicitly did
not re-read this paper. The capture lacks complete configurations, metric
and uncertainty detail; retain the bounded comparison, not its numerical
leaderboard or a universal retrieval winner. The note also flags sensitivity
to judge prompts without retaining the experimental details needed to
quantify it.

This adds a reported memory-system accuracy comparison, not an independently
checked memory-outcome evaluation by this harvest. It neither retroactively
changes the limits of the earlier capture nor demonstrates that accumulated
project knowledge makes later instances learn more. The measured comparison
is on GPT-5.6; the Claude 5 evidence above remains vendor-only, and this
capture establishes no GPT-6-class measured result. Retrieval accuracy,
longitudinal learning and safe knowledge adoption are different outcomes.

# Consequence for comparisons

For each component, record the failure it addresses and compare the same
model and task with and without it, including correctness, cost and retained
state quality. Re-run that comparison after a model change. Distinguish
capability compensation from authority controls: a model no longer needing
an evaluator for one task is not permission to let the builder control its
acceptance evidence; see
[independent verification](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md).

The [durable-specialization decision](/nodes/oats-maintainer/decisions/durable-specialization.md)
remains the canonical rationale for reviewed knowledge continuity. File
persistence in other products neither proves nor refutes that positioning.

**Owner and recheck:** market-research-expert. Recheck per model generation
and when controlled harness-ablation or memory-outcome evidence appears.
Update or supersede the conclusion and log the change; do not silently
extend one lab's report to every model or task.

# Citations

1. Anthropic engineering accounts, 2025-11-26 and 2026-03-24, as identified
   in the proposal; source-reported, not independently re-fetched here.
2. Devin memory account, 2026-10-05; Anthropic memory reporting, May 2026
   (secondary); Chroma context-rot work, 2025-07-14, as identified in the
   captured evidence. These attributions do not establish outcome gains.
3. claude.dev post, dated 2026-07-24 by the source, describing Claude Code
   prompt removal for Opus 5 and Fable 5; source reports a 2026-11-02 re-read,
   but the capture supplies no exact URL. Not independently fetched here.
4. *Memory Tax*, [arXiv 2610.34073](https://arxiv.org/abs/2610.34073), dated
   2026-10-25 by the source; researcher-summary support only, not re-read by
   the proposer or independently fetched by this harvest.

Evidence: OKF proposal from market-research-expert/coord-frontier-research-expert,
2026-11-02; notes/harness-shrinks-with-capability.md.

Newer-model refinement:

Evidence: OKF proposal from market-research-expert/know-practice-research-expert,
2026-11-02; notes/scaffolding-and-memory-on-newer-models.md.
