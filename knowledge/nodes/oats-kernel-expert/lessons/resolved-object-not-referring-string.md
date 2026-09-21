---
type: Lesson
title: Identity and location belong to the resolved object, never to the string that named it
description: Every containment or ownership guard resolves the real destination and compares canonical objects; a lexical path or an instance name proves nothing about where creation lands or which instance is meant.
tags: [kernel, security, containment, symlinks, identity, spawn]
timestamp: 2026-07-28
---
# Lesson

Consolidated from the spawn-placement and lock-hardening reviews of
2026-07-24 → 2026-07-29. A lexical path says nothing about where creation lands
once a symlink appears anywhere along it, and an instance name is unique only
within one agent's instance directory. A canonical-home guard that validated
the agents root lexically still created an instance inside a linked worktree
through a symlinked alias; a caller-controlled name joined onto a base and
checked for existence is not containment; and a redirect helper that only knew
about *one* kind of redirect passed every other one.

**A containment rule states where a path may go, not which known bad case it
avoids.** The durable form is equality against the object OATS intended to
create: resolve the nearest existing ancestor, re-append the uncreated
segments, and require the result to be exactly the intended destination under
an allowed base. Derived bases need containing too — anything OATS derives from
an operator-supplied anchor must remain under the anchor it claims to be under,
or a symlinked sibling directory becomes an allowed base. A path check expires
the moment it returns, so re-assert immediately before the side effect and
again after creation; if the created directory is not where it was meant to be,
remove only the empty directory OATS just made — an unexpected resolved
destination is not OATS-owned state.

Three outcomes must stay distinct: absent, present-but-dangling, and escaping.
A check with more outcomes than one system call distinguishes is a loop, not an
optimisation, and a broad catch around a probe swallows the deeper escape
errors it exists to find. Version control reports canonical paths, so an
identity it hands back is captured at creation and carried, never
reconstructed after arbitrary lifecycle code ran; compare realpaths and fail
closed rather than guess when no canonical root can be established. Path is
the identity proof; a name is recorded only after it round-trips to the same
object from every context that will read it. Writes into adopted local files
check their parents immediately before each write, not at command entry; a
backup is replaced by rename, never written through; and a backup that is not
journalled is a backup the operator never had.

**Accepted limit:** Node offers no relative, no-follow creation primitive, so a
narrow race between check and create remains. That residual is an operator
prerequisite (protect the deployment directory at the OS level) and is
documented where operators read, not implied away by a pathname check. This is
not a symlink ban: a symlinked agents root that resolves back inside the
checkout is legitimate and the deployment layout relies on such links.

The Desktop reached the same rule independently on 2026-07-24 for its
file-serving guard — canonicalise an admitted root once, hold it immutable,
resolve only the request, and contain by exact root or root-plus-separator
([Desktop's admitted-roots finding](/nodes/oats-desktop-expert/decisions/privileged-workspace-admission.md)).
Two products, two reviews, one conclusion: the convergence is evidence for
the rule, not a duplicate record of it.

The legacy single-capability grammar stays loose on purpose: those artifacts
are named by the basename of their source, never by a declared identifier, and
tightening it would strand published standalone capabilities.

# Related

[Separate operational home from granted work authority](/nodes/oats-kernel-expert/decisions/home-work-authority.md);
[Live lineage is deliberately bounded](/nodes/oats-kernel-expert/decisions/bounded-live-lineage.md);
[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/placement-guards-resolve-destination.md` (2026-07-28); SHA-256 `1a848d0cc822ed98f39a4fff3ce9d99c0d0bbbed8aae01b61654c8ac089e89f0`.
2. OATS rationale sources `agents/cli-dev/soul/knowledge/lessons/canonical-agents-root-git-identity.md`, `caller-controlled-instance-name-containment.md`, `names-are-not-identity.md`, `path-first-resolution-round-trip.md`, `component-walk-classifies-broken-links.md`, `payload-root-subtree-extraction.md`, `symlink-containment-walker-throws.md`, `canonical-worktree-verification.md`, `decisions/adopted-writes-never-follow-a-symlink.md`, `decisions/capability-id-grammar-and-containment-proof.md` (2026-07-24 → 2026-07-29), principle only; machine-specific verification paragraphs dropped.
