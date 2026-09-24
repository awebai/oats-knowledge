---
type: Lesson
title: Task integrations document a support matrix — which operations the integration exposes, which are human-only, and where durable information lives
description: A command list is not documentation for a tasks integration; users and agents need an operating model that says what belongs in each tracker object, which operations are supported by command, which are UI-only, and that unavailable operations escalate rather than improvise.
tags: [lesson, integrations, tasks, documentation, support-matrix, guardrails]
timestamp: 2026-07-10
---

Learned 2026-07-10 by the integrations expert while documenting a tasks
integration for a tracker with projects, documents, issues, sub-issues,
comments and relations.

# Rule

Document four things explicitly, in the integration's own guide, with the
operational subset repeated in the agent skill:

1. Exact command recipes for the common relationships (list a project's
   issues; create an issue or sub-issue in a project).
2. Where durable information lives: project documents explain the work,
   issues execute it, comments record events, messaging carries conversation.
3. A support matrix separating command-supported, human-or-UI-only, and
   not-yet-supported operations.
4. Guardrails: an unavailable operation causes an escalation to a human,
   never an invented API call or a guessed flag.

# Why

Agents fill gaps in documentation by inference, and a tracker's object model
invites inference: if issues have comments, surely documents do; if the CLI
creates issues, surely it edits them. Each wrong inference is a failed call
at best and a fabricated record at worst. The matrix makes the boundary of
the integration a fact the agent can read.

# Consequences

- The central integrations guide summarises and links each tasks
  integration's boundary rather than restating it.
- Reviewing a tasks integration includes checking that its skill tells the
  agent what to do when an operation is not in the matrix.

# Citations

- Legacy `agents/integrations-expert/soul/knowledge/lessons/tracker-integration-docs-support-matrix.md` (2026-07-10).
