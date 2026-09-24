---
type: Decision
title: A workspace definition, a source library and a capability package are different responsibilities
description: Shared team composition lives in a Git-backed workspace definition; behaviour lives in capabilities; a distribution package transports them; a local deployment realises them — different responsibilities that may share a repository, joined only by reciprocal membership. The 2026-09-20 revision-pinned import and export-list mechanics were superseded 2026-09-23; the separation of responsibilities stands.
tags: [workspace, packages, portable-souls, composition, membership, supersession]
timestamp: 2026-09-24
---
> **Amended 2026-09-24 (human decision): package approval is removed.**
> Declaring a package in the workspace's `packages:` IS the trust decision.
> There's no per-version executable approval: `oats sync` has no approve
> step, the lock carries no `approved` record, and there's no
> `E_PACKAGE_UNAPPROVED` (OATS 0.26.0). The lock still pins commit +
> integrity, and `oats sync` refuses drift (`E_PACKAGE_INTEGRITY`). Read any
> mention below of approving package executables as the 0.25 design, not
> current behaviour. See
> [integrity, origin and consent](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).

# Decision

Decided 2026-09-20 with the human (oats-expert as maintainer), after an
initial recommendation to reuse the development-capability repository as the
workspace home was set aside. The human chose to host the OATS development
**workspace definition in the framework repository**, next to that
repository's own source exports, and to keep the development-capability
package focused on reusable behaviour. This shape is now on main; the decision
is recorded as taken, not as a pending change.

> **Superseded in part, 2026-09-23** by
> [Workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md).
> The separation of responsibilities (workspace definition / capability /
> package / deployment), the co-hosting choice, reciprocal membership and
> "consuming is not joining" all stand. What changed is *how a member's
> content reaches an instance*: imports by reviewed immutable revision and
> per-repository export lists are gone. See "Superseded mechanics" below.

# The four responsibilities

- A **workspace definition** describes shared organisational composition:
  admitted repositories, pinned soul imports *(imports superseded
  2026-09-23 — members are discovered at latest state, see below)*,
  defaults, knowledge-store and team *references*.
- A **capability** supplies behaviour — instructions, skills, declared
  operations and helpers — selected and approved through the normal contracts.
- A **distribution package** transports capabilities and may offer editable
  config templates. It is neither workspace membership nor an active team.
- A **local deployment** is one operator's realisation of the declarations:
  local mappings, state, credentials, supported execution and approvals.
  Several deployments may share one workspace without sharing live sessions.

The workspace is a **logical role, not a repository requirement**: the
workspace file and a member's membership file may coexist in one repository.

# Rationale and rejected alternatives

Both the selected shape and the runner-up were valid; co-hosting preserved the
development package's distinct purpose without adding a repository or
repurposing its home.

- **Repurpose the development package as the workspace** — rejected: mixes a
  capability/package role with shared team composition.
- **A dedicated workspace repository** — rejected for now: no independent
  access-control or lifecycle need was established. Moving the workspace
  later is an explicit identity/adoption transition, not a transparent
  directory rename, so it should be done only for a reason.
- **A config-template package as the primary composition mechanism** —
  rejected as primary: it stayed supported for legacy consumers on the 0.24
  line but does not exercise Git workspaces, which is what the project must
  dogfood
  ([dogfooding decision](/nodes/oats-expert/decisions/official-development-dogfoods-the-workspace.md),
  which records the superseded 2026-07-26 non-Git boundary). *Under
  workspace model v2 the template-adoption verb and the per-deployment
  configuration file are gone altogether.*

# Rules that follow

- **Membership is reciprocal.** The workspace admits a repository and the
  member identifies the workspace in its own membership file. Neither alone is
  membership, so a fork or a nearby directory cannot join by inheritance or
  proximity — eligibility is decided on qualified Git identities, not folder
  names ([kernel view](/nodes/oats-kernel-expert/decisions/configured-team-boundary.md)).
- **Consuming is not joining.** Importing a public soul, consuming a package
  or reading a knowledge store never makes its repository a member or selects
  its publisher's workspace. This matters most because the generic framework
  and its own development workspace share a repository: framework consumers
  are not enrolled in the project's workspace.
- **Imports are by reviewed immutable revision, never copies** — *superseded
  2026-09-23, see "Superseded mechanics"* — and a source edition is
  published *before* the import that pins it. An invented revision, a
  mutable branch or an unreviewed local candidate is never an accepted
  source. Choosing a workspace home does not silently choose portable source
  identities or approve a live cutover. *(What survives of this rule: a
  workspace home choice still never approves a live cutover, and a package
  version is still pinned to a reviewed, integrity-checked commit.)*
- The workspace file is **deployment policy, not product source**: no machine
  paths, accounts, credentials, private team identifiers or accepted-store
  locators. Team references are not enrollment; knowledge declarations are
  not a ready writer; a successful parse is not deployment qualification.
- Deprecating any package or template is a distinct reviewed change, never an
  automatic consequence of adding a workspace file.

# Superseded mechanics (2026-09-23)

Recorded by the redesign lead, with the maintainer, when
[Workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md) was
accepted. Two mechanics of this decision were retired; the responsibilities
above were not.

- **Imports by reviewed revision are superseded.** A member repository is
  always its **latest state**: membership (the reciprocal handshake, backed
  by the repository's own access control) is the whole trust decision for
  what a member contributes, and a soul names *where* a capability comes from
  — a member repository or a package — never *which version*. The
  2026-09-20 rule that a source edition is published before the import that
  pins it therefore no longer applies to members. A team that wants frozen
  behaviour publishes it as a package.
- **Export lists are superseded.** Every soul and capability a member carries
  is discoverable by default; an item that wants to stay internal marks
  itself private in its own definition. The member's side of the handshake
  is only a backlink to the workspace, not an inventory.
- **Packages are the only versioned source.** The workspace pins a package
  version once, the lock records the exact commit and integrity, and
  executables are approved once per version. This keeps the reviewed,
  immutable-revision discipline of the original rule exactly where the trust
  boundary is crossed — content from outside the team's repositories — and
  drops it where it was ceremony.

The distinction this concept exists for is sharpened, not weakened: a
repository may be a member **and** a package publisher, and the two roles do
not collapse — what it exports as member content is latest-state, what it
publishes as a package is versioned, and the same repository may do both.

# Related

[Current OATS direction](/nodes/oats-expert/roadmap/current-direction.md);
[Adoption evidence](/nodes/oats-expert/lessons/adoption-evidence-and-approved-scope.md);
[Workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md)
(supersedes the import/export mechanics recorded here).

# Citations

1. Legacy `agents/oats-expert/soul/knowledge/decisions/git-workspace-versus-development-package.md` (2026-09-20).
2. Framework `docs/workspace-adoption.md` (source-before-import order, shared-versus-local table) and portable-souls design (reciprocal membership), [awebai/oats](https://github.com/awebai/oats) — the 0.24-line documents of the superseded mechanics.
3. Legacy `agents/oats-expert/soul/knowledge/decisions/workspace-model-v2.md` (2026-09-23), decisions 2, 3, 11, 19 and "What is removed".
