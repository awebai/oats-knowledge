---
type: Decision
title: Terminal tabs are viewers, not session owners
description: Exact-source terminal viewers preserve native interaction without taking ownership of durable sessions or silently switching agents.
---
# Rationale

The operator should use the agent's actual terminal, not a reconstructed chat with a second composer. A Desktop tab owns a viewer, not the durable session.

A stale attach must fail closed rather than prefix-match another agent under the old label. In local tmux, grouped sessions were rejected because they share window membership: source death or navigation can reveal a sibling. An independent exact-source linked-window viewer preserves identity. Restricting navigation must still preserve usable scrollback, not install an inert key table.

Resource limits and reuse belong to the process that creates viewers and PTYs. UI deduplication alone cannot bound reconnects or direct IPC calls. Rejection should explain recovery rather than silently evicting another terminal.

Herdr and remote targets need equivalent viewer guarantees through their supported seams, not copied tmux internals. Closing a viewer, losing its source or quitting Desktop must not become an operation on a sibling session.

# Related

[Identity and relationships must stay legible under ambiguity](/nodes/oats-desktop-expert/lessons/identity-and-relationship-legibility.md); [Keyboard policy follows actions and user intent](/nodes/oats-desktop-expert/lessons/keyboard-focus-and-action-ownership.md).

# Current contracts

- [Current tmux-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/tmux-target.mjs)
- [Current herdr-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/herdr-target.mjs)
- [Current remote-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/remote-target.mjs)

# Citations

1. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/decisions/desktop-terminal-direct-attach.md`; SHA-256 `ae26bdee3ae563983f9fb412cc5d8188c046f0bd4fb81b16e0e052db46e831df`.
2. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/desktop-terminal-link-window-viewer-isolation.md`; SHA-256 `b326aaa14e07fe5b757491bd139c6edcd4403b1fe96ddfd06ad42accb28a2bac`.
3. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/terminal-resource-cap-in-owning-process.md`; SHA-256 `2bb46b9acb64541abf34c1c8c89e2a2a71b6c0c42653d81b813fdd84b1640ad8`.
