---
type: Decision
title: Keep kernel responsibilities generic and capability runtimes complete
description: Native lifecycle and exact managed composition belong to the kernel while replaceable capabilities own concrete runtime behavior.
---
# Rationale

The kernel/layer split rejects both monolithic tool features and unrestricted competing implementations of one fundamental responsibility. Soul and instance lifecycle are the OATS pattern itself; knowledge, messaging and tasks remain explicit exclusive choices, alongside additive capabilities.

This preserves a stable specialization framework without requiring each deployment to accept one memory or service model. A selected knowledge capability owns its complete runtime, not just a backend beneath mandatory kernel theory.

The founder amendment recorded on 2026-07-27 retained shared ambient Pi extensions for cross-agent tools. This narrowed the earlier accepted strict-curriculum promise: verify the runtime's package contract instead of duplicating its resolver, while keeping OATS-managed composition exact and inspectable.

Exact managed composition makes a role's curriculum inspectable and exposes missing or conflicting resources before launch. It is not a sandbox: runtime-native tools and ambient extensions can remain. Do not revive the older stronger claim that every runtime-visible surface is isolated. Keep current schemas and launch policies in their maintained contracts, not a parallel knowledge specification.

# Related

[Optional reference theory](/nodes/oats-expert/optional-reference-theory.md); [A minimal process boundary avoids permanent private coupling](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md).

# Current contracts

- [Current capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/kernel-and-providers.md`; SHA-256 `33e2091b5e541fb17cdbe3d8b7c36b4604466cac4300624c8549e2fbd3139e21`.
2. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/strict-instance-curriculum.md`; SHA-256 `11f1e545a2eeebb17fd2d37df36be9722e90acae86d7fb51c5c4867eada70cae`.
3. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/runtime-contract-not-resolution-internals.md`; SHA-256 `7a7508abbc9868e80700bae98a2593865966464f259444c97a86516930d64fdf`.
