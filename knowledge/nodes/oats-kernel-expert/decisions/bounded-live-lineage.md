---
type: Decision
title: Live lineage is deliberately bounded
description: Sparse explicit current relations favor truthful ambiguity refusal over a permanent history or multi-file transaction promise.
tags: [kernel, lineage, spawn, relations, concurrency]
timestamp: 2026-07-26
---
# Rationale

Accepted 2026-07-26 by the founder, on top of the explicit-lineage decisions of
2026-07-25/26. Lineage answers how living instances relate now, not how every
historical task unfolded. Explicit sparse relations preserve that lightweight
purpose. Attached work already establishes ownership; contradictory relation
choices should not fabricate an independent work owner. Attached service
agents are children of the tree owner so retirement responsibility stays
local; a non-attached overseer expresses its topology explicitly.

**Lineage is explicit-only.** Deriving a parent from ambient environment
("whoever's instance variable is set") was rejected even when gated on the
parent being alive, because a human terminal inside an agent's session window
*is* an alive instance — the misattribution case is the alive case. Only
explicit intent is safe. Cross-deployment spawns stay operator-origin: a parent
outside the target deployment would be a dangling edge that deployment's own
surfaces cannot resolve, so recording it would manufacture
misattribution-shaped metadata.

Names are not globally unique. Refusing an ambiguous edge is preferable to
silently linking the wrong instance. The disambiguator is an operation-time
qualifier and is never persisted: stored edges stay bare names, which avoided
a lineage migration, and every copied edge must resolve identically from both
contexts that will read it. Desktop must preserve the same qualification rather
than invent certainty from a filtered roster.

Whoever writes cross-instance metadata owns its repair on both sides' lifecycle
events, across the whole scope where the reference can be created; a change to
relation policy migrates every agent-facing spawn recipe in the same change, or
live agents keep following the old topology.

The founder accepted two costs instead of introducing a journal or lease
service: concurrent parent spawns on one anchor can leave a last-writer result,
and retirement can partially splice the graph if a later write fails. Do not
present atomic file writes as multi-file serializability. Revisit this tradeoff
only with observed need for stronger coordination, not because a graph can
theoretically be made more elaborate.

# Related

[Identity and relationships must stay legible under ambiguity](/nodes/oats-desktop-expert/lessons/identity-and-relationship-legibility.md);
[Preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md);
[Identity and location belong to the resolved object](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md).

# Current contracts

- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/spawn-relations-live-lineage.md`; SHA-256 `0b88cab5103f66195d7b213dbacbfa1f00078b4b9c425ca92c5089414dcc10e6`.
2. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/spawn-lineage-explicit-only.md` (2026-07-26); SHA-256 `b5dc865196831936ce820dc141ce355c4527eaf4d96708712a924b89adca6fba`.
3. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/attached-spawns-child-of-work-owner.md` (2026-07-25); SHA-256 `4c27d34c1767268d66b55742d48359ff23415ee751d6c5dd27fc860d2732db81`.
4. OATS rationale sources `agents/cli-dev/soul/knowledge/lessons/lineage-edge-ambiguity-posture.md` and `relation-policy-migration-and-retire-splice.md` (2026-07-25), qualifier and repair-ownership rationale only.
