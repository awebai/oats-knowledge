---
type: Decision
title: Expert domains replace implementation job titles
description: Five persistent expert domains and an optional theory helper separate durable expertise from temporary implementation assignments; knowledge is rebuilt by strict audit, never bulk-copied.
tags: [souls, expertise, knowledge, roadmap]
timestamp: 2026-09-20
---
# Decision

Accepted human direction, 2026-09-13 (oats-expert as maintainer). The OATS
knowledge base is organised around **expertise domains**, not engineering job
titles. Its five persistent souls are `oats-expert` (overall direction,
cross-cutting rationale, planning with the human), `oats-kernel-expert`
(kernel-to-capability contracts and their tradeoffs), `oats-desktop-expert`
(Desktop product judgment), `market-research-expert` (dated, sourced
comparisons) and `oats-assistant` (user-facing adoption help, spawnable by
users). A `knowledge-theory-expert` remains an optional authoring aid, not a
sixth required role — see
[Optional reference theory](/nodes/oats-expert/decisions/optional-reference-theory.md).

An expert may implement when assigned. Implementation is a task, not a reason
to preserve engineer identities, create one expert per source module, or keep
a separate documentation or coordination soul merely to retain its useful
writing. The former developer, coordinator, lead and docs roles have no
successor node; their durable material was generalised into the five experts
or dropped.

# Rejected alternatives

- **String-replace `engineer` with `expert`.** Rejected: the redesign is of
  responsibilities and curriculum, not labels.
- **Bulk migration with a legacy/archive bucket in the active base.**
  Rejected: an attic is retrieval context for every future instance. Git
  history and a controlled pre-cutover snapshot preserve rollback; the
  active base carries only audited knowledge.
- **Rename-in-place while the knowledge contracts were still landing.**
  Rejected: the rebuild follows implementation and deployment acceptance,
  after pending evidence is preserved and old writers are coordinated.

# The promotion bar for the rebuild

Every candidate concept must pass four questions: (1) would it change how a
future instance of the intended expert works; (2) does it add judgment,
rationale or discovery beyond current code and canonical docs; (3) is it still
true of the OATS actually delivered, not a superseded design or abandoned
workstream; (4) can it be stated with provenance, one canonical home and any
needed freshness/ownership discipline. Dispositions are keep, rewrite, merge,
route elsewhere (skill, repository doc, or code/test with at most a temporary
lesson naming the real fix), drop, or unresolved with a named owner —
uncertainty is not permission to keep everything.

A maintained roadmap or area-level slow-state concept needs an owner, a date
and an update-on-change rule. Raw PR/release/task ledgers do not become
expertise by moving to a new repository. Preserve rejected-alternative
rationale only where it still prevents a plausible future mistake.

# Consequences

Each concept has one external canonical home; other domains cross-read it —
for example Desktop owns its product-succession rationale and overall planning
reads that decision. Done means a coherent expert roster backed by a small,
current knowledge base, not a green validator over renamed legacy folders;
semantic review against current OATS is the main gate.

# How the experts are published (accepted 2026-09-20)

The expert editions are **explicit library exports of the framework
repository**, imported by reference and immutable revision through the
workspace definition — not a universal replacement for project-local soul
conventions, which adopters keep. A preserved legacy soul is **not
automatically a valid portable source**; each edition is published as a
source-complete definition and only then pinned. Each edition names its owned
knowledge destination explicitly and cross-reads the others explicitly; **a
read edge grants no write**, and no edition borrows an ambient default writer
or infers write authority from a sole readable store. Private locators,
state paths and credential references belong to deployment configuration,
never to a public edition. The onboarding-created setup expert is a sixth
edition that owns no node
([official capabilities](/nodes/oats-expert/decisions/official-capabilities-and-reviewed-marketplace.md)).
A cold-bootstrap helper entry distinct from source-parented helpers was
proposed alongside and remains **undecided**; nothing here grants it.

# Related

[One standalone Desktop product, no hidden operational kernel](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md);
[External knowledge needs source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md);
[Current OATS direction](/nodes/oats-expert/roadmap/current-direction.md).

# Citations

1. Direct human direction during implementation, 2026-09-13: separate
   knowledge repository; domain experts instead of engineering roles; strict
   audit of existing soul knowledge and notes.
2. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/expert-souls-and-knowledge-rebuild.md`; SHA-256 `5f44db5eba93e7eecd0a399747cadc5d1fa9901f590d794c13350b1bbe611704`.
3. Accepted slice of legacy `decisions/portable-role-editions-and-bootstrap.md` (2026-09-20) and the "preserved legacy soul is not a portable source" delivery-log lesson; the helper-entry contract in that source is not promoted.
