---
type: Decision
title: Terminal tabs are viewers, not session owners
description: Exact-source terminal viewers preserve native interaction without taking ownership of durable sessions or silently switching agents.
tags: [desktop, terminal, viewers, tmux, ownership, integration-limits]
timestamp: 2026-10-08
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
[Workspace admission is privileged and transactional](privileged-workspace-admission.md)).

# Keep a bound on remote reconnect fan-out

On 2026-10-08, keeping the open-terminal count limit (`MAX_TERMINALS`) was
accepted by oats-maintainer-pepe, as recorded in the source's note. Removing
it because reuse by target already protects local opens was rejected: reuse,
leases and source preflight do not bound the reconnect storm when many remote
tabs lose one link and retry on the same backoff. Each retry runs
`oats session inspect --server`, involving Node and SSH. At that decision,
the count was the only bound on that fan-out.

**Removal first requires a bound on reconnect attempts in flight.** That is
a new mechanism, not deletion of a redundant constant. This applies the
creating-process resource rule above rather than granting the UI ownership
of sessions.

The retained limit was 200, raised from 20 at Pepe's request on 2026-10-04.
Twenty was a choice, not a measured resource threshold. The cited Linux,
tmux 3.7 measurements found about 24 MB in tmux for 200 viewers plus about
5 MB per client, with no idle CPU reported. Those scoped measurements
supported retaining the higher allowance; they are not a cross-platform
capacity guarantee or a substitute for bounding concurrent reconnect work.

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
- **A newline sent as keys is an Enter press** (2026-07-22). Multi-line text
  delivered with `send-keys` submits, or lets a shell execute, line by line.
  Pastes and any whole-text payload go through a multiplexer buffer as one
  bracketed paste (`load-buffer`, then `paste-buffer -p`); only ordinary
  keydown bytes use `send-keys`.

# Related

[Identity and relationships must stay legible under ambiguity](../lessons/identity-and-relationship-legibility.md);
[Keyboard policy follows actions and user intent](../lessons/keyboard-focus-and-action-ownership.md);
[Browser-owned state and accessibility under repaint](../lessons/browser-owned-state-and-accessibility-under-repaint.md) (copy in a mouse-mode viewer);
[The loopback interface is Desktop's trust boundary](loopback-trust-boundary-and-transport-simplicity.md).

# Current contracts

- [Current tmux-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/tmux-target.mjs)
- [Current herdr-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/herdr-target.mjs)
- [Current remote-target.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/remote-target.mjs)
- [Current terminal-owner-leases.md](https://github.com/awebai/oats/blob/main/packages/desktop/docs/terminal-owner-leases.md)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge @ 7838d3ca.
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/multiline-send-bracketed-paste.md @ 7838d3ca.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-backlog, 2026-10-08; notes/628-terminal-count-stays.md. The source records the acceptance and measurements associated with [awebai/oats#628](https://github.com/awebai/oats/issues/628); this harvest did not independently reproduce them.
