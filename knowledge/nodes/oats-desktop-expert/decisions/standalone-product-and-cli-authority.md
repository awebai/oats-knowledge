---
type: Decision
title: One standalone Desktop product, no hidden operational kernel
description: Desktop owns operator-product succession while the installed compatible CLI is the model it renders and the only way it changes a deployment.
tags: [desktop, product, cli-authority, succession, degradation, workspace-v2]
timestamp: 2026-07-27
---
# Rationale

Accepted 2026-07-24 (human direction, succession of the browser and terminal
panels). Keeping a browser panel, terminal panel and Desktop as separate
products would split ownership and duplicate behavior. Desktop is the
standalone operator application, not a capability installed into agents. Its
backend belongs to that product rather than inflating the generic kernel.

A hidden bundled operational kernel would erase the honest boundary between
observing an existing deployment and administering it. Desktop uses the
installed compatible CLI instead of forking lifecycle logic or importing
adjacent private implementation. The generic process-boundary rationale has
its sole home in the kernel node.

# The kernel is the model; Desktop renders and drives it (Phase F, 2026-09-24)

The first Desktop kept its own reader of the deployment (config chain, soul
and manifest files, installed-capability directories) and derived the roster
itself. When workspace model v2 changed what a deployment is, that reader was
a second model that could only drift. The human's direction was that Desktop
must be *natively built* for v2, not adapted to it, and Phase F rebuilt it on
one rule:

- **Every deployment fact comes from kernel JSON** (`oats status --json`,
  `oats workspace status --json`, inspect, preview, readiness, version).
  Desktop parses no deployment file. A fact missing from a kernel surface is a
  kernel change, never a Desktop-side parser.
- **Every change is a kernel verb.** Desktop never writes a deployment file.
- **Features are gated on what the CLI declares** (`oats version --json`
  `features[]`), not on version numbers. The accepted version band only
  fences the kernel line; a missing feature is named in the UI and nothing is
  invoked optimistically. Older commands can ignore new flags and still
  succeed, so feature support needs evidence at the authoritative boundary.
- **Remove, do not wrap.** Old readers were deleted with the slice that
  replaced them. No fallback for older kernels, no adapter translating one
  generation's shape into another, and old vocabulary leaves with the code.
  A concept with a genuine v2 successor that Desktop already handles
  correctly (terminal broker, tmux admission) stays and is named
  "unchanged, v2-agnostic", never "kept for compatibility".

Consequence: deployment observation needs a compatible CLI. Pending,
incompatible and ready are distinct truthful states with a recovery path.
Terminal viewers still attach to exact recorded targets without reading any
deployment file.

A forge (GitHub) connection is a workstation fact, not a capability: it lives
in Desktop as a per-machine Connection under the forge CLI's own credential
custody ([forge connection is a workstation fact](/nodes/oats-maintainer/decisions/forge-connection-is-a-workstation-fact.md)).

# Consequences for what Desktop sees and sends

- **Observation tolerates what the app does not own.** A nonzero exit is
  never success, even with plausible output. A row whose reported home falls
  outside the deployment, or repeats another row's home, is withheld and
  counted in the header, never published, addressed or silently dropped.
  Read-only discovery never scaffolds missing state; a folder without a
  deployment is offered explicit onboarding.
- **Desktop does not narrow what the CLI accepts.** Model choice stays free
  text with advisory suggestions; a hard selector was rejected (2026-07-27)
  because runtime preferences may be comma-separated fallback lists and any
  local catalog misses valid models. A suggestion failure resolves to "no
  suggestions", never to "cannot launch".
- **An empty task is a real launch, not a separate mode.** Launching with no
  opening instruction creates an instance that awaits instructions, the same
  shape the CLI produces.

# Rejected alternatives

- A bundled kernel or imported framework code — rejected: hides the
  administer/observe boundary and forks lifecycle logic.
- A Desktop-side deployment reader kept as fallback for older kernels —
  rejected in Phase F: a second model drifts, and "if the kernel is old" paths
  never die.

# Related

[Shared Desktop code keeps one relative path in the repository and package](shared-code-keeps-one-relative-path.md) (packaging rationale, not a change to CLI authority or product succession);
[Agent-centered navigation makes the action target legible](agent-centered-navigation.md);
[Async completion must still own the user's intent](../lessons/asynchronous-intent-and-truthful-outcomes.md);
[The loopback interface is Desktop's trust boundary](loopback-trust-boundary-and-transport-simplicity.md);
[macOS installers — what ad-hoc signing fixes and what it cannot](../lessons/macos-adhoc-signing-decision.md);
[A minimal process boundary avoids permanent private coupling](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md);
[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).

# Current contracts

- [Current desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md)
- [Current desktop-deployment-model.md](https://github.com/awebai/oats/blob/main/packages/desktop/docs/desktop-deployment-model.md)
- [Current design-brief.md](https://github.com/awebai/oats/blob/main/packages/desktop/docs/design-brief.md) (§7, what the Desktop is for)
- [Desktop Phase F boundary (superseded record)](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-24-desktop-phase-f-boundary.md)
- [Souls and capabilities in Desktop (superseded record)](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-07-desktop-souls-capabilities.md)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge, agents/oats-expert/soul/knowledge and agents/dev-coordinator/soul/knowledge @ 7838d3ca.
