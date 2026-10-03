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

The older Quick Open design usefully rejected a second spawn form, but its
selection-opens-spawn behavior is **superseded (2026-09-07)**. The current
accepted interaction makes selection, Enter and Quick Open inspect a soul;
Launch and Schedule are explicit actions. Preserve one authoritative flow
without treating browsing as permission to start work.

A redundant Instances destination once made a feature reachable while
contradicting the requested product shape. Prefer coherent reuse of the
existing roster to adding an overview merely to satisfy a technical
reachability finding.

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
[Editor groups own layout and close succession](editor-group-layout-ownership.md).

# Current contracts

- [Current desktop.md](https://github.com/awebai/oats/blob/main/docs/desktop.md)
- [Souls and capabilities in Desktop (superseded record)](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-07-desktop-souls-capabilities.md)

# Citations

1. Migrated from agents/ux-designer/soul/knowledge, agents/oats-desktop-engineer/soul/knowledge and agents/dev-coordinator/soul/knowledge @ 7838d3ca.
2. Founder-accepted direction 2026-07-26, "Desktop as the workspace view", carried in [Official OATS development runs on the architecture it offers adopters](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md).
