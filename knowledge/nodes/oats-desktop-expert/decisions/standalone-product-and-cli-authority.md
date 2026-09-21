---
type: Decision
title: One standalone Desktop product, no hidden operational kernel
description: Desktop owns operator-product succession while the installed compatible CLI remains authoritative for OATS mutations.
tags: [desktop, product, cli-authority, succession, degradation]
timestamp: 2026-07-27
---
# Rationale

Accepted 2026-07-24 (human direction, succession of the browser and terminal
panels). Keeping a browser panel, terminal panel and Desktop as separate
products would split ownership and duplicate behavior. Desktop is the
standalone operator application, not a capability installed into agents. Its
backend belongs to that product rather than inflating the generic kernel.

A hidden bundled operational kernel would erase the honest boundary between
observing an existing deployment and administering it. Use the installed
compatible CLI for mutations instead of forking lifecycle logic or importing
adjacent private implementation. The generic process-boundary rationale has
its sole home in the kernel node.

Observation may remain useful when mutations are unavailable, but
kernel-backed inspection can have its own gate. Do not promise every read
works without a CLI. Pending, incompatible and ready need distinct truthful
states and a recovery path. Older commands can ignore new flags and still
succeed; feature support needs evidence at the authoritative mutation
boundary.

# Consequences for how Desktop treats what it sees and what it sends

- **Observation tolerates deployments the app does not own.** A packaged app
  reads deployments it did not create; a malformed config, soul or manifest
  degrades to "not visible" rather than an error, and read-only discovery
  never scaffolds missing state into someone else's deployment.
- **Desktop does not narrow what the CLI accepts.** Model choice stays free
  text with an advisory catalog; a hard selector was rejected (2026-07-27)
  because runtime preferences may be comma-separated fallback lists and any
  local catalog misses valid models. The server does not validate catalog
  membership either — a catalog failure resolves to "no suggestions", never
  to "cannot launch".
- **An empty task is a real launch, not a separate mode.** Launching with no
  task text deliberately creates an instance that awaits instructions, the
  same shape the CLI produces; Desktop did not invent a second "no task"
  flow.

# Related

[Agent-centered navigation makes the action target legible](/nodes/oats-desktop-expert/decisions/agent-centered-navigation.md);
[Async completion must still own the user's intent](/nodes/oats-desktop-expert/lessons/asynchronous-intent-and-truthful-outcomes.md);
[The loopback interface is Desktop's trust boundary](/nodes/oats-desktop-expert/decisions/loopback-trust-boundary-and-transport-simplicity.md);
[macOS installers — what ad-hoc signing fixes and what it cannot](/nodes/oats-desktop-expert/lessons/macos-adhoc-signing-decision.md);
[A minimal process boundary avoids permanent private coupling](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md);
[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).

# Current contracts

- [Current desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md)
- [Current 2026-09-07-desktop-souls-capabilities.md](https://github.com/awebai/oats/blob/main/docs/design/2026-09-07-desktop-souls-capabilities.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/desktop-panel-succession.md`; SHA-256 `cbb9fd8a1686ae2fc0d8eb6ebe3b3dc95894a886400b2f74f66db836211dc0fa`.
2. OATS rationale source `agents/dev-coordinator/soul/knowledge/decisions/desktop-succession-maintainer-positions.md`; SHA-256 `30f6b01650bec4029812d1013f05b3e561ed71ac3069abac42bfe160a002e159`.
3. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/degradation-state-unknown-capable.md`; SHA-256 `95673e04f43013b1710dfb623d64345b40f90461fac34e4209601ecbff74e35d`.
4. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/new-mutation-flags-capability-gate.md`; SHA-256 `a0ed04fb746059983ff04f8f51996301b7526e52a80ababf0f91bd7b3b9e9294`.
5. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/architecture/desktop-deployment-reader.md` (tolerant observation residual only); SHA-256 `62c659b630ae66dea52f0f6b62de6681c5d04b534d50a15fdcc1d2655a17dced`.
6. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/model-selection-advisory-datalist.md`; SHA-256 `2b22ec02a50812b1ec84bbbb9b25b1023aa0b4845494e8fc1058030166baeea9`.
7. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/architecture/spawn-endpoint.md` (empty-task semantics residual only); SHA-256 `0e54452c5d70ba15e322bcd12c9c44a78788231401aaed551f6cfcd6083abe3e`.
