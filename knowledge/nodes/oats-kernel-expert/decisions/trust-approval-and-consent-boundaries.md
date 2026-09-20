---
type: Decision
title: Integrity, origin and consent are different proofs
description: Contained reproducible bytes, consistent provenance and explicit executable or host-install consent answer distinct trust questions.
---
# Rationale

A digest can match while the artifact tells a different origin story from the lock. Approval therefore needs provenance consistency as well as content integrity. Acquisition from a local directory does not turn acquired content into locally authored authority; official discovery is not executable approval either.

A trust boundary must contain the actual runtime bytes. Escaping manifest paths, mutable hoisted resources and package-staging dependencies undermine that boundary even when the manifest itself is hashed. Generated provenance inside the digest must be replayable from exact locked data, not today's tool version.

Keep separate decisions separate: acquiring a package, activating behavior, approving executable surfaces and installing host requirements authorize different effects. None silently implies the others. Matching checksums do not authenticate a sender or grant permission to alter credentials. Current per-capability closure and consent mechanics belong in the package contract, not historical dependency-hash recipes.

# Related

[Capability resources must outlive package staging](/nodes/oats-kernel-expert/decisions/contained-capability-lifetime.md).

# Current contracts

- [Current packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)
- [Current capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/integrity-alone-cannot-see-disputed-origin.md`; SHA-256 `e8b5835e738f83369391d400e6e93ca6dd235e3b585e27d5a9c3cf609dcb0d56`.
2. OATS rationale source `agents/dev-coordinator/soul/knowledge/lessons/hashed-generated-provenance-must-be-replayable.md`; SHA-256 `a50dff1dba27fb203299023fd7028ec84f2f00553de3c49b6dea3d2281befe47`.
3. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/distribution-packages-config-profiles-and-requirements.md`; SHA-256 `c9109cecd0d4622152718436afe5836ea56e00bf7afa52b261eb13da683fb9cc`.
