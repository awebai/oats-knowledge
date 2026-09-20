---
type: Decision
title: Editor groups own layout and close succession
description: Persistent groups preserve ordered work and focus better than temporary per-tab split slots or unrelated global recency.
---
# Rationale

The rejected split model attached a temporary arrangement to a tab, so changing tabs could dissolve the layout. Persistent groups instead own ordered work and an active member. New work follows the focused group; the first split preserves existing current-workspace terminal tabs and intentionally focuses the new empty group.

Closing work should select a neighboring group member rather than an unrelated recent terminal. One real semantic tab control per item, with per-group navigation, avoids duplicated or phantom chrome and preserves accessibility.

Group ownership within a layout does not by itself decide restoration across workspace switches. Treat cross-workspace restoration as a separate product decision, and verify version-specific behavior in the maintained Desktop contract.

# Related

[Agent-centered navigation makes the action target legible](/nodes/oats-desktop-expert/decisions/agent-centered-navigation.md); [Keyboard policy follows actions and user intent](/nodes/oats-desktop-expert/lessons/keyboard-focus-and-action-ownership.md).

# Current contracts

- [Current split-layout.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/split-layout.mjs)
- [Current shell.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/shell.mjs)

# Citations

1. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/editor-group-split-model.md`; SHA-256 `b726d45da320a99fbc3e4ea3ec6ba66ffdf4c5f4812dab56124ba9cf96630ffd`.
