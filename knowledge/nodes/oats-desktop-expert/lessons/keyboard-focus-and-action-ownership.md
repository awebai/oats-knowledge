---
type: Lesson
title: Keyboard policy follows actions and user intent
description: Focus intent, effective bindings and event ownership must agree without consuming native terminal or control input.
tags: [desktop, keyboard, focus, keybindings, terminal]
timestamp: 2026-07-26
---
# Rationale

Learned 2026-07-25 to 2026-07-26 by the Desktop engineering role, from
three defects found in review of the first keybinding engine and terminal
tabs: tab restoration and close-fallback stole input focus from wherever
the operator was typing; an allowlisted sidebar toggle would have resolved,
on non-mac platforms, to the chord that is the tmux prefix inside the
terminal; and chords claimed at the window level were reaching the pty
first because the terminal wrote the control byte before the application
saw the event.

Activating a tab and asking to type in its terminal are different intentions. User jumps may focus input; restoration and background activation must not steal it. Structural tab traversal and focus recovery are not merely rebindable application shortcuts.

One effective action policy should govern displayed hints, explicit unbinds, keyboard dispatch and pointer affordances. A fallback keymap that resurrects an unbound action contradicts the user's choice. Terminal policy follows the action across rebindings, but every resolved chord still needs collision review against native control bytes.

Event ownership matters before dispatch: a late no-op after preventDefault still breaks a native control. Application shortcuts must neither consume ordinary typing nor send terminal bytes before claiming a chord. Unit policy checks and real input evidence serve different parts of this boundary.

Integration limitation (2026-07-26): `KeyboardEvent.key` reports the shifted character, so a default chord such as Mod+Shift+\ parses and round-trips yet never fires unless the engine aliases the shifted character (`|`) to its base key. Every default built on shifted punctuation needs that alias and a test that dispatches the real shifted event, not a parse round-trip.

# Related

[Agent-centered navigation makes the action target legible](../decisions/agent-centered-navigation.md); [Terminal tabs are viewers, not session owners](../decisions/terminal-viewers-not-session-owners.md); [Async completion must still own the user's intent](asynchronous-intent-and-truthful-outcomes.md); [Browser-owned state and accessibility under repaint](browser-owned-state-and-accessibility-under-repaint.md).

# Current contracts

- [Current keybindings.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/keybindings.mjs)
- [Current terminal-tab.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/terminal-tab.mjs)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge @ 7838d3ca.
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/shifted-punctuation-default-chords.md @ 7838d3ca.
