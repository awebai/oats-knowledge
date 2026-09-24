---
type: Lesson
title: Settings reach hooks as a payload, and the brief tells the agent where they are — an advisory hook writes the brief and persists meta without calling the service
description: A capability's settings arrive at its hooks as one JSON payload; the spawn hook turns them into a one-line brief the agent reads and persists what retire will need as meta, and the skill tells the agent to find those facts in the brief or the instance record and to stop when they are unset; an advisory hook never contacts the external service.
tags: [lesson, integrations, hooks, settings, brief, meta, advisory]
timestamp: 2026-07-10
---

Formed 2026-07-10 by the integrations expert for a tasks integration whose
target site and project vary per deployment; restated 2026-09-24 under the
workspace model, where the payload is merged from several layers.

# Rule

- The kernel hands a capability its merged settings as one JSON payload; the
  hook reads its own keys from it and nothing else.
- The spawn hook writes **one brief line** into the instance's task file
  naming the facts the agent must know (which site, which project, which
  identity it acts as), and persists in **meta** what a later event needs
  (identifiers to retire, locators to reuse).
- The capability's skill tells the agent to find those facts in the brief
  first, then in the instance record, then to ask a human, and to **stop**
  rather than guess when they are unset.
- An **advisory** hook (one that only briefs) makes no call to the external
  service and emits a warning, not a failure, for incomplete settings; a
  **required** hook (one whose failure would leave the instance believing it
  has something it lacks) fails the spawn.

# Why

Agents act on what they can read. A setting that reached the hook but not the
brief is invisible to the agent; a setting the agent guesses is a wrong call
against a real service. Separating advisory from required hooks keeps
spawns cheap where nothing external is created and honest where something
is: a messaging identity that was never minted must fail the spawn, a
tracker whose project is unset must only warn.

# Consequences

- Under the workspace model the payload is merged from workspace, team, soul,
  host and spawn layers; the hook still reads one map, and the brief is the
  agent's view of the result.
- Retire hooks exist only when there is external state to undo; a roster
  retirement that is a skill-level protocol is not a hook.

# Citations

- Legacy `agents/integrations-expert/soul/knowledge/decisions/oats-jira-settings-contract.md` (2026-07-10); the tracker-specific keys are the package expert's.
