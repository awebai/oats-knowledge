---
type: Decision
title: Record locks favor recoverable refusal over live-holder theft
description: Record-store lock age must not override a live local holder, with foreign-lock fallback and the check-unlink race remaining explicit limits.
---
# Rationale

The record-store failure came from comparing clocks with different starting events. A wait timeout starts when a contender arrives; lock age starts when the holder acquired it. Ordering the durations cannot prevent a late contender from stealing a live lock.

The accepted tradeoff refuses to write when a local holder appears alive, even after long delay. PID reuse can make abandoned state appear live, but that recoverable refusal is preferable to concurrent read-truncate-write repair corrupting the journal. Do not reintroduce an unconditional age ceiling as a convenience fix.

This is bounded record-store rationale, not distributed-lock doctrine. Foreign or unreadable holders still use age fallback, and checking identity before unlink detects many replacements but does not close the check/unlink race. Owner-checked release helps prevent cascading theft without proving universal exclusion.

# Related

[Preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).

# Current contracts

- [Current store.mjs](https://github.com/awebai/oats/blob/main/packages/record/lib/store.mjs)

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/pid-liveness-fails-toward-refusing-to-write.md`; SHA-256 `f311a5f54d63bb390ef2e1233ae4664ee0cd1cc6a3f0dce01f50eada99a7a6c4`.
2. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/ownership-token-lock-beats-threshold-ordering.md`; SHA-256 `15cec5b3f3ab50647b5262b6c692521d96b4785745f3690850c2296efd61468c`.
