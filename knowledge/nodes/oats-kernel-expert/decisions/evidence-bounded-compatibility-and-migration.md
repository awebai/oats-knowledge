---
type: Decision
title: Compatibility follows supported adoption, not every intermediate format
description: Supported published commitments deserve compatibility while unrepresentable migrations must refuse rather than lose state.
tags: [kernel, compatibility, migration, locks, packages]
timestamp: 2026-09-19
---
# Rationale

Founder rulings of 2026-07-29 during the materialization redesign. An
intermediate implementation does not automatically become a permanent
compatibility obligation. Establish supported adoption before adding another
version, reader and migration subsystem. The accepted redesign rejected an
unadopted transitional format — revising it in place rather than versioning it
— while retaining genuinely supported historical inputs.

This is not permission to abandon published commitments because no local
consumer is visible. Reader compatibility and current authoring rules differ:
accepting an immutable legacy artifact does not endorse emitting that shape
today. The method for telling formats apart is itself the expertise: before
choosing a discriminator for "old format", enumerate the actual published
artifacts it must accept. A field that is *optional* in the old format cannot
discriminate it; only a field that is *impossible* there can. The intuitive
"legacy spelling present ⇒ legacy" test would have stranded the one immutable
published package the compatibility existed to serve.

A migration also cannot invent a home for state its destination cannot
represent. The founder chose whole-scope refusal over converting official
entries around retained ones or creating a residue container — this supersedes
the read-only residue envelope permitted by the 2026-07-26 distribution
decision. When a format has no place to put something, the operation that
would leave it behind must refuse, not improvise; and never claim an entry was
retained unless the resulting lock can still resolve it. A guided migration
never derives a package selector from a legacy capability version, because that
version belongs to the capability, not to the package's tag namespace. The
deliberate cost is delayed migration until the whole scope is representable.
That is preferable to a green conversion that silently loses authority over
existing artifacts.

**A kernel upgrade is separable from a provider floor** (lesson, 2026-09-19,
redesign lead). A release note that pins a new provider version invites the
reading that upgrading the kernel means adopting that provider — and if the
provider's major carries a migration, the whole upgrade looks gated behind it.
That conflates two facts: the pinned provider is the pairing the release was
*qualified with*, and the provider's floor is a statement about the provider,
not an upper bound on older ones; what a deployment runs is whatever its lock
pins. Whether the kernel can move alone is decided by the declared
compatibility of every *installed* capability (an open-ended range stays
valid across the upgrade) and by any separately versioned consumer with its
own accepted kernel band — a desktop or GUI client's band, not the provider
floor, is what usually bites. Separating the two turns one blocked
all-or-nothing migration into a cheap reversible step plus a deliberate one
with its own schedule, backups and verification.

# Related

[Local configuration remains authored policy](/nodes/oats-kernel-expert/decisions/local-policy-is-not-package-policy.md);
[A refusal that needs the old bytes is a pre-commit gate](/nodes/oats-kernel-expert/lessons/refusal-belongs-before-commit.md);
[Pre-adoption contracts are removed, not translated](/nodes/oats-expert/decisions/clean-contract-precedent.md)
(the stewardship precedent that bounds this decision to shapes with no
supported adoption).

# Current contracts

- [Current packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)
- [Current package-runtime-api.md](https://github.com/awebai/oats/blob/main/docs/design/package-runtime-api.md)

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/mixed-scope-migration-refuses-whole.md`; SHA-256 `efea78df940d08a77686ffe7490dea1b4ce97a8002246bba97b8b9c3e9ae2735`.
2. OATS rationale source `agents/dev-coordinator/soul/knowledge/lessons/replace-unadopted-transitional-formats-in-place.md`; SHA-256 `8bc33f7bd391d4e9da71224f03e5b23506e652b325b7defc17ea81d63a034af1`.
3. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/legacy-capability-root-discriminator.md` (2026-07-29); SHA-256 `4b14dc1125ce4eb36c000b92d5bc9e16f516bd24ed559a91c083726dddfc6b98`.
4. OATS rationale sources `agents/cli-dev/soul/knowledge/decisions/guided-official-migration-shape.md` and `lessons/guided-mixed-retain-needs-residue-or-hold.md` (2026-07-29), selector and retention rationale only.
5. OATS rationale source `agents/oats-expert/soul/knowledge/lessons/kernel-upgrade-separable-from-provider-floor.md` (2026-09-19), judgement only.
