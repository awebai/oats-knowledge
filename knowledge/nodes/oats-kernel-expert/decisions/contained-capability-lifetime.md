---
type: Decision
title: Capability resources must outlive package staging
description: Explicit payload selection and contained capability artifacts prevent discarded source staging from becoming runtime authority.
---
# Rationale

A package is an atomic transport and review unit; a capability is the installed behavior. Confusing the two leaves commands or templates pointing into staging that disappears after acquisition.

The accepted materialization decision keeps a complete contained capability artifact, including its declared runtime closure. A package-only dependency is not a durable capability dependency. Fail on an unrepresentable resource instead of silently borrowing a mutable neighboring path.

An explicit package payload boundary also separates distributed behavior from repository development content. Owner souls, CI and unrelated documents should not churn installed integrity merely because they share a repository. This is more reliable than a growing blacklist of development folders.

The cost is stricter authoring and compatibility review. Keep layout rules, dependency constraints and restoration mechanics in the package contract; this decision records why containment and resource lifetime matter together.

# Related

[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).

# Current contracts

- [Current packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)
- [Current package-runtime-api.md](https://github.com/awebai/oats/blob/main/docs/design/package-runtime-api.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/capability-materialization-and-config-template-sync.md`; SHA-256 `5d2f93eb57246996904fc1c0b14df12c93a91909cffc3d99f6e3d02dfcd37091`.
2. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/oats-package-repository-payload-root.md`; SHA-256 `7ea985675f52ff2a941f9badb2146c1bd3592d1ee65b2a4541c480eb8053be8a`.
