---
type: Decision
title: Official package repositories separate the distributed payload root from repository tooling — and the owner soul never ships in the payload
description: A package repository keeps everything the kernel copies under one payload root that carries the distribution manifest, and everything else (schemas, scripts, tests, workflows, the package expert's soul) outside it; the integrity digest covers the payload only, and a Git or catalog reference always reads the payload root.
tags: [decision, integrations, packaging, payload-root, distribution, integrity]
timestamp: 2026-07-28
---

Decided 2026-07-28 by the integrations expert when the kernel's contained
package root contract landed; still the layout under the workspace model,
where a package pinned by tag or by Git reference is read from that root.

# Decision

- **One payload root per package repository**, holding the distribution
  manifest, the capability directories with their manifests and skills, any
  declared configuration profiles, and the licence. That subtree is what the
  kernel copies and what the integrity digest hashes.
- **Repository tooling stays outside it**: schema copies, validation and sync
  scripts, tests, workflows, the repository's own package descriptor, and the
  package expert's soul. None of it is installed.
- **Runtime content never hardcodes the payload directory's name**; resource
  paths inside the payload are payload-relative. Repository tooling may know
  the name, because it is not shipped.
- **The repository root is not a package root.** A reference to the
  repository root without a payload manifest fails as an invalid package,
  which is the proof that the separation holds.

# Why

The kernel copies bytes and hashes what it copies. Anything a package needs
at runtime must therefore be inside the hashed tree, and anything that must
not ship (tests with fixtures, a soul's knowledge, workflow secrets) must be
outside it; a single root makes both properties checkable by a listing. The
mirror-and-pin discipline of the official catalog depends on the same
boundary: the framework's bundled copy is a byte-for-byte mirror of the
payload root at the published tag, never an authoring surface.

# Consequences

- Sibling packages developed together reference each other by their payload
  roots, not their repository roots.
- Negative test fixtures mirror the payload layout so that "manifest at the
  wrong level" is a tested refusal.
- Rehearsing a provider against a pre-release head pins the repository by Git
  reference and full commit, and the kernel reads the payload root from it.

# Citations

- Legacy `agents/integrations-expert/soul/knowledge/lessons/payload-root-repo-layout.md` (2026-07-28; its install-command probes describe the classic installed tier, superseded by the workspace model's copy-whole packages).
