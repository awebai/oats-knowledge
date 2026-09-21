---
type: Decision
title: Portable Souls roll out fresh-install-first; historical migration is deferred, never destructive
description: The controlled Portable Souls rollout provisions fresh deployments and parks in-place conversion of historical state, without erasing anything, relabelling partial history as complete, or shipping on a single native backend.
tags: [portable-souls, rollout, migration, acceptance]
timestamp: 2026-09-17
---
# Decision

Decided 2026-09-16 with the human (oats-expert as maintainer), extended
2026-09-17 with the backend-parity acceptance clause.

# Context

Portable Souls change the declaration, retained-artifact and
execution-authority contracts at once. A general in-place converter for
historical deployments would have consumed the critical path without helping
a small, controlled early rollout whose operators can provision fresh state.

# What was decided

- **Fresh installation is the rollout path.** Complete the new deployment and
  instance lifecycle first. Automatic historical reconstruction, comprehensive
  legacy conversion and migration-facing CLI are **parked, not deleted**, and
  are not release prerequisites.
- **Already-shipped safeguards stay and are not widened.** The bounded
  partial/unknown-evidence tools and refusal safeguards remain; they are never
  extended to make old state look complete. Partial or unknown history is
  never relabelled a complete record; if migration resumes, the accepted
  evidence and custody contract still applies
  ([evidence-bounded migration](/nodes/oats-kernel-expert/decisions/evidence-bounded-compatibility-and-migration.md)).
- **A fresh install is not permission to erase.** User repositories,
  knowledge, native histories, unfinished work, identities and credentials
  are preserved; prefer an explicit fresh state location and keep old sessions
  until the new path is qualified. Cleanup and retirement stay explicit and
  custody-preserving, never a migration shortcut or forced wipe.

# Unchanged by this decision

Source-complete souls and by-reference imports; two policy authorities with one
resolver where explicit choices cannot erase hard requirements; immutable
per-execution authority and exact executable approval; provider-neutral
external knowledge and private-first messaging with real provider
qualification before privacy claims; no OATS-hosted registry, discovery daemon
or user database.

# Acceptance

The rollout is judged on a working fresh **source/workspace → prepare/approve
→ instance/lifecycle** path with source-independent execution and real
provider acceptance — the standard that the later second-operator gate applied
([second-operator acceptance](/nodes/oats-expert/lessons/second-operator-acceptance.md)).
The captured execution path must work on **both** native backends through the
existing backend abstraction, with the same binding, incarnation, intent,
target and cleanup guarantees; backend-specific request/receipt shapes reflect
their real adapters and there is no silent fallback to one backend. A
single-backend or inert-adapter result is not the finished rollout. Deferred
historical conversion is tracked explicitly and never marked complete.
Desktop parity follows infrastructure; screenshots do not substitute for these
gates (the accepted 2026-09-20 order is workspace, then knowledge, then
Desktop — see [Current OATS direction](/nodes/oats-expert/roadmap/current-direction.md)).

# Citations

1. Legacy `agents/oats-expert/soul/knowledge/decisions/fresh-install-first-portable-rollout.md` (2026-09-16/17).
