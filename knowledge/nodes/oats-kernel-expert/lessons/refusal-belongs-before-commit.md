---
type: Lesson
title: A refusal that needs the old bytes is a pre-commit gate, never a post-hoc rollback
description: Any policy decision that would need the pre-operation state to recover must run inside the transaction while that state is still live; "do it, then undo it" is safe only when the undo is a pure inverse.
tags: [kernel, transactions, packages, rollback, fail-closed]
timestamp: 2026-09-22
---
# Lesson

Learned 2026-07-29 during the package-lifecycle reviews (cli-dev, accepted by
the kernel maintainer); trimmed to principle 2026-09-22. An update was refused
correctly — it would have dropped a capability the configuration still
referenced — but the refusal was decided *after* the new artifact and lock had
committed, and "put the previous version back" re-acquired from the source that
had just dropped the export. The refusal was right, the lock had already lost
the row, and the orphaned artifact was never retired. The test that covered it
passed for the wrong reason: presence survives exactly the corruption a
refusal exists to prevent.

**"Do it, then undo it" is safe only when the undo is a pure inverse.**
Re-deriving state from an external source that may have moved is not an
inverse. So any policy decision that would need the pre-operation bytes to
recover must be evaluated while those bytes are still the live ones — inside
the staging transaction, before any lock or artifact commit. A refusal at that
point costs nothing to undo because nothing durable was written, and the
assertion becomes the strong one: lock bytes byte-identical, artifact integrity
unchanged.

The same rule has one corollary worth keeping as judgement: anything that
runs *after* the durable commit is best-effort by definition. A post-commit
retirement or convenience write that fails leaves a lock/store disagreement
with no route back, so the transaction's durable effects are all inside the
commit or all before it — never trailing after it. Every other placement this
rule dictated (ignore-writing at open, preflight of visible lock scopes,
validation before side effects, residue removal in batched conversions) is an
invariant of the package transaction, and its home is the transaction
invariant tests in the repository, not a lesson; if one of them is found
unguarded, the fix is a test, not a note here.

When a gate genuinely cannot see what it must judge, move the judgement to the
first point where the data exists and make failure there equivalent to
refusal. Never weaken the check to fit the gate.

# Related

[Preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md);
[Compatibility follows supported adoption, not every intermediate format](/nodes/oats-kernel-expert/decisions/evidence-bounded-compatibility-and-migration.md).

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/pre-commit-gate-beats-post-hoc-rollback.md` (2026-07-29); SHA-256 `53e9e95b44d93289479003e6ab5d517982e564e70591a101b782aecd63e29bc6`.
2. OATS rationale sources `agents/cli-dev/soul/knowledge/decisions/ignore-must-precede-staging-not-the-commit.md`, `decisions/artifact-retirement-belongs-inside-the-commit.md`, `lessons/gate-preview-omission-requires-rollback-fallback.md`, `lessons/restore-preflight-visible-chain.md`, `lessons/residue-collision-during-batched-migration.md`, `lessons/run-level-rollback-journal-craft.md`, `lessons/kernel-validation-before-side-effects.md`, `lessons/final-package-lifecycle-transaction-invariants.md` (2026-07-25 → 2026-07-29), ordering rationale only.
