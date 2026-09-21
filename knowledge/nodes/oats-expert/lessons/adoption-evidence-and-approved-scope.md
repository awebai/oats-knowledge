---
type: Lesson
title: Adoption evidence and authority must match the claimed outcome
description: Installation, usable execution, publication, delivery, consumption and learning are different evidence, and review findings do not expand approved product scope.
tags: [acceptance, evidence, scope, review]
timestamp: 2026-09-05
---
# Lesson

An adoption claim needs evidence at the user's actual boundary. Installation
proves availability; a scaffold proves composition; a usable session proves
execution. Delivered input still may not be consumed, and an accepted
knowledge change still may not inform a fresh instance. Do not promote one of
these observations into all the others.

A **release** claim likewise needs the exact source tag, the published
artifact, the installed version and execution evidence against it; a green
source checkout is not a published installation, and "it is on main" is not
"it is released" (see [release traps](/nodes/oats-expert/stewardship/release-traps.md)).

An install/restore gate does not prove every independently targetable
capability is spawnable: strict composition resolves only the capabilities
active for the selected soul or type, so a malformed resource path stays
latent until that target is probed (observed 2026-07-28 when an additive
capability's paths were valid only in its monorepo source layout). Acceptance
therefore includes at least one fresh scaffold probe **per targeting class**,
not one generic baseline soul. Failing closed was the correct runtime
behaviour; the package layout, not the containment rule, was what needed
repair.

# Scope discipline

First establish the user outcome and responsibility split. Scope by the
actual domain boundaries rather than inventing parallel work to fit an
inherited roster. A diagnosis of missing reachability can be correct while a
new navigation destination is the wrong remedy: a review defect is not
permission to add a product surface the human did not request.

# Operations

The same separation applies to operations. Messaging can deliver a wake hint
without owning execution or acknowledging work for the recipient (the
ownership decision is
[runtime, messaging and viewers have separate owners](/nodes/oats-expert/decisions/runtime-messaging-viewer-ownership.md)).
Runtime permission flags do not confer task authorization. Report the observed
result, remaining uncertainty and next authorized check, rather than calling a
handoff, green probe or missing error successful adoption.

# Related

[External knowledge needs source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md).

# Current contracts

- [acceptance.md](https://github.com/awebai/oats/blob/main/docs/knowledge-reference/acceptance.md)

# Citations

1. OATS rationale source `agents/lead/soul/knowledge/operating-boundaries.md`; SHA-256 `bee6a3a9a071e75f318a73bbaae12ec982e687ef27970d953e6f5b0dc5d48fe7`.
2. OATS rationale source `agents/dev-coordinator/soul/knowledge/lessons/review-fix-scope-overreach.md`; SHA-256 `bc7f6d8e6c5b9aa464dda0bf3784391b7dc99b086deaa6132689d6f5c74004c2`.
3. OATS rationale source `agents/dev-coordinator/soul/knowledge/lessons/scope-feature-before-spawning-developers.md`; SHA-256 `407f563883b9aa91f25e3d978b9dbd8a1670c9e2c608b2b2df02c4999dff225c`.
4. Legacy `agents/lead/soul/knowledge/continuation-sources.md` (2026-09-05, release-evidence sentence) and `agents/oats-expert/soul/knowledge/lessons/strict-preflight-exposes-capability-layout-debt.md` (2026-07-28).
