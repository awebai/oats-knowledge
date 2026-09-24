---
type: Lesson
title: Prefer a narrow integration-owned wrapper over a third-party CLI — expose only the operations agents need, keep secrets in the environment, surface missing authentication early
description: When an external service's official CLI covers too little and third-party CLIs have unstable contracts, a tasks or messaging integration owns a small JSON-first wrapper over the service's API; credentials come from the environment, never from committed settings, and a missing credential is surfaced by an advisory spawn-hook warning plus an actionable failure of the wrapper's own auth command.
tags: [lesson, integrations, wrappers, cli, secrets, authentication, tasks]
timestamp: 2026-07-10
---

Decided 2026-07-10 by the integrations expert for a tracker integration; the
reasoning generalises to any integration whose service has a usable API and
an inadequate command line.

# Rule

- **Own the surface.** Build a small command wrapper over the service's
  official API that exposes only the operations agents need and returns
  stable JSON. Do not depend on a third-party CLI's contract, and do not pull
  in a large SDK for a handful of calls when the platform's own HTTP client
  suffices.
- **Secrets live in the environment.** A personal API credential is read from
  an environment variable and never written into committed settings.
- **Surface a missing credential without blocking the spawn.** The kernel's
  requirement rows describe commands, not environment variables, so a spawn
  hook emits an advisory warning when the credential is absent and the
  wrapper's own auth command fails with an actionable message; the agent is
  told to stop and ask, not to guess.

# Why

A service's official CLI is written for humans and often covers a fraction of
the API; third-party CLIs cover more with contracts that change under you. A
wrapper the integration owns is versioned with the integration, tested
against the API, and narrow enough to review. Keeping credentials out of
committed settings is the same rule as any host-owned fact
([place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md)).

# Consequences

- Package experts for tracker integrations own the wrapper's command
  vocabulary; this node owns the pattern.
- A review of an integration checks that no credential can reach a committed
  file through its settings.

# Citations

- Legacy `agents/integrations-expert/soul/knowledge/decisions/linear-task-interface-selection.md` (2026-07-10); the tracker-specific facts are the package expert's.
