---
type: Decision
title: A running instance's soul is an immutable per-commit copy, so soul identity and soul content travel separately
description: Under workspace model v2 a soul is fetched per member commit into a directory the kernel never changes or removes and each instance links its own commit; because that makes a soul's resolved path change with every member commit, the kernel hands every lifecycle consumer a durable soul identity (repository key plus soul name) separately from the content location, and a consumer that keys durable state on the path is a defect.
tags: [kernel, workspace-model, souls, identity, custody, providers, immutability]
timestamp: 2026-09-23
---
# Context

Workspace model v2 (accepted by the human 2026-09-23) made two commitments
that meet at the soul: a member is always its latest state, and a running
instance never changes under itself
([workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md),
decisions 7, 10 and 11). The first implementation honoured the second
commitment for capability modules, which are copied whole into each home,
but kept one shared soul directory per soul. A preview that fetched a newer
member commit therefore changed the soul under an instance that was still
running. An independent reviewer found this after the release. The
adversarial review swarm had missed it because no review lens spawned the
same soul twice across a member move while an instance was still live.

The fix exposed a second collision. A knowledge provider recorded each owner
as the resolved path of the soul and, as a sound guard, refused a spawn whose
soul resolved somewhere else for the same owner. Once soul content lived in
per-commit directories, the first routine member commit moved the path. The
next spawn of an unchanged soul was refused, and operators read it as a
broken rebuild. Each design was right on its own terms. Immutable copies
protect running instances, and a path-keyed registry is safe while a soul
has exactly one location. They cannot both hold.

# Decision

1. **Soul content is per commit and immutable.** The kernel fetches a
   soul's source at the confirmed commit into a directory that is written
   once and that the kernel never edits or removes. A separate "current"
   pointer is swapped atomically for readers that ask what is current. Each
   instance links **its own commit's directory**, never the pointer.
   Rejected alternatives:
   - A shared directory updated in place. This is the defect described above.
   - Pointing homes at the swappable pointer. The same defect returns one
     indirection later.
   - Pruning old commit directories. A live instance may still link one, so
     removing it is exactly the change-under-a-running-instance that v2
     forbids.
2. **Location is not identity.** Because members are latest, a soul's
   resolved path changes with every member commit. The kernel therefore gives
   every lifecycle hook two values:
   - A **durable soul identity**: the canonical repository key plus the soul
     name, spelled exactly as the canonical key.
   - The **content location** this instance links.

   Consumers read content from the location and key durable state on the
   identity. A classic (previous-line) soul keeps its path as its identity,
   so existing deployments are unchanged. The identity is recorded on the
   instance.

   Rejected alternatives:
   - Providers pinning the resolved path. This fails at the first member
     commit.
   - One provider state directory per deployment and soul commit, with member
     commits of knowledge-owning souls sequenced by hand. This was the
     operator workaround, now superseded.
   - Versioning members so that paths stay stable. This contradicts
     "location, never version".
3. **Migrate once; never widen the refusal.** A provider may convert a prior
   path row that points into the same soul's cache or pointer to the identity
   one time. Any other mismatch still refuses.

# Consequences

- **Changing what a path means is an interface change.** Before changing
  what a path means, audit every consumer that keyed identity on it. The
  per-commit fix shipped without any review lens asking "who pins the
  resolved soul path?", and the provider broke one release later. The kernel
  half and the provider half are accepted only as a published pair. A mixed
  new-kernel/old-provider run, or the reverse, proves nothing about what
  deployments will install.
- **The acceptance test is spawn, member commit, sync, re-spawn.** It runs
  on the same soul, with an earlier instance still linked to the old commit.
  A single spawn cannot show the invariant.
- **This refines the resolved-object lesson.** A path still proves *which
  object* a guard is looking at, at a given moment
  ([identity and location belong to the resolved object](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md)).
  It is not durable identity across content versions.
- **Old state stays as custody.** Operator ordering for rebuilds (fresh
  provider state, the old state directory frozen as custody) belongs to the
  operator node. Pin semantics and state-file keys belong to the knowledge
  package's expert.

# Related

[Workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md);
[A rebuilt deployment gets fresh provider state](/nodes/oats-operator-expert/playbooks/rebuild-starts-fresh-provider-state.md);
[Identity and location belong to the resolved object](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md);
[Preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).

# Current contracts

- [Current workspaces.md](https://github.com/awebai/oats/blob/main/docs/workspaces.md)
- [Workspace module contracts (2026-09-23)](https://github.com/awebai/oats/blob/main/docs/design/2026-09-23-workspace-module-contracts.md)

# Citations

1. OATS inbox seed `agents/oats-expert/soul/knowledge/inbox/path-keyed-owner-registry-breaks-under-per-commit-soul-copies.md` (2026-09-23), kernel-side lesson only; the provider pin was fixed in the knowledge provider 2.1.4.
2. Framework `docs/design/2026-09-23-workspace-module-contracts.md`, "0.25.1 fix round" item M1 (per-commit soul cache) and "0.25.3" (stable soul identity for providers).
3. OATS stewardship source `agents/oats-expert/soul/knowledge/stewardship/delivery-log.md`, entries dated 2026-09-23 (v0.25.1: a finding missed because no lens spawned twice across a member move; v0.25.3: audit every consumer that keyed identity on a path) and 2026-09-23/24 (outsider verification of the owner-pin fix on the published pair).
4. Framework `docs/rebuild-to-v2.md` §7b (fresh provider state).
