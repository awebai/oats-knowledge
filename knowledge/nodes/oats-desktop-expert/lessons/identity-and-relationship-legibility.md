---
type: Lesson
title: Identity and relationships must stay legible under ambiguity
description: Qualified identity and full-roster ambiguity checks preserve agents without inventing relationships from filtered views.
---
# Rationale

A display name is not a globally unique agent. Even a canonical local home needs host qualification when remote instances enter the same view. Keep the identity used by actions distinct from the convenient label shown to the operator.

Resolve relationship ambiguity over the full relevant roster before filtering or grouping. A globally ambiguous name can look unique inside a cluster, resurrecting an edge that was correctly refused earlier. Showing disconnected nodes is safer than hiding an agent or manufacturing lineage.

Stable deterministic layout preserves recognition across refreshes; force-directed movement obscures that continuity. Anonymous grouping need not erase internal identity, and visible parent/sibling distinctions must not rely on color alone. These are legibility requirements, not a new user-named team entity or a promise to repair the kernel's bounded live graph.

# Related

[Agent-centered navigation makes the action target legible](/nodes/oats-desktop-expert/decisions/agent-centered-navigation.md); [Terminal tabs are viewers, not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md); [Live lineage is deliberately bounded](/nodes/oats-kernel-expert/decisions/bounded-live-lineage.md).

# Current contracts

- [Current instance-tree.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/instance-tree.mjs)

# Citations

1. OATS rationale source `agents/ux-designer/soul/knowledge/lessons/team-roster-identity-resolution-scope.md`; SHA-256 `a81cd389177b035cfcbd9df77bd25bae93c68adb9892273efa3b8d581e55d96f`.
2. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/cluster-composite-identity.md`; SHA-256 `432064b1abd504436825657de0d4a0e85baea65f3651a7c84f19a7e928e1168f`.
3. OATS rationale source `agents/ux-designer/soul/knowledge/decisions/interactive-agent-hierarchy-design.md`; SHA-256 `9c99bf9509e839e179b7553597c3203ead682413a78ef7d6a5edf9f767bd3b4c`.
