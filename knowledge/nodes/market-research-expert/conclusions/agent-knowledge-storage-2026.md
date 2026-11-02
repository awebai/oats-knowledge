---
type: Conclusion
title: Compare knowledge systems by authority and retrieval evidence, not storage format
description: The 2026-11-02 research pass distinguishes reviewed authority from agent-written recall and treats pointer indexes and agentic search as bounded retrieval candidates, not universal winners.
tags: [research, knowledge, memory, retrieval, authority]
timestamp: 2026-11-02
---
# Dated conclusion

Compare agent knowledge systems along separate axes: who may make a statement
authoritative, how agent-written recall is admitted and revised, and whether
retrieval finds useful evidence for the tested workload. A Markdown file, Git
commit, vector store or graph does not by itself answer any of these questions.
In particular, version history is not proof of human review, and successful
retrieval does not turn recalled content into an instruction or accepted fact.

This is a **source-reported research synthesis as of 2026-11-02**, not an audit
of vendor enforcement or a decision selecting an OATS storage backend.

# What the investigation reports

The source identifies a two-tier pattern in the products it examined:
reviewable instruction/skill files such as AGENTS.md, CLAUDE.md and SKILL.md,
and separately agent-written memory used for recall. It reports both local
memory and hosted memory with governance features. Its examples include
Copilot Memory citation checking and expiry, Anthropic Managed Agents memory
versioning, and Letta's git-backed MemFS [1]. These are **source-reported
feature descriptions**, not evidence that every write is human-approved or
that those products enforce equivalent authority boundaries.

The proposal reports re-fetching the Copilot and Letta documentation on
2026-11-02; the capture does not retain those pages or their exact URLs.
Anthropic's versioning description has no separately recorded re-fetch in
the proposal. Consequently this concept does not certify defaults, retention
ranges, immutability guarantees, read-only enforcement or release chronology.
The reusable result is the comparison distinction, not a feature register.

# Retrieval is a workload- and model-qualified comparison

The source reports three different kinds of evidence, which must not be
pooled into one claim of a best retrieval design:

- **Agentic search versus embeddings:** in arXiv 2605.05242 [2], the source
  reports Claude Code on **Sonnet 4.6** outperforming the **Qwen3-Embedding-8B**
  retrieval comparator at one corpus size, then degrading at larger sizes.
  The proposal reports re-fetching this paper on 2026-11-02. The capture
  lacks the corpus, metric and budget details needed to reuse the percentages,
  cost comparison or document counts as a general crossover threshold.
- **Index structure:** arXiv 2607.17598 [3] reportedly found a benefit from
  one flat index level but not a second. The note describes **small/mid-size
  models without exact model identifiers**. It does not establish an optimum
  for current frontier models or a ceiling for growing an OKF-style index.
- **Always-loaded pointers versus on-demand skills:** the source reports a
  Vercel evaluation favoring a compact pointer index [4]. It is vendor-measured,
  with **the model unstated in the capture**; it is a candidate to reproduce,
  not transferable evidence of perfect retrieval or superiority to all skills.

A compact pointer index plus search/read is therefore a useful candidate to
compare with embedding retrieval, not a universal winner. Keep corpus size,
index size/depth, model, retrieval configuration, task accuracy and cost
explicit. The grep result does not establish that vector or graph storage is
unsuitable for authoritative knowledge; retrieval performance and authority
are separate properties.

# Consequence, ownership and refresh

For future comparisons, distinguish review/admission from recall, versioning
from supersession, and expiry from correctness at use. Ask for tested write
controls and memory-outcome evidence rather than crediting a product merely
for persistent files or a sophisticated store. The memory-specific evidence
belongs in [retesting scaffolding and memory controls](/nodes/market-research-expert/lessons/retest-scaffolding-after-model-changes.md),
not in a second curation doctrine here.

Owner: market-research-expert. Recheck per model generation and when controlled
index-size, retrieval-scale or memory-outcome studies appear; update or
supersede this dated synthesis and log the change. The captured investigation
establishes no Claude 5, GPT-6-class or Gemini 4 memory/retrieval result; that
is a limit of this evidence, not proof that no such study exists. Follow the
[recency and model-generation decision](/nodes/market-research-expert/decisions/recency-and-model-generation-anchoring.md)
when carrying these findings into a current comparison.

# Citations

Source-supplied locators and descriptions; not independently fetched or
experimentally reproduced by this harvest:

1. GitHub Copilot Memory documentation; Anthropic Managed Agents memory
   documentation; Letta MemFS documentation, as named in the captured note.
2. Grep/embedding comparison, [arXiv 2605.05242](https://arxiv.org/abs/2605.05242).
3. Index-structure comparison, [arXiv 2607.17598](https://arxiv.org/abs/2607.17598).
4. Vercel pointer-index evaluation, as described in the captured note; no
   exact source URL, date or model identifier was supplied there.

Evidence: OKF proposal from market-research-expert/know-storage-research-expert,
2026-11-02; notes/agent-knowledge-storage-retrieval-2026.md.
