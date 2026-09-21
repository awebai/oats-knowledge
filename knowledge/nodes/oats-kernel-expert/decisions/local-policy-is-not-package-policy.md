---
type: Decision
title: Local configuration remains authored policy
description: Explicit adoption and synchronization preserve local authorship rather than allowing package updates to rewrite policy at a distance.
tags: [kernel, config, packages, adoption, authorship]
timestamp: 2026-07-29
---
# Rationale

Accepted 2026-07-26 by the founder (package profiles as snapshots) and
2026-07-29 (byte-preserving synchronization). A package can recommend
configuration, but acquiring or updating it must not silently retarget agents.
Explicit adoption produces locally owned policy; synchronization is a separate
reviewed decision, not live inheritance. Rejected: applying package config
automatically at install ("acquired is not active"), and live `extends`-style
links to package configs, which would change targets at a distance.

Local authorship includes untouched comments, ordering, whitespace and
final-newline choices. A parser round trip that changes these bytes claims
authority the package was never given. Overlapping changes need an explicit
choice rather than a plausible automatic merge; when the local and upstream
edits touch adjacent regions, that entanglement is *one disputed spot* to be
surfaced, not a defect to be "fixed" by a cleverer merge.

First adoption is especially dangerous: treating the existing local file as a
fictional upstream base erases evidence of local authorship and makes
replacement look uncontested. Preserve that distinction when reasoning about
migration and sync. Ejection likewise intentionally transfers maintenance to
the local author; it is not a way to keep receiving invisible upstream policy
changes.

**Overrides exist for content you do not own.** An injection override on a
locally authored or path-sourced capability is rejected (2026-07-14) because
the operator already owns that text; an override there is a second place to
edit the same words — a drift trap. Auto-copying packaged injections into
local override files at install was rejected for the mirror reason: it
silently converts defaults into pins, so updates stop reaching deployments
that never consciously customized anything.

**Drift is a refusal, not a diff** (2026-07-29). A synchronization preview that
fell back to the *current* source when the locked source had changed would let
anyone who can edit the source present arbitrary bytes as "upstream" inside the
very command meant to help adopters accept upstream. Advancing past drift is an
explicit re-acquisition with its own consent, never a side effect of looking.

Personal machine preferences — which runtime binary, which account — never
live in committed configuration (2026-07-17); configs are shared, and such
choices are host-local.

# Related

[Compatibility follows supported adoption, not every intermediate format](/nodes/oats-kernel-expert/decisions/evidence-bounded-compatibility-and-migration.md);
[Soul declares kind, config assigns policy](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md).

# Current contracts

- [Current packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)
- [Current configuration.md](https://github.com/awebai/oats/blob/main/docs/configuration.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/capability-materialization-and-config-template-sync.md`; SHA-256 `5d2f93eb57246996904fc1c0b14df12c93a91909cffc3d99f6e3d02dfcd37091`.
2. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/byte-preserving-three-way-config-merge.md`; SHA-256 `35f828d4bc46128dab47a1ee3e4a44468153fe2899a25953384d2f575b1b186b`.
3. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/no-adopted-base-means-empty-base-not-local.md`; SHA-256 `853c98b573e2f9411715ef52826557b22f9234da9c14356d90f78bce2f5c1c85`.
4. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/config-authorship-and-ambient-skills.md` (2026-07-14, section 1); SHA-256 `8ffcb02b358eb02a17bf12a297b4031f9dc247aa1be0a5a2d74eaf9eb05b126d`.
5. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/config-diff-fails-closed-on-drifted-source.md` (2026-07-29); SHA-256 `531c41878996d989ffbc4ea1e1d9450899c2ec1cf600ffbe398926c01cd0149a`.
6. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/distribution-packages-config-profiles-and-requirements.md` (2026-07-26, options 2, 3, 8); SHA-256 `c9109cecd0d4622152718436afe5836ea56e00bf7afa52b261eb13da683fb9cc`.
7. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/marketplace-workmodes-runtime.md` (2026-07-17, personal-preference rationale only); SHA-256 `0351c556a8b758e806eab3f5ff29578f128947c82a5c8786e207e7f0b40bf6a7`.
