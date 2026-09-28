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

**Guard the descriptor you read, not the path you checked** (2026-09-19).
A temporary ancestor redirect during open can leave a foreign descriptor even
when the named path is normal again; an earlier stat and a later root check
do not establish which opened file supplied the bytes. Bind the descriptor to
the physically contained source *before* reading, because a refusal after a
foreign read cannot undo it. For the same reason a path cannot back a promise
that a directory was not *replaced*: a path can name a different object after
deletion and recreation, and a marker inside the directory is replaced with
it. Such a promise needs a witness kept outside the protected root, and a
version constant that claims the guarantee must cover every dependent read and
write boundary, not only the writer.

**The disambiguator must reach every projection** (2026-09-05). Exact-home
retirement made the action pick the right one of two same-named remote
instances, while the roster that decides which row the operator may act on
still joined saved routes by name alone and gave the route to whichever twin
the host listed first. The exact-home retire refused the mismatch, but
routes that still addressed by name reached the other home, and the
name-keyed saved-route store could not even represent two colliding routes.
A guard's scope is the layer it lives in. Once a guard says "same name, not
the same thing", grep the name it disambiguates and check every join, cache
key, store and route keyed on it; fail-closed at the action does not rescue
a wrong offer. The roster now joins by name and home, and a colliding routed
spawn is refused or reported rather than overwriting.

# Related

[Separate operational home from granted work authority](../decisions/home-work-authority.md);
[Live lineage is deliberately bounded](../decisions/bounded-live-lineage.md);
[Integrity, origin and consent are different proofs](../decisions/trust-approval-and-consent-boundaries.md).

# Citations

1. Migrated from agents/cli-dev/soul/knowledge and agents/oats-expert/soul/knowledge @ 7838d3ca (placement-guards-resolve-destination, names-are-not-identity, path-first-resolution-round-trip, symlink-containment-walker-throws, canonical-worktree-verification, adopted-writes-never-follow-a-symlink, captured-session-storage-identity; principle only).
2. Migrated from agents/cli-dev/soul/knowledge/lessons/guard-the-projection-not-just-the-action.md @ 7838d3ca.
