---
type: Decision
title: Workspace admission is privileged and transactional
description: Validated suggestions or a privileged picker admit workspaces only after identity, readiness and rollback authority are established.
tags: [desktop, security, workspaces, privileged-process, transactions]
timestamp: 2026-07-24
---
# Rationale

Decided 2026-07-24. Renderer choices are not arbitrary filesystem or process
authority. The renderer never scans the filesystem; suggestions come from
bounded, validated sources — known roots, siblings of already-known
deployment roots, and recents revalidated on use. A native directory picker
is an explicit privileged admission path, not a reason to trust every
renderer-supplied path. Recents remain input to revalidate, not
authorization.

A responding server may belong to another workspace or an incompatible
application. Never kill or extend a foreign server merely because it occupies
a convenient port. Commit workspace, recents and trust only after the
intended owner and readiness are established; rollback must restore trust as
well as process state. Existing terminal viewers survive the replacement of
Desktop's own server because they attach to the session source, not to the
server ([Terminal tabs are viewers, not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md)).

Discovery, native picker and non-dismissible mutation have different
lifetimes. A picker can cover discovery without invalidating it, while an
effect already in progress may still succeed after a view disappears.
Preserve focus and reconcile that result rather than hiding uncertainty
behind a stale-response guard.

# Admitted roots are canonicalised once and held immutable

Discovered 2026-07-24: re-resolving an admitted root at use time is a
time-of-check/time-of-use hole. A directory swapped for a symlink between
admission and use makes the requested file and the "admitted" root both
resolve into the attacker's target, so containment holds vacuously and the
outside file is served. Roots are canonicalised exactly once at admission and
carried as immutable strings; only the requested path is resolved at use
time; containment is exact-root or root-plus-separator so a sibling with a
shared prefix cannot match. A candidate root whose unresolved path comes from
opened-workspace content is itself validated (a real directory, not a
symlink, under the expected canonical parent) before it is admitted — an
untrusted workspace must not be able to nominate a secret directory as a
viewer root. String normalisation alone closes none of these. This is a
Desktop finding from the file-serving review; the kernel's spawn-placement and
lock-hardening reviews of 2026-07-24 → 2026-07-29 reached the same
canonicalise-once / compare-resolved-objects rule independently
([identity and location belong to the resolved object](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md)).

# Related

[Identity and relationships must stay legible under ambiguity](/nodes/oats-desktop-expert/lessons/identity-and-relationship-legibility.md);
[Async completion must still own the user's intent](/nodes/oats-desktop-expert/lessons/asynchronous-intent-and-truthful-outcomes.md);
[The loopback interface is Desktop's trust boundary](/nodes/oats-desktop-expert/decisions/loopback-trust-boundary-and-transport-simplicity.md);
[Verification judgment for Desktop's privileged surfaces](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md).

# Current contracts

- [Current workspace-registry.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/workspace-registry.mjs)

# Citations

1. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/decisions/desktop-workspace-add-privileged-contract.md`; SHA-256 `8e0e6d49d36ebee93f2a9cceafa258826cb7dd084d6d54eab5d54e9c719a133e`.
2. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/privileged-state-transitions-transactions.md`; SHA-256 `ff439d1a14000d4051bbfaae43926ed31398ac981ee7dc9b0677f485b928197b`.
3. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/server-reuse-identity-probe.md`; SHA-256 `58946af75d69955a241c39b211cde38fcd5a456f3cb71af1d55d66153a6e0407`.
4. OATS rationale source `agents/ux-designer/soul/knowledge/lessons/latest-intent-and-mutation-ownership.md`; SHA-256 `e368f2e2d53acbfd3378d88763f2052f4fe19a716d76c181addc7eff3aad7063`.
5. OATS rationale source `agents/ux-designer/soul/knowledge/decisions/workspace-manager-privileged-boundary.md`; SHA-256 `ad3d03876caa66ababd5796ca8f06844d3f48d8ebf8c768f1e88cab48d713ecd`.
6. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/file-endpoint-realpath-guard.md`; SHA-256 `b210b45e5bc384a1e415c844669b560ab9e12fe95dda8c4de13bd6e50a36d0d4`.
