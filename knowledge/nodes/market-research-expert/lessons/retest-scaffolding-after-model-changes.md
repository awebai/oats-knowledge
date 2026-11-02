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
that no vendor publishes one, nor a ranking of memory systems. A separate
[knowledge-shape research pass](/nodes/market-research-expert/conclusions/agent-knowledge-shape-evidence-2026.md)
adds a source-reported reading of MemoryAgentBench v4 on recall/conflict
tasks. That later evidence is not a test of durable project judgment and
does not retroactively change the limits of this capture.

The source also cites Chroma's context-rot work (2025-07-14) as a warning
against assuming that longer supplied context always helps. That alone
does not prove a particular curation method beats full context. Claims that
memory benchmarks are saturated or mutually non-comparable are not retained
without their missing experimental scope.

# Memory-specific evidence added on 2026-11-02

A subsequent source-reported storage/curation investigation adds memory
experiments [3–8], without turning the earlier capture into an independently
checked memory-outcome evaluation. Its captured summaries report:

- **GPT-5.4:** repeated self-consolidation initially helped and later degraded
  memory in the cited study; retaining raw episodes reportedly helped [3].
- **Configurations including GPT-5.5:** consolidation reportedly discarded
  authority/provenance constraints, while retaining labels reduced unauthorized
  actions in that benchmark [4]. This is not a guarantee from labels alone.
- **Sonnet 4.6:** repeated compaction reportedly lost safety rules [6].
- **GPT-5.4, GPT-5.5 and Sonnet 4.6:** a poisoned-memory-write study reportedly
  found admission failures [8]. Admission and later action on retrieved poison
  are different outcomes; the capture does not support a cross-model safety
  ranking or a universal failure rate.
- The STALE and MoM reports concern weak stale-memory detection and a benefit
  from non-destructive supersession, respectively [5, 7]. **Their model
  identifiers are absent from this capture**: treat these as leads for checking,
  not as results established for a particular current generation.

These are mostly single, unreplicated preprints, not a replicated comparative
assessment. The proposal says these memory figures were not re-fetched in its
verification pass. The notes do not preserve enough experimental conditions,
metrics or denominators to retain exact rates or effect sizes. They establish
no Claude 5 or GPT-6-class memory result; they do not prove that none exists.

The bounded consequence is to **test curation and write governance separately
from model capability**, not to infer that a stronger model automatically
maintains trustworthy memory. Include loss of provenance, authority constraints
and safety rules in outcome evaluation. Compare retained evidence and explicit
supersession with destructive rewriting where the workload warrants it; the
capture does not establish one universally superior memory design. Enforced
write permissions belong in system architecture and executable tests, not in
an expectation that the model will always reject a bad memory write.

The under-specified write-isolation comparison does not establish a uniquely
effective mitigation here. The secondary approval report also supplies no new
verified result: [human-oversight evidence](/nodes/market-research-expert/conclusions/human-oversight-evidence-2026.md)
already owns the approval-habituation concern. Neither claim licenses bypassing
human approval or removing existing authority controls.

# Newer-model evidence added on 2026-11-02

A later source reports re-reading a **claude.dev post dated 2026-07-24** [9]
in which Anthropic describes substantial Claude Code system-prompt removal
for **Claude Opus 5 and Claude Fable 5**, with no measured loss on its coding
evaluations. This is a **source-reported vendor claim**, not an independent
ablation: the captured note says no evaluation design or scores were
published, and retains no exact post URL. It motivates testing older prompt
scaffolding on those models; it does not establish a transferable safe
removal fraction or justify removing authority controls.

The same note supplies a **secondhand researcher summary** of *Memory Tax*
[10], dated **2026-10-25**, on **GPT-5.6 “Luna”**. It reports two-round
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
state quality. Re-run that comparison after a model change; the
[recency and model-generation decision](/nodes/market-research-expert/decisions/date-evidence-and-name-model-generations.md)
specifies how this soul dates and labels the evidence. Distinguish
capability compensation from authority controls: a model no longer needing
an evaluator for one task is not permission to let the builder control its
acceptance evidence; see
[independent verification](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md).

The [durable-specialization decision](/nodes/oats-maintainer/decisions/durable-specialization.md)
remains the canonical rationale for reviewed knowledge continuity. File
persistence in other products neither proves nor refutes that positioning.
The [storage/retrieval synthesis](/nodes/market-research-expert/conclusions/agent-knowledge-storage-2026.md)
separately owns the authority-versus-recall comparison.

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
3. Repeated self-consolidation, [arXiv 2605.12978](https://arxiv.org/abs/2605.12978),
   v2 dated 2026-08-29 by the source.
4. AuthMem-Bench, [arXiv 2608.01679](https://arxiv.org/abs/2608.01679).
5. STALE, [arXiv 2605.06527](https://arxiv.org/abs/2605.06527).
6. Compaction and safety-rule retention, [arXiv 2608.22752](https://arxiv.org/abs/2608.22752).
7. MoM, [arXiv 2609.25054](https://arxiv.org/abs/2609.25054).
8. Poisoned memory writes, [arXiv 2605.15338](https://arxiv.org/abs/2605.15338).
9. claude.dev post, dated 2026-07-24 by the source, describing Claude Code
   prompt removal for Opus 5 and Fable 5; source reports a 2026-11-02 re-read,
   but the capture supplies no exact URL. Not independently fetched here.
10. *Memory Tax*, [arXiv 2610.34073](https://arxiv.org/abs/2610.34073), dated
    2026-10-25 by the source; researcher-summary support only, not re-read by
    the proposer or independently fetched by this harvest.

Items 3–8 are source-supplied preprint locators, not independently fetched or
experimentally reproduced by this harvest.

Evidence: OKF proposal from market-research-expert/coord-frontier-research-expert,
2026-11-02; notes/harness-shrinks-with-capability.md.

Evidence for the later cross-references: OKF proposal from
market-research-expert/know-ontology-research-expert, 2026-11-02;
notes/agent-knowledge-shape-evidence-2026-11.md;
notes/research-recency-and-model-generation-rule.md.

Memory-specific addition:

Evidence: OKF proposal from market-research-expert/know-storage-research-expert,
2026-11-02; notes/curation-and-write-control-survive-model-gains.md.

Newer-model refinement:

Evidence: OKF proposal from market-research-expert/know-practice-research-expert,
2026-11-02; notes/scaffolding-and-memory-on-newer-models.md.
