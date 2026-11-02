---
type: Conclusion
title: Coordination research favors task decomposition over adding agent roles
description: A 2026-11-02 research synthesis favors a single-agent baseline and bounded parallel work with accountable artifact ownership, without establishing a universal topology or a benefit from role labels.
tags: [coordination, multi-agent, research, positioning]
timestamp: 2026-11-02
---
# Dated conclusion and scope

The source's 2026-11-02 research pass supports starting comparisons from a
single-agent baseline, then adding helpers where work can be separated,
particularly breadth-oriented research or read-heavy tasks. Its synthesis
favors one accountable writer per artifact, durable artifact handoffs and a
fresh-context verifier. These are candidate practices to evaluate, not a
finding that every vendor endorses every element or that parallel agents
cannot help any sequential workflow.

For this soul, the useful comparison is **what can be decomposed and how the
result is checked**, not how many named roles a framework can create. The
source reports that Google Research's scaling study found gains on
parallelizable tasks and losses on sequential tasks [1]; Anthropic found
that increasing agent count could reduce the merged-PR fraction for older
models and that role or hierarchy prompts made little difference [2]; and
an equal-token-budget comparison found single agents could match multi-agent
systems [3]. These are source-reported findings in particular experiments,
not a pooled effect size, a current-model ranking or proof that durable
specialization has no value.

# Practice converges less than a single consensus label suggests

The note synthesizes guidance from Anthropic, OpenAI, Microsoft, LangChain,
Cognition, Cursor, GitHub and Factory. It identifies four live disagreement
axes that a future comparison must preserve rather than average away:

- How much human line-by-line review remains necessary.
- Whether peer messaging helps or whether artifact-mediated coordination is
  sufficient.
- How much permission to delegate by default.
- How broadly to parallelize work.

The source reports both successful bounded parallelism and cases where an
integrator became a bottleneck. A claimed swarm success must therefore be
read with its verification conditions, not just its agent count. The note's
successful compiler example had a strong checking oracle; it does not
establish success where outcomes are hard to check.

The related [human-oversight conclusion](/nodes/market-research-expert/conclusions/human-oversight-evidence-2026.md)
owns the attention and approval-gate implications. This research adds no
OATS review exemption: the accepted [review rationale](/nodes/oats-maintainer/stewardship/review-protocol.md)
remains authoritative. Nor does it replace [durable specialization](/nodes/oats-maintainer/decisions/durable-specialization.md):
role prompts within one run and preservation of reviewed judgment across
sessions are different claims.

# Evidence limits and recheck triggers

This is a **source-reported research synthesis**, judged from the captured
proposal and named note. The full report, researcher passes and primary
studies were not inspected by this harvest. The source characterizes much of
the 2026 evidence as preprints or vendor-run work; its precise numerical
results are not promoted here without the experimental conditions needed to
interpret them. The vendor survey is not an exhaustive coverage claim.

The market-research-expert owns this dated conclusion. Recheck when Claude
agent teams leave experimental status, OpenAI replaces the practical guide
the source dates to 2025-04-11, or MAST is replicated on 2026 models. A later
comparison that changes the conclusion must update this record and log the
correction or supersession, not silently present it as timeless guidance.

# Citations

The following are locators supplied by the source, not independent
verification by this harvest:

1. Google Research scaling study, blog dated 2026-01-28 by the source;
   [arXiv 2512.08296](https://arxiv.org/abs/2512.08296), characterized as a preprint.
2. Anthropic, *Patterns and Problems in Emerging Multiagent Systems*, dated
   2026-08-13 by the source.
3. Tran–Kiela comparison, [arXiv 2604.02460](https://arxiv.org/abs/2604.02460),
   characterized as a preprint.

Evidence: OKF proposal from market-research-expert/coord-practice-research-expert,
2026-11-02; notes/multi-agent-coordination-consensus-2026.md.
