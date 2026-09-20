---
type: Lesson
title: Keyboard policy follows actions and user intent
description: Focus intent, effective bindings and event ownership must agree without consuming native terminal or control input.
---
# Rationale

Activating a tab and asking to type in its terminal are different intentions. User jumps may focus input; restoration and background activation must not steal it. Structural tab traversal and focus recovery are not merely rebindable application shortcuts.

One effective action policy should govern displayed hints, explicit unbinds, keyboard dispatch and pointer affordances. A fallback keymap that resurrects an unbound action contradicts the user's choice. Terminal policy follows the action across rebindings, but every resolved chord still needs collision review against native control bytes.

Event ownership matters before dispatch: a late no-op after preventDefault still breaks a native control. Application shortcuts must neither consume ordinary typing nor send terminal bytes before claiming a chord. Unit policy checks and real input evidence serve different parts of this boundary.

# Related

[Agent-centered navigation makes the action target legible](/nodes/oats-desktop-expert/decisions/agent-centered-navigation.md); [Terminal tabs are viewers, not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md); [Async completion must still own the user's intent](/nodes/oats-desktop-expert/lessons/asynchronous-intent-and-truthful-outcomes.md).

# Current contracts

- [Current keybindings.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/keybindings.mjs)
- [Current terminal-tab.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/terminal-tab.mjs)

# Citations

1. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/decisions/terminal-focus-intent.md`; SHA-256 `b4ab02022106d89c2c15751019d61f7801e4e7c3341435b9ff6fcf52f6108bb9`.
2. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/keybinding-dispatch-guards-in-engine.md`; SHA-256 `e994558f1a4d654ce7c382dde2a295e61cb6fa18219d66478b5904a8bee7f730`.
3. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/keybindings-terminal-allowlist-by-action-id.md`; SHA-256 `0c585d33e1a4a859a20c20cdff1232ef8e5c2e25fcb3ccc68a0cbb6f9cca0dbe`.
