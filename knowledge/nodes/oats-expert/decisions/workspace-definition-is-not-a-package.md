---
type: Decision
title: A workspace definition, a source library and a capability package are different responsibilities
description: Shared team composition lives in a Git-backed workspace definition; behaviour lives in capabilities; a distribution package transports them; a local deployment realises them — different responsibilities that may share a repository, joined only by reciprocal, revision-pinned membership.
tags: [workspace, packages, portable-souls, composition, membership]
timestamp: 2026-09-20
---
# Decision

Decided 2026-09-20 with the human (oats-expert as maintainer), after an
initial recommendation to reuse the development-capability repository as the
workspace home was set aside. The human chose to host the OATS development
**workspace definition in the framework repository**, next to that
repository's own source exports, and to keep the development-capability
package focused on reusable behaviour. This shape is now on main; the decision
is recorded as taken, not as a pending change.

# The four responsibilities

- A **workspace definition** describes shared organisational composition:
  admitted repositories, pinned soul imports, defaults, knowledge-store and
  team *references*.
- A **capability** supplies behaviour — instructions, skills, declared
  operations and helpers — selected and approved through the normal contracts.
- A **distribution package** transports capabilities and may offer editable
  config templates. It is neither workspace membership nor an active team.
- A **local deployment** is one operator's realisation of the declarations:
  local mappings, state, credentials, supported execution and approvals.
  Several deployments may share one workspace without sharing live sessions.

The workspace is a **logical role, not a repository requirement**: the
workspace file and a member's export file may coexist in one repository.

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
  rejected as primary: it stays supported for legacy consumers but does not
  exercise Git workspaces, which is what the project must dogfood
  ([dogfooding decision](/nodes/oats-expert/decisions/official-development-dogfoods-the-workspace.md),
  which records the superseded 2026-07-26 non-Git boundary).

# Rules that follow

- **Membership is reciprocal.** The workspace admits a repository and the
  member identifies the workspace in its own export file. Neither alone is
  membership, so a fork or a nearby directory cannot join by inheritance or
  proximity — eligibility is decided on qualified Git identities, not folder
  names ([kernel view](/nodes/oats-kernel-expert/decisions/configured-team-boundary.md)).
- **Consuming is not joining.** Importing a public soul, installing a package
  or reading a knowledge store never makes its repository a member or selects
  its publisher's workspace. This matters most because the generic framework
  and its own development workspace share a repository: framework consumers
  are not enrolled in the project's workspace.
- **Imports are by reviewed immutable revision, never copies**, and a source
  edition is published *before* the import that pins it. An invented
  revision, a mutable branch or an unreviewed local candidate is never an
  accepted source. Choosing a workspace home does not silently choose portable
  source identities or approve a live cutover.
- The workspace file is **deployment policy, not product source**: no machine
  paths, accounts, credentials, private team identifiers or accepted-store
  locators. Team references are not enrollment; knowledge declarations are
  not a ready writer; a successful parse is not deployment qualification.
- Deprecating any package or template is a distinct reviewed change, never an
  automatic consequence of adding a workspace file.

# Related

[Current OATS direction](/nodes/oats-expert/roadmap/current-direction.md);
[Adoption evidence](/nodes/oats-expert/lessons/adoption-evidence-and-approved-scope.md).

# Citations

1. Legacy `agents/oats-expert/soul/knowledge/decisions/git-workspace-versus-development-package.md` (2026-09-20).
2. Framework `docs/workspace-adoption.md` (source-before-import order, shared-versus-local table) and portable-souls design (reciprocal membership), [awebai/oats](https://github.com/awebai/oats).
