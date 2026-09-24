---
type: Decision
title: Preserve recovery authority until the outcome is proven
description: Partial failures must retain the identity and obligations needed for retry rather than mistaking plausible descriptors for completed cleanup.
tags: [kernel, rollback, lifecycle, spawn, retire, fail-closed]
timestamp: 2026-09-24
---
# Rationale

Decided 2026-07-27 during the spawn-rollback hardening reviews, on the
founder's fatal-versus-advisory distinction. A rollback that announces
incomplete external cleanup and then deletes its only retry identity converts
recoverable failure into permanent debt. Preserve the authority and evidence
needed to finish every outstanding category of work, not merely the loudest
failure.

A well-formed descriptor is insufficient: it may name no executable cleanup,
omit an obligation or describe stale configuration. Verify the outstanding
outcome actually occurred before destroying recovery state. Validation asks
*could this work*; verification asks *did it work* — only one of them can be
wrong in the direction that destroys data. An empty failure list is not proof
anything capable of reporting failure ran: a proof obligation of zero is not a
proof. A cleanup probe has three outcomes — absent, present, could-not-verify —
and mapping errors to empty output turns the third into the first. A path in a
message must be the located value, not a reconstruction, and a fail-closed
default needs one loud, explicit override or it is a trap.

**Writes to another live instance are commits.** Perform them after the last
fallible step, atomically, with compensation; the invariant is all-or-nothing —
the new agent live *and* the lineage recorded, or neither. A guarantee spans
producer and consumer: retaining recovery state helps nothing if the reader
does not recognize every way it can appear. Two code paths that owe the same
guarantee and agree today are a divergence that has not happened yet; find
every path that owes it before declaring it kept.

This does not require exporting every engine transaction as a public two-phase
handle. An outer command may journal its surrounding state while composing
ordinary atomic operations, preserving subsystem boundaries.

Retention is not a promise that debt cannot remain. An explicit operator
override transfers unresolved responsibility; it must not be reported as
observed external completion. Keep exact recovery recipes with the current
owning implementation, not in a generalized permission to delete state.

**Recovery derives truth from the object, not from spawn-time metadata**
(lesson 2026-09-21, redesign lead). Retirement
recovery reconstructed a worktree's branch from the metadata recorded at
spawn; a worktree that had legitimately switched branches during its task
could then never pass the recovery comparison, and the instance became
unretirable by the normal path even though nothing was unpreserved. The
refusal itself was fail-closed and *correct*: never edit the peer's metadata,
switch its branch or force-clean its home to make retirement pass — that is
exactly the unverified cleanup this decision forbids and it destroys the
evidence. Verify preservation by hand, record it, and leave the instance
retiring until recovery is corrected. The rule: recovery derives the branch from the
worktree while it exists and falls back to recorded metadata only when the
worktree is gone, recording the drift as a typed observation. Whether a
worktree-mode instance may drift branches silently at all — record the switch
or forbid it — is a separate Decision, not a patch.

**The reader must know which record answers its question, and every receipt
a hook renews replaces the old one** (2026-09-24, two workspace-model
patches, redesign lead).

- **Two records for one home.** A quarantine retry trusted any live instance
  record as the spawn record. On a workspace home, that file is a
  materialization stub written *before* the spawn hooks run. The retry
  therefore could not rerun what had failed, and its message blamed the
  wrong field. Two records for one home is a design smell: when both can be
  present, the consumer must know which question each one answers, and a
  could-not-retry message names the field it lacked rather than guessing
  why.
- **A renewed receipt that was dropped.** A hook contract documented that a
  start returns metadata, but the start path discarded it. A provider that
  renews a grant at every start then left retirement revoking the
  *original* grant while the live one ran until it expired. A documented
  hook return that one lifecycle path drops is a wrong-target action waiting
  for retirement. Metadata a hook returns replaces the receipt that the next
  lifecycle step will act on.

# Related

[External knowledge needs source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md);
[A refusal that needs the old bytes is a pre-commit gate](/nodes/oats-kernel-expert/lessons/refusal-belongs-before-commit.md);
[A fail-closed guarantee is proven by its first real user](/nodes/oats-kernel-expert/lessons/fail-closed-mechanism-proven-by-first-user.md);
[Identity and location belong to the resolved object](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md);
[A promised replacement guarantee needs an external identity witness](/nodes/oats-kernel-expert/decisions/external-witness-for-captured-session-identity.md).

# Current contracts

- [Current capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/rollback-retain-retry-state.md`; SHA-256 `9b4175f1c538f8a8764355cb681d5990d8e18d16d3a3fa66ca03eefe58e31ffa`.
2. OATS rationale source `agents/dev-coordinator/soul/knowledge/lessons/compose-atomic-engine-operations-with-an-outer-command-journal.md`; SHA-256 `c9ac9a50284545b9697c1a26a860382ab7a4c05e860c0b3aba64b22005458a78`.
3. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/cross-instance-writes-commit-last.md` (2026-07-25); SHA-256 `099cf46627333686b46707ebbb0c69db0cd5935df9899c8adad62c0655f932bf`.
4. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/single-implementation-guarantee.md` (2026-07-27); SHA-256 `2ee9e42ccbe1aa71d9540b7ac2cbaf2df8c4dd680de5deb4d83c6569e6800d81`.
5. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/rollback-probes-argv-and-fail-closed.md` (2026-07-28), three-outcome probe rationale only.
6. OATS rationale source `agents/oats-expert/soul/knowledge/lessons/retire-recovery-uses-recorded-branch-not-checked-out-branch.md` (2026-09-21), rule and conduct only.
7. OATS stewardship source `agents/oats-expert/soul/knowledge/stewardship/delivery-log.md`, v0.25.4 entry (2026-09-24), lesson only; framework `docs/design/2026-09-23-workspace-module-contracts.md`, "0.25.5 — launch-hook `meta` is persisted"; [served identity decision](/nodes/oats-expert/decisions/served-identity-is-a-messaging-layer-fact.md) (2026-09-24), kernel-mechanics clause.
