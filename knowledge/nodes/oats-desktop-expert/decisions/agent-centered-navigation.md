---
type: Decision
title: Agent-centered navigation makes the action target legible
description: A stable roster and one authoritative inspection flow keep artifacts contextual and launch intent explicit.
tags: [desktop, navigation, information-architecture, workspaces]
timestamp: 2026-10-14
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

The older Quick Open design usefully rejected a second spawn form, but its
selection-opens-spawn behavior is **superseded (2026-09-07)**. The current
accepted interaction makes selection, Enter and Quick Open inspect a soul;
Launch and Schedule are explicit actions. Preserve one authoritative flow
without treating browsing as permission to start work.

A redundant Instances destination once made a feature reachable while
contradicting the requested product shape. Prefer coherent reuse of the
existing roster to adding an overview merely to satisfy a technical
reachability finding.

# Recency belongs in the instance palette, not the roster

The source expert's 2026-10-14 refinement keeps the roster stable while
making return to the previous agent fast. The instance palette orders a
Recent group by last focus, newest first, followed by never-focused instances
in tree order. If the first recent entry is the active tab, the initial
selection is the second recent entry when one exists: opening the palette
and pressing Enter returns to the previous agent rather than selecting the
current one again. This instance-switching choice does not supersede the
soul-inspection and explicit-launch flow above.

Reject reordering the sidebar roster by recency. It would make fast keyboard
switching compete with the spatial memory that makes the roster useful.
Selecting a tab instead reveals its roster row with only the necessary scroll,
without moving input focus. The palette answers "where was I just working?";
the stable roster still answers "which agent is this?".

Recency is bounded, per-machine UI state, persisted in localStorage and
scoped per workspace so it survives restart without leaking navigation
history between workspaces. It is never deployment state and is not written
to a deployment. This keeps one operator's navigation preference from becoming
an operational fact for other clients. The cap's exact value belongs in the
implementation, not a competing knowledge specification.

# Workspace switching moves between deployments

The workspace switcher is a **deployment switcher, not a repository filter**
(decided 2026-07-22): within one deployment the roster already groups by
repository, and the switcher moves between deployments. It appears only when
more than one workspace is watched, so a single-workspace setup carries no
extra chrome. This is the product side of the founder's 2026-07-26 intent that
Desktop gives **one operator view across the repositories of one workspace**,
with explicit instance relations making clusters visible without collapsing
repository ownership. What defines a workspace has since changed (a Git-hosted
workspace definition, and since Phase F a deployment directory whose facts come
only from the kernel); the consequence has not: the switcher never moves
between repositories inside one workspace.

# Related

[Identity and relationships must stay legible under ambiguity](../lessons/identity-and-relationship-legibility.md);
[Keyboard policy follows actions and user intent](../lessons/keyboard-focus-and-action-ownership.md);
[One standalone Desktop product, no hidden operational kernel](standalone-product-and-cli-authority.md);
[Editor groups own layout and close succession](editor-group-layout-ownership.md);
[Closed panels return their space to the main area](closed-panels-return-main-area-space.md).

# Current contracts

- [Current desktop.md](https://github.com/awebai/oats/blob/main/docs/desktop.md)
- [Souls and capabilities in Desktop (superseded record)](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-07-desktop-souls-capabilities.md)

# Citations

1. Migrated from agents/ux-designer/soul/knowledge, agents/oats-desktop-engineer/soul/knowledge and agents/dev-coordinator/soul/knowledge @ 7838d3ca.
2. Founder-accepted direction 2026-07-26, "Desktop as the workspace view", carried in [Official OATS development runs on the architecture it offers adopters](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md).

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-linux-shell, 2026-10-14. The source identifies [awebai/oats#1158](https://github.com/awebai/oats/pull/1158) (`938837d0`) and [#1179](https://github.com/awebai/oats/pull/1179) (`b1e0ee0c`) for palette recency and roster reveal. These are source-reported implementation references, not independently audited shipment or human-acceptance receipts.
