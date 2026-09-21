---
type: Decision
title: Agent-centered navigation makes the action target legible
description: A stable roster and one authoritative inspection flow keep artifacts contextual and launch intent explicit.
tags: [desktop, navigation, information-architecture, workspaces]
timestamp: 2026-09-20
---
# Rationale

The enduring navigation question is "which agent am I acting on?" A stable
roster answers it before a terminal, brain or file becomes the focus.
Artifacts supply context; they should not multiply into coequal product
domains or nested facet chrome. Two rules follow (decided 2026-07-24): an
artifact tab is scoped to the workspace that created it, so same-named
instances in different workspaces never share a tab; and when the last
artifact tab closes, navigation returns to the stage the operator came from
rather than leaving an empty artifact area.

The older Quick Open donor usefully rejected a second spawn form, but its
selection-opens-spawn behavior is **superseded (2026-09-07)**. The current
accepted interaction makes selection, Enter and Quick Open inspect a soul;
Launch and Schedule are explicit actions. Preserve one authoritative flow
without treating browsing as permission to start work.

A redundant Instances destination once made a feature reachable while
contradicting the requested product shape. Prefer coherent reuse of the
existing roster to adding an overview merely to satisfy a technical
reachability finding.

# Workspace switching is team-boundary navigation

The workspace switcher is a **deployment switcher, not a repository filter**
(decided 2026-07-22): within one workspace the roster already groups by
repository, and the switcher moves between team boundaries. It appears only
when more than one workspace is watched, so a single-workspace setup carries
no extra chrome. This is the product side of the founder's 2026-07-26 intent
that Desktop gives **one operator view across the repositories of one
workspace**, with explicit instance relations making clusters visible without
collapsing repository ownership. The *shape* of that boundary changed on
2026-09-20 — from a non-Git directory scope to a Git-hosted workspace
definition with revision-pinned membership (see
[official development dogfoods the workspace](/nodes/oats-expert/decisions/official-development-dogfoods-the-workspace.md))
— but the Desktop consequence is unchanged: the switcher moves between
workspaces, whatever defines them, and never between repositories inside one.

# Related

[Identity and relationships must stay legible under ambiguity](/nodes/oats-desktop-expert/lessons/identity-and-relationship-legibility.md);
[Keyboard policy follows actions and user intent](/nodes/oats-desktop-expert/lessons/keyboard-focus-and-action-ownership.md);
[One standalone Desktop product, no hidden operational kernel](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md);
[Editor groups own layout and close succession](/nodes/oats-desktop-expert/decisions/editor-group-layout-ownership.md).

# Current contracts

- [Current 2026-09-07-desktop-souls-capabilities.md](https://github.com/awebai/oats/blob/main/docs/design/2026-09-07-desktop-souls-capabilities.md)

# Citations

1. OATS rationale source `agents/ux-designer/soul/knowledge/decisions/agent-centered-desktop-information-architecture.md`; SHA-256 `5eedb94ec9346ff91b095ee95070bff5a0d806e2c9995b2c6faf12c51a859eb7`.
2. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/decisions/quick-open-spawn-preselect-handoff.md`; SHA-256 `629507f6b28a4dbed1957ada44e45892637a8a221c8a139f66882b8f08a36d76`.
3. OATS rationale source `agents/dev-coordinator/soul/knowledge/lessons/review-fix-scope-overreach.md`; SHA-256 `bc7f6d8e6c5b9aa464dda0bf3784391b7dc99b086deaa6132689d6f5c74004c2`.
4. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/architecture/multi-workspace-switcher.md` (mental-model paragraph only); SHA-256 `af832da02c1dda4990906973072e049c0240dbd88801639a54877494c8d55bbe`.
5. Founder-accepted direction 2026-07-26, "Desktop as the workspace view", carried in [Official OATS development runs on the architecture it offers adopters](/nodes/oats-expert/decisions/official-development-dogfoods-the-workspace.md), which records the 2026-09-20 re-shaping of the boundary.
