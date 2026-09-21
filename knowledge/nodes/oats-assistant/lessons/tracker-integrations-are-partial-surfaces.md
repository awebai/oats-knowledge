---
type: Lesson
title: Tracker integrations are partial surfaces; set expectations before adopting one
description: A tasks-layer integration deliberately exposes only the issue-execution slice of a tracker, so an adopter must be told up front what agents can operate, what stays human/UI-only, and that unsupported operations escalate rather than improvise.
tags: [onboarding, adoption, tasks, integrations, expectations]
timestamp: 2026-07-10
---
# Context

The first two tasks-layer integrations (a Linear and a Jira integration, built
July 2026) showed that a command list is not enough to onboard a deployment onto
a tracker. Trackers carry projects, overviews, documents, issues, sub-issues,
comments and relations; the integration exposes a narrow slice of that, and a
user who assumes "OATS is connected to our tracker" means full coverage will
promise workflows the agents cannot run.

# Lesson

A tasks integration is a **partial surface by design**, not an incomplete one:

- **Issues execute** work: claim, update, block, hand off, complete.
- **Comments record** events on that work.
- **Tracker documents / project overviews explain** the work and hold durable
  "why"; they remain human- or UI-owned.
- **Conversation belongs to messaging**, not to tracker comments.

Projects, overviews, documents and relations therefore usually stay outside the
agent-operable surface, and that is a deliberate ownership split rather than a
gap to be closed with ad-hoc API calls or guessed flags.

When helping a deployment adopt a tasks layer (decided 2026-07-10 by the
integrations role that built the first two integrations; generalised
2026-09-21 for the onboarding assistant):

1. State the boundary before promising a workflow: agents operate issues and
   comments; humans own project structure and documents.
2. Read the integration's own declared support boundary (its README/skill
   "supported / not supported" section) rather than inferring coverage from the
   tracker's UI or API.
3. Tell the adopter that an agent hitting an unsupported operation must
   **escalate** with the task state preserved, never invent a command or
   improvise a partial workaround.
4. Route requests to widen the boundary to the integration's owner (a new or
   changed capability), not to the deployment's configuration; the deployment
   cannot configure its way to operations the integration does not expose.

The tasks slot is exclusive: exactly one tracker fills it per configured scope,
and which tracker is a deployment decision, not a framework preference. That
is the standing rule, not this lesson's invention: the 2026-07-10 exclusivity
decision (oats-expert, on the first deployment) makes *any* bound tracker the
single task layer — the bundled Jira integration is "one option, not the
answer" — and the 2026-07-26 official-workspace decision (founder-accepted)
keeps Jira and Linear "adopter-selected task providers" outside the
development profile's dependency closure. The framework ships integrations;
it does not ship a choice.

# Consequences

- Onboarding conversations about a tasks layer open with the operating-model
  split above, not with a command demo.
- The pattern was adopted by the shipped integrations: the current Linear skill
  carries an explicit not-supported list and an escalate-on-persistent-failure
  rule, confirming the lesson held.
- Rejected: documenting only the command recipes (users then assume UI-only
  operations are automatable); letting agents fall back to raw tracker API
  calls for uncovered operations (breaks the ownership split and the
  integrity/consent boundary the kernel enforces on capabilities, see
  [kernel and capability responsibility](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)).

# Related

- [Adoption evidence and authority must match the claimed outcome](/nodes/oats-expert/lessons/adoption-evidence-and-approved-scope.md):
  a connected tracker is availability evidence, not proof that a workflow is
  executable end to end.

# Current contracts

- The exclusive `tasks` slot and the shipped tracker integrations:
  [integrations.md](https://github.com/awebai/oats/blob/main/docs/integrations.md)
  and [layers.md](https://github.com/awebai/oats/blob/main/docs/layers.md).

# Citations

1. OATS rationale source `agents/integrations-expert/soul/knowledge/lessons/tracker-integration-docs-support-matrix.md`
   (Lesson, 2026-07-10, harvested from a Linear tasks-integration build);
   SHA-256 `412593a194ac13265de73725a017a232c394ad62c0318e9bed08e502afb0cebc`.
   Authoring instructions ("put the full guide in the README, the subset in
   the skill") were dropped as developer craft.
2. OATS decision `agents/oats-expert/soul/knowledge/decisions/jira-over-aweb-tasks.md`
   (2026-07-10): one bound tasks layer owns tasks, whichever integration the
   user binds; also cited by
   [kernel and capability responsibility](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md).
3. OATS decision `agents/oats-expert/soul/knowledge/decisions/official-multi-repo-workspace-and-package-experts.md`
   (founder acceptance 2026-07-26): "Jira/Linear remain adopter-selected task
   providers". Its workspace shape is superseded (see
   [official development dogfoods the workspace](/nodes/oats-expert/decisions/official-development-dogfoods-the-workspace.md));
   the adopter-selection line is what this lesson relies on.
