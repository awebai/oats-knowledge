---
type: Decision
title: Terminal tabs are viewers, not session owners
description: Exact-source terminal viewers preserve native interaction without taking ownership of durable sessions or silently switching agents.
tags: [desktop, terminal, viewers, tmux, ownership, integration-limits]
timestamp: 2026-07-25
---
# Rationale

The operator should use the agent's actual terminal, not a reconstructed chat
with a second composer. **One input surface — the agent's own terminal input
line — was accepted as human direction on 2026-07-22**; a separate chat
composer is not to be reintroduced without an explicit new decision. An
in-app inter-agent chat sidebar was likewise explicitly deferred at the
founding decision (2026-07-17): the messaging layer stays the agents' channel,
the app is the human's window. A Desktop tab owns a viewer, not the durable
session.

A stale attach must fail closed rather than prefix-match another agent under
the old label. In local tmux, grouped sessions were rejected because they
share window membership: source death or navigation can reveal a sibling. An
independent exact-source linked-window viewer preserves identity. Restricting
navigation must still preserve usable scrollback, not install an inert key
table.

Resource limits and reuse belong to the process that creates viewers and
PTYs. UI deduplication alone cannot bound reconnects or direct IPC calls.
Rejection should explain recovery rather than silently evicting another
terminal.

Herdr and remote targets need equivalent viewer guarantees through their
supported seams, not copied tmux internals. Closing a viewer, losing its
source or quitting Desktop must not become an operation on a sibling session.
Existing viewers must also survive a replacement of Desktop's own backend
server, because they attach to the session source, not to the server (see
[Workspace admission is privileged and transactional](/nodes/oats-desktop-expert/decisions/privileged-workspace-admission.md)).

# Integration limitations discovered (2026-07-23 … 2026-07-25)

- **tmux `-t` targets prefix-match unless anchored.** With stale roster data
  an unanchored attach can land a viewer — and the operator's keystrokes — in
  a *different* agent's similarly named window instead of failing. Exact
  anchored targets fail loudly. Not every subcommand accepts anchors (viewer
  option setting is the known exception, safe only because Desktop-created
  viewer names are unique and random), and `display-message` does not fail
  closed on a missing target but answers from a default context; reads that
  must fail closed use subcommands that error.
- **Alternate-screen TUIs keep their scrollback in the multiplexer**, so the
  terminal widget cannot compensate for a disabled wheel binding; locking a
  key table means provisioning an explicit allow-list, not pointing at an
  absent table.
- **The terminal widget emits a plain carriage return for Enter regardless of
  Shift** and does not speak the extended keyboard protocols real terminals
  use, so a Shift+Enter newline must be translated locally to the runtime's
  raw-linefeed newline alias — and the whole chord suppressed across every
  key event phase, or the widget's own keypress path still submits.

# Related

[Identity and relationships must stay legible under ambiguity](/nodes/oats-desktop-expert/lessons/identity-and-relationship-legibility.md);
[Keyboard policy follows actions and user intent](/nodes/oats-desktop-expert/lessons/keyboard-focus-and-action-ownership.md);
[Browser-owned state and accessibility under repaint](/nodes/oats-desktop-expert/lessons/browser-owned-state-and-accessibility-under-repaint.md) (copy in a mouse-mode viewer);
[The loopback interface is Desktop's trust boundary](/nodes/oats-desktop-expert/decisions/loopback-trust-boundary-and-transport-simplicity.md).

# Current contracts

- [Current tmux-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/tmux-target.mjs)
- [Current herdr-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/herdr-target.mjs)
- [Current remote-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/remote-target.mjs)

# Citations

1. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/decisions/desktop-terminal-direct-attach.md`; SHA-256 `ae26bdee3ae563983f9fb412cc5d8188c046f0bd4fb81b16e0e052db46e831df`.
2. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/desktop-terminal-link-window-viewer-isolation.md`; SHA-256 `b326aaa14e07fe5b757491bd139c6edcd4403b1fe96ddfd06ad42accb28a2bac`.
3. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/terminal-resource-cap-in-owning-process.md`; SHA-256 `2bb46b9acb64541abf34c1c8c89e2a2a71b6c0c42653d81b813fdd84b1640ad8`.
4. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/decisions/terminal-input-unification.md` (human direction 2026-07-22); SHA-256 `7366c53041aa2dda1b185af6188c9c771cc70feb012f9489996b1c5ceaa7fbb6`.
5. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/references/desktop-panel-decisions.md` (deferred messaging sidebar); SHA-256 `6b36baec26d56de09caf938baa08d4a67edcffea9fb7f6cb016911fcee4b81f6`.
6. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/anchor-tmux-attach-targets.md`; SHA-256 `59133f19a2b556ca7581920229ae92c1810ac6aa4216b6d648b93c498e29d7ff`.
7. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/tmux-anchored-targets-and-display-message-fallback.md`; SHA-256 `77d2f3c0489aa6dfaeeeca8c2c5ed5bd80727edfdee3e886bf4f0a771a558906`.
8. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/provision-locked-key-tables.md`; SHA-256 `5bd6af4bbebe0b06b899682db41e511a6b040721f6271b8374428b3ca3016c0d`.
9. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/shift-enter-newline-via-ctrl-j-alias.md`; SHA-256 `6ad59c64aca1bf130bf09e5ca5abc08b152308e9a1d60e54498bbabe01b39c8e`.
