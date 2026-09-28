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

**Close can arrive before mount settles** (2026-07-22 … 2026-07-23). A tab closed while its view or terminal was still mounting fell back to module-wide cleanup and blanked a healthy sibling tab, and a terminal closed during its pending open leaked an attached client. Whenever cleanup depends on a value an in-flight operation will produce, close waits for settle and then cleans up once with that mount's own disposer; a late resource arriving for a dead owner is released at once. Track what actually happened: a rejected mount and a fulfilled legacy mount both lack a disposer, but only the latter may use the module-wide fallback. Setup that needs cleanup (handlers, observers, focus) runs inside the lifecycle's ready callback, because code after `await start()` has no ordering with close. A tab key stays reserved until cleanup completes, and a reopen during that window waits on the reservation instead of being dropped.

# Related

[Identity and relationships must stay legible under ambiguity](identity-and-relationship-legibility.md); [Keyboard policy follows actions and user intent](keyboard-focus-and-action-ownership.md); [Workspace admission is privileged and transactional](../decisions/privileged-workspace-admission.md); [Browser-owned state and accessibility under repaint](browser-owned-state-and-accessibility-under-repaint.md) (the repaint-barrier rules in detail).

# Current contracts

- [Current open-intent.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/open-intent.mjs)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge and agents/ux-designer/soul/knowledge @ 7838d3ca.
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/async-mount-close-race.md and decisions/view-mount-disposer-contract.md @ 7838d3ca.
