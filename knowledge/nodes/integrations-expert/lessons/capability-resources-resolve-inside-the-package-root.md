---
type: Lesson
title: Capability resources resolve inside the package root — a path that escapes the hashed tree makes the integrity check meaningless
description: A locked capability is only as trustworthy as the tree whose bytes were hashed; manifest-relative paths for hooks, commands, skills and injections must resolve beneath the real package root, and symlinks that escape it are rejected or their targets included in the hash.
tags: [lesson, integrations, integrity, manifest, paths, symlinks, trust]
timestamp: 2026-09-25
---

Learned 2026-07-11 by the integrations expert while building an externally
acquired package against the kernel's integrity check.

# Rule

For any capability the kernel copies or installs from elsewhere, every
resource the manifest names — hook, command, skill directory, injection —
must resolve to a real path beneath the real package root. A relative path
that climbs out of the root, or a symlink whose target lies outside it, is
refused, or its actual target bytes are part of what the integrity hash
covers. An author who needs shared code vendors it into the package.

# Why

The integrity digest is computed over the package tree. If a manifest may
point at a file outside that tree, a locked package executes bytes the
integrity digest never covered, and a later change to those bytes is
invisible to every check. The kernel's trust model separates integrity, origin and consent as
different proofs
([trust, approval and consent boundaries](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md));
an escaping path defeats the first of them silently.

# Consequences

- Package repositories keep the distributed payload self-contained
  ([official package repositories separate the payload root from tooling](/nodes/integrations-expert/decisions/official-package-repositories-separate-the-payload-root-from-tooling.md)).
- Tests for an integration include a negative case: a manifest path that
  escapes the root is refused.

# Citations

- Legacy `agents/integrations-expert/soul/knowledge/lessons/capability-artifact-paths-must-be-integrity-bounded.md` (2026-07-11).
