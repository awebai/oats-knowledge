---
type: Decision
title: One standalone Desktop product, no hidden operational kernel
description: Desktop owns operator-product succession while the installed compatible CLI remains authoritative for OATS mutations.
---
# Rationale

Keeping a browser panel, terminal panel and Desktop as separate products would split ownership and duplicate behavior. Desktop is the standalone operator application, not a capability installed into agents. Its backend belongs to that product rather than inflating the generic kernel.

A hidden bundled operational kernel would erase the honest boundary between observing an existing deployment and administering it. Use the installed compatible CLI for mutations instead of forking lifecycle logic or importing adjacent private implementation. The generic process-boundary rationale has its sole home in the kernel node.

Observation may remain useful when mutations are unavailable, but kernel-backed inspection can have its own gate. Do not promise every read works without a CLI. Pending, incompatible and ready need distinct truthful states and a recovery path. Older commands can ignore new flags and still succeed; feature support needs evidence at the authoritative mutation boundary.

# Related

[Agent-centered navigation makes the action target legible](/nodes/oats-desktop-expert/decisions/agent-centered-navigation.md); [Async completion must still own the user's intent](/nodes/oats-desktop-expert/lessons/asynchronous-intent-and-truthful-outcomes.md); [A minimal process boundary avoids permanent private coupling](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md); [Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).

# Current contracts

- [Current desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md)
- [Current 2026-09-07-desktop-souls-capabilities.md](https://github.com/awebai/oats/blob/main/docs/design/2026-09-07-desktop-souls-capabilities.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/desktop-panel-succession.md`; SHA-256 `cbb9fd8a1686ae2fc0d8eb6ebe3b3dc95894a886400b2f74f66db836211dc0fa`.
2. OATS rationale source `agents/dev-coordinator/soul/knowledge/decisions/desktop-succession-maintainer-positions.md`; SHA-256 `30f6b01650bec4029812d1013f05b3e561ed71ac3069abac42bfe160a002e159`.
3. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/degradation-state-unknown-capable.md`; SHA-256 `95673e04f43013b1710dfb623d64345b40f90461fac34e4209601ecbff74e35d`.
4. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/new-mutation-flags-capability-gate.md`; SHA-256 `a0ed04fb746059983ff04f8f51996301b7526e52a80ababf0f91bd7b3b9e9294`.
