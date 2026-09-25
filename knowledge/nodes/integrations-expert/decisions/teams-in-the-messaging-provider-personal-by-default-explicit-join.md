---
type: Decision
title: Teams in the messaging provider: the personal team by default, explicit join and leave, one local identity per joined team
description: Agreed 2026-09-25 on the human's priority: every instance lives in its person's personal team for the workspace; a soul's team labels only make wider teams eligible; joining is a spawn choice or one idempotent command at any time, leaving is the same command or automatic when eligibility disappears; each joined team is a further local identity the provider records and revokes at retire; the kernel hands the eligible teams beside the settings and exposes them in preview and inspect.
tags: [decision, integrations, messaging, teams, identity, lifecycle, desktop]
timestamp: 2026-09-25
---

Agreed 2026-09-25 between the integrations lane and the framework lead on the
human's stated priority ("a personal team for a person's agents in the
workspace by default; an instance joins the teams its soul names, at spawn
or during its life, matching the workspace; seamless, inside the messaging
capability; kernel changes welcome"), refined the same day to "default is
the personal team only; joining is explicit". The kernel half is the
framework's agreed teams contract (its design record of the same date); this
concept records the provider half and the facts the design rests on.

# Context

A soul named one team label; the kernel merged that one label's workspace
entry into the provider payload; the provider minted one team-scoped identity
for it; an instance was in one team for life, chosen at spawn. The messaging
service's released client showed, read at source by its owner: a team-scoped
(local) identity is one team by construction, since joining refuses an
occupied identity directory; hosted teams refuse member-global invites; a
session grant home carries one team id; address deletion exists only under a
customer-controlled namespace's controller key. The human's default for
identity scope is local, with global an explicit choice.

# Decision

- **Default: the personal team only.** Every instance is minted into its
  person's personal team for the workspace. Until the service ships a
  per-workspace personal team (get-or-create keyed on the workspace key,
  the service's top ask), "personal" is the person's single default team,
  documented as a temporary stand-in and not built on. A soul's labels do
  not join anything by themselves.
- **Eligible teams come from the kernel**, beside the settings, never inside
  them: the ordered list of the soul's labels with the mapped team id and
  that label's payload, computed live for a home (the soul commit the
  deployment currently resolves and the workspace's current messaging), and
  shown in spawn preview and inspect. An unmapped label is a discovery
  warning the provider reports, not an error.
- **Joining is explicit and idempotent**: a spawn setting naming labels, or
  the provider's own verbs at any time, from inside the home or with the
  home named, for a human, another agent or the instance itself. A label
  outside the eligible set is refused, naming the eligible ones. The
  personal team cannot be left. All three verbs (list, join, leave) answer
  one JSON document (personal, primary, eligible with joined flags, joined
  with identity home and time, unmapped) and are also declared as home
  operations so the Desktop drives them through the operations contract.
- **Leaving** is the same verb, and automatic at every launch for a joined
  team that is no longer eligible; the provider never joins on its own and
  never leaves a membership it did not create.
- **One local identity per joined team**, minted the way the primary is
  (the person's root mints a local invite, the instance joins in a fresh
  identity directory beside its primary), recorded in the instance's
  provider meta and revoked one by one at retire. Sending as a joined team
  is the client's identity-home selection, shown once in the provider's
  inject. Receiving for a joined team is by polling until the service's
  delivery paths serve several identity homes per instance home; readiness
  says which joined teams are poll-only. Global instance identities stay an
  explicit, non-default scope: under a hosted namespace nothing the root
  holds can release a retired identity's address.
- **Readiness** reports, per home and per soul: personal, eligible against
  joined, unmapped, and poll-only joined teams, each with its remedy.

# Consequences

- Provider release: the first workspace-model-only release carries all of
  it; the kernel half lands in the major that already changes the file
  formats; the sync-driven reconcile of live homes is a later kernel minor
  the provider needs nothing new for.
- What the service still owes changes setup and readiness, never spawn: the
  per-workspace personal team, a device-flow login, a token-free join for an
  entitled person, and delivery for several identity homes per home.
- See [a global instance identity leaves a permanent address behind](/nodes/integrations-expert/lessons/a-global-instance-identity-leaves-a-permanent-address-behind.md)
  for the identity-scope reasoning, and
  [personal workspace teams and token-free admission](/nodes/integrations-expert/decisions/personal-workspace-teams-and-token-free-admission.md)
  for the service-side design this composes.
