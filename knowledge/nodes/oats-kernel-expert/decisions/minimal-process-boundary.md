---
type: Decision
title: A minimal process boundary avoids permanent private coupling
description: A structured public CLI lets independent consumers evolve without turning each private kernel function into a permanent API.
tags: [kernel, cli, api, packages, compatibility, runtimes]
timestamp: 2026-07-26
---
# Rationale

Decided 2026-07-10 by the founder (standalone CLI as the single integration
point) and 2026-07-26 (package-runtime boundary). The process boundary was
chosen to survive kernel-internal refactors and module-loading changes.
Blessing a private-file import would keep the coupling while merely giving it
a public name. Raising an OATS version floor is not a substitute for making a
used kernel surface public: an independently released package must not import
private kernel files even by discovering the installation root.

**Runtime adapters ship zero operations.** They are glue — session events and
bootstrap — and every operation is a CLI command with a machine-readable mode,
so a non-JavaScript runtime shells out instead of importing. Splitting the CLI
and adapter into separate packages was deferred at first (version skew without
gain) and then done once the boundary made the split cheap.

The rejected alternative also exposed one-for-one wrappers around internal
lookup, registration and configuration functions. Higher-level operations
express the consumer need with fewer permanent commitments. Add a narrow
public seam only when a real consumer demonstrates the gap, then bind
compatibility claims to consumer evidence. Retired flags are actively rejected
so a stale consumer fails loudly rather than succeeding with changed
semantics.

The formal envelope, commands, dispatch environment and versioning rules
remain in the current contract below. Desktop owns the product consequences of
this choice; this node does not duplicate its succession decision.

# Related

[One standalone Desktop product, no hidden operational kernel](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md);
[The CLI as a machine boundary](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md).

# Current contracts

- [Current package-runtime-api.md](https://github.com/awebai/oats/blob/main/docs/design/package-runtime-api.md)
- [Current desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md)

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/package-runtime-boundary-structured-cli.md`; SHA-256 `3a6e3a0c14ba21ffb8998ea2f5c02d327f9e5416f0e8277e9ec1eb498544c9e9`.
2. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/standalone-cli.md` (2026-07-10/14); SHA-256 `e3747624f026d43c8fc57ca0f8b464d16d0abf8eaa1a99fa87a310624f4057e3`.
3. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/distribution-packages-config-profiles-and-requirements.md` (2026-07-26, section 7); SHA-256 `c9109cecd0d4622152718436afe5836ea56e00bf7afa52b261eb13da683fb9cc`.
