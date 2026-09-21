---
type: Decision
title: Capability resources must outlive package staging
description: Explicit payload selection and contained capability artifacts prevent discarded source staging from becoming runtime authority.
tags: [kernel, packages, capabilities, materialization, integrity]
timestamp: 2026-07-29
---
# Rationale

Accepted 2026-07-29 by the founder (materialization redesign), building on the
payload-root decision of 2026-07-28. A package is an atomic transport and
review unit; a capability is the installed behavior. Confusing the two leaves
commands or templates pointing into staging that disappears after acquisition.

The accepted materialization decision keeps a complete contained capability
artifact, including its declared runtime closure. A package-only dependency is
not a durable capability dependency. Fail on an unrepresentable resource
instead of silently borrowing a mutable neighboring path. The defect that
forced this (2026-07-27): a capability declared its skills as work-tree-relative
dependency paths, so a fresh worktree spawned an instance whose instructions
named skills that were never composed — missing *manifests* failed closed while
missing *resources* failed open. "Declared nothing" and "declared three, none
exist" must never collapse to the same empty result. Curriculum resolves only
from locked, materialized sources, which have a defined completion point that a
bare path probe lacks; declaring resources beneath a dependency directory is a
manifest defect.

An explicit package payload boundary also separates distributed behavior from
repository development content. Owner souls, CI and unrelated documents should
not churn installed integrity merely because they share a repository. This is
more reliable than a growing blacklist of development folders. Payload
selection is explicit per source kind, and the two kinds deliberately differ:
a Git selection is the adopter's sticky choice, while a catalog path belongs to
the catalog and is re-read on update — which is why the repair advice for a
moved root differs by source. Catalog identifiers take no path fragment,
because that would create two spellings for one selection and fight the
catalog's ownership of layout.

**Catalog resolution is authoritative.** A fresh install never falls back
implicitly to a bundled legacy source: a silent fallback recreates the old
state and grants legacy trust. Offline use needs an explicit local source.

The cost is stricter authoring and compatibility review. Keep layout rules,
dependency constraints and restoration mechanics in the package contract; this
decision records why containment and resource lifetime matter together.

# Related

[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md);
[Keep kernel responsibilities generic and capability runtimes complete](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md).

# Current contracts

- [Current packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)
- [Current package-runtime-api.md](https://github.com/awebai/oats/blob/main/docs/design/package-runtime-api.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/capability-materialization-and-config-template-sync.md`; SHA-256 `5d2f93eb57246996904fc1c0b14df12c93a91909cffc3d99f6e3d02dfcd37091`.
2. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/oats-package-repository-payload-root.md`; SHA-256 `7ea985675f52ff2a941f9badb2146c1bd3592d1ee65b2a4541c480eb8053be8a`.
3. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/package-payload-root-contract.md` (2026-07-29, ownership rationale only); SHA-256 `0fd5d2b28b51e75a97f826768c7e71b24da4b8afa9998a968d023f42e408b97b`.
4. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/work-tree-relative-capability-skills-fail-open.md` (2026-07-27); SHA-256 `cda911f1e5f50ee546d5aa7cbca279bef0cb5a1ab76bce9178ab4450d2264640`.
