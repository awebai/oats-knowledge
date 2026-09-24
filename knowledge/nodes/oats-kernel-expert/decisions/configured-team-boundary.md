---
type: Decision
title: Configured scope is not messaging membership
description: A declared boundary, not ambient messaging identity, establishes team scope; under workspace model v2 a team is a workspace label that never gates, and membership is observed over Git remotes in the operator's access context with failures classified, never collapsed.
tags: [kernel, team, workspace, config, discovery, messaging, workspace-model, remotes]
timestamp: 2026-09-23
---
# Rationale

Decided 2026-07-14 by the founder; discovery mechanism superseded 2026-09-14
(portable souls and Git workspaces). A team must not change because a command
found a different messaging workspace. Declaring the boundary in configuration
makes ownership and discovery explainable without depending on whichever
provider identity happens to be active.

Configuration scope and provider membership answer different questions. A
local roster is not proof of cross-host liveness, and a provider certificate is
not permission to reinterpret the configured deployment boundary. Resolve those
questions through their own supported tools; keep lookup algorithms and
provider setup recipes in current documentation.

**Automatic descent only from an explicit boundary.** Reconciliation of nested
scopes descends automatically only from a scope that declares the team
boundary, never downward from a laptop or home-level configuration (2026-07-26):
an unbounded scan of an operator's home directory was rejected outright. A
child scope that declares its own boundary is a nested, self-owned
reconciliation unit and is not descended into. Instance names are unique only
per agent directory, so instance lookups are local-first and team-wide only as
a fallback.

**Superseded: the directory tree as the member list.** The 2026-07 design
rejected an explicit repository list in favor of "the workspace tree *is* the
member list", to avoid two lists drifting apart. The 2026-09-14 portable-souls
redesign reverses this: directory adjacency is not organizational admission,
because it cannot discover a repository absent from the machine and lets an
arbitrary sibling directory join by proximity. Membership is now a Git-hosted
workspace definition with explicit members and reciprocal backlinks; the
configured boundary still owns *policy* (teams, provider adoption, defaults),
but it is no longer the discovery mechanism. Do not reintroduce tree-scanning
as admission.

**Eligibility is reciprocal and identity-based** (decided 2026-09-20 with the
human, workspace-definition decision). A repository is an eligible member only
when the operator can read both the workspace and the member, the workspace
admits the member, *and* the member identifies that workspace back. Admission
is by qualified Git identity, never by folder name: a fork's copied file, a
nearby directory or a stale observation is not membership. Consuming a public
capability, soul or knowledge store from a repository is never membership in
that repository's workspace — the generic framework and its own development
workspace can share one repository without enrolling every consumer. Within
one preparation, membership observations are frozen and a self-member's
backlink must resolve to the same commit as the workspace; a coherent fresh
observation is chosen rather than an old retained record rewritten.

**Workspace model v2 (2026-09-23) replaces the mechanism again; the
principle holds.** The configuration team block, tree reconciliation and
nested-boundary descent described above belong to the previous line. On the
new line a team is a label the workspace declares. It never gates,
restricts, changes trust or partitions a store. The messaging provider's own
notion of team moves under its payload, so the word "team" means one thing
([workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md),
decision 17). That is this decision's principle in its final form.

Discovery and resolution observe Git remotes, never local clones, so "who
can see what" is Git's own answer (decision 15). Three kernel obligations
follow:
1. **Observe in the operator's own access context, in the form the reference
   was written.** A private repository probed over a transport the operator
   did not write answers "not found". That answer classifies as an access
   failure and silently turns a member into the standalone view (decision 4).
2. **Classify failures; never collapse them.**
   - Access denial and "not found" select the standalone view.
   - Network and timeout failures are surfaced as they are, because an
     offline laptop is not a public contributor.
   - Nothing half-succeeds, and nothing prompts: a credential prompt would
     hang an unattended spawn.
   - A failure that fits no class becomes a problem row on that member
     instead of aborting discovery for every member.
3. **Standalone is a member's view, not a fallback for any repository.** A
   repository with no backlink is a schema error. Only a member whose
   workspace cannot be read for access reasons gets the standalone view, and
   everything produced from that view is marked with the reason.

# Related

[Local configuration remains authored policy](/nodes/oats-kernel-expert/decisions/local-policy-is-not-package-policy.md);
[Kernel supplies provider-neutral messaging intent](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md);
[Closest-wins is lookup, not authority](/nodes/oats-kernel-expert/lessons/closest-wins-is-lookup-not-authority.md).

# Current contracts

- [Current configuration.md](https://github.com/awebai/oats/blob/main/docs/configuration.md)
- [Current integrations.md](https://github.com/awebai/oats/blob/main/docs/integrations.md)
- [Portable souls and Git workspaces (2026-09-14)](https://github.com/awebai/oats/blob/main/docs/design/2026-09-14-portable-souls-and-git-workspaces.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/team-as-config-entity.md` (2026-07-14); SHA-256 `4fc3986d0823561662afd5a1f62dd6fbb79e1243696e3232503f59c374d6c288`.
2. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/team-scope-and-cross-repo-spawn.md` (2026-07-25, rejected `repos` list and local-first lookup); SHA-256 `53a823d4c027ada6eb792b84c8811d2267200c7722bae9c1155aa095df4e6ba1`.
3. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/distribution-packages-config-profiles-and-requirements.md` (2026-07-26, option 7); SHA-256 `c9109cecd0d4622152718436afe5836ea56e00bf7afa52b261eb13da683fb9cc`.
4. Supersession: `docs/design/2026-09-14-portable-souls-and-git-workspaces.md`, sections on discovery and admission.
5. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/git-workspace-versus-development-package.md` (2026-09-20), reciprocal-admission clause; `docs/workspace-adoption.md`, qualification of reciprocal admission.
6. Accepted decision [workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md), decisions 4, 15 and 17 (2026-09-23); framework `docs/design/2026-09-23-workspace-module-contracts.md` §1 with its Phase C clarification and "0.25.1 fix round" M2, L3 and L4.
