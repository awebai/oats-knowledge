---
type: Decision
title: Preserve recovery authority until the outcome is proven
description: Partial failures must retain the identity and obligations needed for retry rather than mistaking plausible descriptors for completed cleanup.
---
# Rationale

A rollback that announces incomplete external cleanup and then deletes its only retry identity converts recoverable failure into permanent debt. Preserve the authority and evidence needed to finish every outstanding category of work, not merely the loudest failure.

A well-formed descriptor is insufficient: it may name no executable cleanup, omit an obligation or describe stale configuration. Verify the outstanding outcome actually occurred before destroying recovery state. An empty failure list is not proof anything capable of reporting failure ran.

This does not require exporting every engine transaction as a public two-phase handle. An outer command may journal its surrounding state while composing ordinary atomic operations, preserving subsystem boundaries.

Retention is not a promise that debt cannot remain. An explicit operator override transfers unresolved responsibility; it must not be reported as observed external completion. Keep exact recovery recipes with the current owning implementation, not in a generalized permission to delete state.

# Related

[External knowledge needs source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md).

# Current contracts

- [Current capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/rollback-retain-retry-state.md`; SHA-256 `9b4175f1c538f8a8764355cb681d5990d8e18d16d3a3fa66ca03eefe58e31ffa`.
2. OATS rationale source `agents/dev-coordinator/soul/knowledge/lessons/compose-atomic-engine-operations-with-an-outer-command-journal.md`; SHA-256 `c9ac9a50284545b9697c1a26a860382ab7a4c05e860c0b3aba64b22005458a78`.
