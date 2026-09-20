---
type: Decision
title: Compatibility follows supported adoption, not every intermediate format
description: Supported published commitments deserve compatibility while unrepresentable migrations must refuse rather than lose state.
---
# Rationale

An intermediate implementation does not automatically become a permanent compatibility obligation. Establish supported adoption before adding another version, reader and migration subsystem. The accepted materialization redesign rejected an unadopted transitional format while retaining genuinely supported historical inputs.

This is not permission to abandon published commitments because no local consumer is visible. Reader compatibility and current authoring rules differ: accepting an immutable legacy artifact does not endorse emitting that shape today.

A migration also cannot invent a home for state its destination cannot represent. The founder chose whole-scope refusal over converting official entries around retained ones or creating a residue container. The deliberate cost is delayed migration until the whole scope is representable. That is preferable to a green conversion that silently loses authority over existing artifacts.

# Related

[Local configuration remains authored policy](/nodes/oats-kernel-expert/decisions/local-policy-is-not-package-policy.md).

# Current contracts

- [Current packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)
- [Current package-runtime-api.md](https://github.com/awebai/oats/blob/main/docs/design/package-runtime-api.md)

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/mixed-scope-migration-refuses-whole.md`; SHA-256 `efea78df940d08a77686ffe7490dea1b4ce97a8002246bba97b8b9c3e9ae2735`.
2. OATS rationale source `agents/dev-coordinator/soul/knowledge/lessons/replace-unadopted-transitional-formats-in-place.md`; SHA-256 `8bc33f7bd391d4e9da71224f03e5b23506e652b325b7defc17ea81d63a034af1`.
