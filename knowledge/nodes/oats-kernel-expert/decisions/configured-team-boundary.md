---
type: Decision
title: Configured scope is not messaging membership
description: A declared configuration boundary establishes team scope independently of ambient messaging identity.
tags: [kernel, team, workspace, config, discovery, messaging]
timestamp: 2026-09-20
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
