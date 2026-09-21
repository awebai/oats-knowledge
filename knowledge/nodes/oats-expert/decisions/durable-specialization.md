---
type: Decision
title: Durable specialization preserves judgment across sessions
description: OATS exists to make agent expertise a versioned project artifact; durable specialist roles preserve reviewed judgment without replacing native sessions or forcing a universal assistant.
tags: [positioning, specialization, providers, architecture]
timestamp: 2026-07-26
---
# The founding claim

OATS (Open Agent Team Specification) was founded on one claim, stated at the
pattern's first recording (2026-07-08) and made the accepted product
positioning by the founder on 2026-07-26: **agent expertise should be a
versioned project artifact, not a session side-effect.** A soul is a reviewed
description of a durable specialist; an instance is its disposable, steerable
incarnation. Instances die, models and harnesses change, the specialist
remains — and every incarnation should start wiser than the last.

The value is not one more universal assistant, model router or rigid workflow
engine. OATS makes the agent team itself part of project architecture:
identities, roles, knowledge, procedures, deployment policy, capability
assignment, work topology and coordination are explicit, reviewable artifacts.

# Genealogy

The pattern was derived from a prior team architecture (souls, instances,
per-agent messaging identities, a spawn skill) and from an agent-native
multi-repository engineering practice in which each repository carries its
own specialists. It deliberately builds on open standards rather than
inventing formats — see
[What OATS borrowed and where it diverges](/nodes/oats-expert/references/standards-genealogy.md).

# Rationale

A full instance can be steered, resumed and coordinated; it is not merely an
anonymous workflow step. Provider-native subagents and workflows remain useful,
and OATS documentation must not dismiss them; they do not by themselves supply
durable role continuity, project ownership or curated curriculum.

Curating a specialist's context is preferable to presenting every procedure
and hoping the model ignores irrelevant ones. Runtime diversity is a feature
when specialization makes the choice intentional: different roles may run
different runtimes and models, and OATS supplies the common identity,
curriculum, configuration, memory, communication and work contracts without
flattening every member into a least-common-denominator engine.

"Provider-agnostic" names **two distinct axes** that documentation must not
conflate: (1) agent runtime/model providers, which no OATS contract may
assume; (2) external service providers (the concrete knowledge, messaging or
task system a deployment selects). A layer capability may deliberately bind
one external service, but it must expose a runtime/model-neutral protocol and
behave coherently under every runtime adapter; runtime-specific glue stays
thin and at the edge.

The mental model that every explanatory surface should teach, in this order:
**package distributes, capability teaches or enables, config assigns, soul
specializes, instance works.** Schemas, manifests and locks follow the model;
they do not lead it.

# Consequences

Continuity is an opportunity, not automatic learning: a new instance becomes
better informed only when useful evidence has been judged, delivered, accepted
and read. Where knowledge lives and who holds custody of it is decided in
[external knowledge needs source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md),
not here. No knowledge integration is compulsory,
and managed context selection is not whole-harness isolation. Layer
implementations are judged for runtime neutrality even when they bind one
external service ([kernel responsibility boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)).
Present-tense product claims must match released behaviour; target
architecture is never documented as shipped.

# Current contracts

- [souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)
- [knowledge.md](https://github.com/awebai/oats/blob/main/docs/knowledge.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/architecture/what-oats-is.md` (2026-07-08); SHA-256 `722831f9cc723e15d2d4e013e51197296d3df5646a5a844ed8039b167a1421eb`.
2. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/provider-agnostic-specialization-and-curated-context.md` (founder acceptance 2026-07-26); SHA-256 `13e232ecba4c88e5263ca09a014040b0942c96c3bf7008f42c8fff2be66e74c7`.
