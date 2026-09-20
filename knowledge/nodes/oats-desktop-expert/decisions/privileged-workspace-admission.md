---
type: Decision
title: Workspace admission is privileged and transactional
description: Validated suggestions or a privileged picker admit workspaces only after identity, readiness and rollback authority are established.
---
# Rationale

Renderer choices are not arbitrary filesystem or process authority. Bound suggestions to validated provenance; a native directory picker is an explicit privileged admission path, not a reason to trust every renderer-supplied path. Recents remain input to revalidate, not authorization.

A responding server may belong to another workspace or an incompatible application. Never kill or extend a foreign server merely because it occupies a convenient port. Commit workspace, recents and trust only after the intended owner and readiness are established; rollback must restore trust as well as process state.

Discovery, native picker and non-dismissible mutation have different lifetimes. A picker can cover discovery without invalidating it, while an effect already in progress may still succeed after a view disappears. Preserve focus and reconcile that result rather than hiding uncertainty behind a stale-response guard.

# Related

[Identity and relationships must stay legible under ambiguity](/nodes/oats-desktop-expert/lessons/identity-and-relationship-legibility.md); [Async completion must still own the user's intent](/nodes/oats-desktop-expert/lessons/asynchronous-intent-and-truthful-outcomes.md).

# Current contracts

- [Current workspace-registry.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/workspace-registry.mjs)

# Citations

1. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/decisions/desktop-workspace-add-privileged-contract.md`; SHA-256 `8e0e6d49d36ebee93f2a9cceafa258826cb7dd084d6d54eab5d54e9c719a133e`.
2. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/privileged-state-transitions-transactions.md`; SHA-256 `ff439d1a14000d4051bbfaae43926ed31398ac981ee7dc9b0677f485b928197b`.
3. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/server-reuse-identity-probe.md`; SHA-256 `58946af75d69955a241c39b211cde38fcd5a456f3cb71af1d55d66153a6e0407`.
4. OATS rationale source `agents/ux-designer/soul/knowledge/lessons/latest-intent-and-mutation-ownership.md`; SHA-256 `e368f2e2d53acbfd3378d88763f2052f4fe19a716d76c181addc7eff3aad7063`.
