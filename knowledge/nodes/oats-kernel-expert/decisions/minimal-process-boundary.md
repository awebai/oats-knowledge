---
type: Decision
title: A minimal process boundary avoids permanent private coupling
description: A structured public CLI lets independent consumers evolve without turning each private kernel function into a permanent API.
---
# Rationale

The process boundary was chosen to survive kernel-internal refactors and module-loading changes. Blessing a private-file import would keep the coupling while merely giving it a public name.

The rejected alternative also exposed one-for-one wrappers around internal lookup, registration and configuration functions. Higher-level operations express the consumer need with fewer permanent commitments. Add a narrow public seam only when a real consumer demonstrates the gap, then bind compatibility claims to consumer evidence.

The formal envelope, commands, dispatch environment and versioning rules remain in the current contract below. Desktop owns the product consequences of this choice; this node does not duplicate its succession decision.

# Related

[One standalone Desktop product, no hidden operational kernel](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md).

# Current contracts

- [Current package-runtime-api.md](https://github.com/awebai/oats/blob/main/docs/design/package-runtime-api.md)
- [Current desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md)

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/package-runtime-boundary-structured-cli.md`; SHA-256 `3a6e3a0c14ba21ffb8998ea2f5c02d327f9e5416f0e8277e9ec1eb498544c9e9`.
