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

# Recency refinement: vendor advice is not an ablation

A separate 2026-11-02 recency proposal attributes advice to Anthropic to
fold subagents into the main loop unless evaluation favors keeping them
[3]. The capture supplies no figures or measured model for that advice.
Treat it as a dated **vendor recommendation to compare alternatives**, not
proof that a single loop wins or that delegation becomes unnecessary.
The [topology lesson](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md)
owns the same pass's source-reported model-dependent collaboration results;
those results do not establish that external authorization or review gates
can be removed as capability improves.

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
3. Claude.com, *When to fold subagents into your main agent loop*, dated
   2026-10-22 by the recency source. Source-reported first-party guidance,
   not independently fetched or evaluated by this harvest.

Evidence: OKF proposal from market-research-expert/coord-frontier-research-expert,
2026-11-02; notes/harness-shrinks-with-capability.md.

Evidence for the later cross-references: OKF proposal from
market-research-expert/know-ontology-research-expert, 2026-11-02;
notes/agent-knowledge-shape-evidence-2026-11.md;
notes/research-recency-and-model-generation-rule.md.

Evidence for the recency refinement: OKF proposal from
market-research-expert/coord-practice-research-expert, 2026-11-02;
notes/multi-agent-gains-shrink-with-capability.md.
