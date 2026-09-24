---
type: Lesson
title: A lifecycle hook never trusts the ambient environment — hooks inherit the operator's process, and the operator can be another instance
description: Spawn, launch and retire hooks run with the invoking process's environment; a hook that reads a locator, credential home or team from that environment can act for the wrong principal when the invoker is itself an instance, so every such input comes from the hook's own payload, its persisted meta or the instance home.
tags: [lesson, integrations, hooks, environment, locator, custody, launch]
timestamp: 2026-09-24
---

Learned 2026-09-24 in the review of a messaging provider's launch hook by the
node's owner; the defect existed in two shapes in the same week.

# Rule

- **Inputs a hook acts on come from three places only**: the payload the
  kernel hands it, the meta it persisted at an earlier event, and the
  instance home it owns. Never from the ambient environment.
- **Strip the environment the hook's own tool would misread.** When the hook
  runs a CLI that resolves its identity from an environment variable, remove
  that variable from the child process, because the hook may be running
  inside a session that has it set for a different principal.
- **Record locators in meta at the event that creates them** (a credential
  directory, a grant identifier, a socket path) and read them back from meta
  at launch and retire, so a restart uses what this instance owns.

# Why

The kernel runs lifecycle hooks with the invoking process's environment, and
the invoker is often not a human shell: a coordinator instance restarting a
child runs the child's launch hook from inside its own environment. A launch
hook that read the identity-home variable to find "the current grant" would
hand the child its parent's credential, or, with renewal on, revoke the
parent's grant as the child's superseded one. The same mechanism made a mint
fail in the other direction: the CLI refused an inherited identity-home
variable as an external home, and the hook had passed it on without knowing.

# What goes wrong

- A child launched from a served instance acts as its parent; the roster
  shows two instances on one grant and nothing complains.
- A renewal revokes the wrong grant; the live one expires at its TTL while
  the instance reports healthy until then.
- A tool refuses a command because the hook forwarded an environment it
  never meant to set.

# Consequences

- Tests set a foreign value in the hook's environment and assert the hook
  emits its own locator and touches nothing foreign.
- The kernel persists launch-hook meta for exactly this reason; a provider
  that renews credentials relies on that persistence
  ([the served identity is a messaging-layer fact](/nodes/oats-expert/decisions/served-identity-is-a-messaging-layer-fact.md)).

# Citations

- Maintainer review of the 1.13 messaging provider (oats PR #110, round 1,
  2026-09-24), and round 3 of the 1.12 provider (oats PR #107), where the
  environment was stripped from the child process.
