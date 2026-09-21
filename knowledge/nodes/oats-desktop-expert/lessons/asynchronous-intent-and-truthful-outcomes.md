---
type: Lesson
title: Async completion must still own the user's intent
description: Background work must preserve drafts and distinguish creation, visibility, readiness and task success without targeting replacement context.
tags: [desktop, async, intent, mutations, truthfulness]
timestamp: 2026-07-26
---
# Rationale

Learned 2026-07-24 to 2026-07-27 by the Desktop engineering and UX design
roles, from four defects in the first Spawn and Quick Open flows: a
periodic roster repaint rebuilt an open spawn form and submitted an empty
task; a consumed-once spawn preselect was cleared before the data it
applied to had loaded; a stale request's late rejection painted its error
over a newer selection because only the success path was guarded; and a
post-spawn terminal handoff fired on roster presence before the session was
attachable, surfacing as a blocking alert over a modal that looked stuck.

User state exists before any request: an open form, focus or text selection can be lost by a routine repaint even when nothing is in flight. Protect that state rather than equating idle networking with permission to rebuild the UI.

Loaded data is not necessarily current data. A current workspace generation also does not prove the original consumer remains mounted or that the same action still owns completion. Stale errors and cleanup can corrupt a newer result just as stale successes can. Independently superseding request classes need distinct ownership.

Creation, roster presence, attachment readiness and task completion are separate observations. Automated handoffs should fail quietly with a truthful recovery path, never target a replacement context.

Ignoring a stale response does not undo its mutation. Reconcile partial successes before retrying so a timeout or dismissed view does not create duplicate actions. A generation guard cannot substitute for transactional ownership of effects.

# Related

[Identity and relationships must stay legible under ambiguity](/nodes/oats-desktop-expert/lessons/identity-and-relationship-legibility.md); [Keyboard policy follows actions and user intent](/nodes/oats-desktop-expert/lessons/keyboard-focus-and-action-ownership.md); [Workspace admission is privileged and transactional](/nodes/oats-desktop-expert/decisions/privileged-workspace-admission.md); [Browser-owned state and accessibility under repaint](/nodes/oats-desktop-expert/lessons/browser-owned-state-and-accessibility-under-repaint.md) (the repaint-barrier rules in detail).

# Current contracts

- [Current open-intent.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/open-intent.mjs)

# Citations

1. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/pending-intent-data-currency.md`; SHA-256 `f275cdfb63b53932f12b4850771c3f3f7a1077ef1ef04f90545a04621ca4c108`.
2. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/guard-both-completion-paths.md`; SHA-256 `75e0af59ab712e81776b94bb1e26a5746a1def0ceb68c8efd51f3060229f6209`.
3. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/poll-repaint-wipes-form-input.md`; SHA-256 `ac3d8c3c564ca39f3f64dac68e136ce60609e6490d19f07aea2925b9001ab3f0`.
4. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/post-spawn-roster-snapshot-lag.md`; SHA-256 `664803bec243aa9fd70da6bb97f3dab9c314215a9d1da762e4625bfcc214cb61`.
5. OATS rationale source `agents/ux-designer/soul/knowledge/lessons/latest-intent-and-mutation-ownership.md`; SHA-256 `e368f2e2d53acbfd3378d88763f2052f4fe19a716d76c181addc7eff3aad7063`.
