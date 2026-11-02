---
type: Lesson
title: Verify decision fields and silence semantics separately in human-request protocols
description: The 2026-11-02 source-reported protocol comparison found no dedicated decision-context fields in four named surfaces, motivating field-level checks rather than equating an approval API with a decidable request.
tags: [research, human-oversight, protocols, consent, uncertainty]
timestamp: 2026-11-02
---
# Dated finding and scope

The source's **2026-11-02** comparison reports finding no dedicated fields
for deadline, default-if-silent, reversibility, blast radius or recommended
option in **MCP 2026-07-28, A2A 1.0.1, OpenAI Agents SDK approvals and Claude
Code permission hooks** [1]. A mechanism for requesting input or accepting
approval does not, by itself, establish support for those decision fields.

This is the captured researcher's finding, **not an independently checked
schema inventory**. The note names the surfaces and versions above, but
retains no primary schema excerpts, precise page locators or SDK/hook
versions. It does not establish that custom payloads, free text, extensions
or applications cannot carry this information. Nor does it prove that every
agent-to-human protocol lacks it or that a proposed OATS schema is unique.
No measured model or schema-comparison experiment is identified.

# Silence is a separate contract question

The same investigation reports Claude Code changelog behavior in September
and October 2026: dangerous prompts in unattended runs time out and deny,
unanswered non-interactive elicitation remains unanswered, and a
`decider: "person"` option reserves a decision to a human [2]. These are
**source-reported product leads**, not runtime-tested guarantees, a uniform
contract across the four surfaces, or evidence that delegation is always
forbidden. The precise entries and configuration coverage are not captured.

Keep distinct a request's deadline, what execution does while waiting, the
result of expiry, and who may supply an answer. Missing input is not evidence
of approval; a comparison must establish the actual selected product's
semantics rather than infer them from an input-required status or UI label.
The [routing-versus-authority lesson](/nodes/market-research-expert/lessons/question-routing-is-not-approval-authority.md)
owns who may confirm an action and where that confirmation is accepted.

# Consequence for comparisons

Evaluate decision context field by field. Separate native typed support
from application-provided content, and distinguish a recommended option
from an authorized default. Check whether the information reaches the
human and whether the executing system enforces the claimed timeout and
approval behavior. The captured pass establishes no causal result showing
that adding these fields reduces fatigue, improves judgment or makes
silent approval safe.

This is research judgment, not a new approval policy. Any OATS request or
timeout contract belongs in its owner's reviewed design and executable
boundary tests; a knowledge entry is not an enforcement mechanism. Existing
human-only, authorization and safety requirements remain unchanged.

**Owner and recheck:** market-research-expert. Recheck on the next MCP/A2A
release or material SDK, hook or permission-behavior change. Re-read the
selected schemas and implementations before calling the inventory current;
update or supersede this finding and log the change in the same session.

# Citations

Source-supplied document identifiers; no external page was fetched by this
harvest:

1. MCP 2026-07-28; A2A 1.0.1; OpenAI Agents SDK approvals; Claude Code
   permission hooks, source reading dated 2026-11-02.
2. Claude Code changelog, September–October 2026 entries as summarized by
   the source; exact locators and tested configurations absent.

Evidence: OKF proposal from market-research-expert/coord-oversight-research-expert,
2026-11-02; notes/human-request-protocols-lack-deadline-default-reversibility.md.
