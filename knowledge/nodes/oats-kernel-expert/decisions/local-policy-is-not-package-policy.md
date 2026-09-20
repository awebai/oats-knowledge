---
type: Decision
title: Local configuration remains authored policy
description: Explicit adoption and synchronization preserve local authorship rather than allowing package updates to rewrite policy at a distance.
---
# Rationale

A package can recommend configuration, but acquiring or updating it must not silently retarget agents. Explicit adoption produces locally owned policy; synchronization is a separate reviewed decision, not live inheritance.

Local authorship includes untouched comments, ordering, whitespace and final-newline choices. A parser round trip that changes these bytes claims authority the package was never given. Overlapping changes need an explicit choice rather than a plausible automatic merge.

First adoption is especially dangerous: treating the existing local file as a fictional upstream base erases evidence of local authorship and makes replacement look uncontested. Preserve that distinction when reasoning about migration and sync. Ejection likewise intentionally transfers maintenance to the local author; it is not a way to keep receiving invisible upstream policy changes.

# Related

[Compatibility follows supported adoption, not every intermediate format](/nodes/oats-kernel-expert/decisions/evidence-bounded-compatibility-and-migration.md).

# Current contracts

- [Current packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)
- [Current configuration.md](https://github.com/awebai/oats/blob/main/docs/configuration.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/capability-materialization-and-config-template-sync.md`; SHA-256 `5d2f93eb57246996904fc1c0b14df12c93a91909cffc3d99f6e3d02dfcd37091`.
2. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/byte-preserving-three-way-config-merge.md`; SHA-256 `35f828d4bc46128dab47a1ee3e4a44468153fe2899a25953384d2f575b1b186b`.
3. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/no-adopted-base-means-empty-base-not-local.md`; SHA-256 `853c98b573e2f9411715ef52826557b22f9234da9c14356d90f78bce2f5c1c85`.
