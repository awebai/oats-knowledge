---
type: Decision
title: Official OATS development runs on the architecture it offers adopters
description: The framework and its official package repositories develop as one multi-repository OATS workspace so the project exercises its own workspace, curriculum and discovery architecture at real scale, under one cross-package stewardship gate.
tags: [workspace, packages, development, stewardship, dogfooding]
timestamp: 2026-09-20
---
# Decision

Accepted by the founder 2026-07-26 and re-shaped 2026-09-20. The OATS
framework repository and every official capability repository are members of
one **multi-repository OATS workspace**, and official development happens
inside it — the same topology offered to any adopting team with several
repositories. Expertise does not stay centralised in the kernel repository,
and cross-package architecture still has **one stewardship gate**
(`oats-expert`) so the packages do not drift into N isolated directions.

# What changed on 2026-09-20 (supersession)

The 2026-07-26 shape was a **non-Git directory** as the team boundary, whose
`oats-config.yaml` was adopted from a development package's config profile,
with **one durable maintainer soul per package repository** (for example an
`oats-okf-expert`).

The boundary was explicitly superseded; the per-package roster was not
carried forward:

- The boundary is now a **Git-shared workspace definition** hosted in the
  framework repository (decided 2026-09-20 with the human, recorded in
  [a workspace definition is not a package](/nodes/oats-expert/decisions/workspace-definition-is-not-a-package.md)),
  with each member repository publishing a reciprocal
  export/backlink index and the workspace pinning reviewed source revisions
  of the exported souls. Membership is discovery, not activation; a pinned
  import is metadata readiness, not a running deployment (see
  [Current OATS direction](/nodes/oats-expert/roadmap/current-direction.md)).
- The accepted durable roster (human direction 2026-09-13, editions on main
  2026-09-20) is the **five domain experts**
  ([expert domains replace job titles](/nodes/oats-expert/decisions/domain-expert-rebuild.md)),
  and that decision forbids adding "an expert per source module" or
  proliferating overlapping roles. No recorded ruling addresses per-package
  maintainer souls by name; the one-soul-per-package roster simply was **not
  carried into the accepted roster**, and **no per-package soul is planned**.
  Package repositories are maintained through instances of the five experts
  and their helpers. Should a package ever show a genuinely separate
  expertise need, the roster decision's own clause ("additional souls may be
  recommended only for a genuinely separate expertise need") is the route,
  not a revival of this shape.

# What survives from 2026-07-26

- **Dogfooding intent**: the official workspace must exercise package
  profiles, nested scopes, strict curricula, cross-repository discovery,
  messaging and Desktop at real scale before those are claimed for others.
- **One stewardship gate** across packages; package contracts stay coherent
  because one owner reviews them together.
- The workspace definition is **deployment policy, not product source**: it
  carries no machine paths, accounts, credentials, private team identifiers or
  accepted-store locators. Operator-local inputs (provider settings, explicit
  store bindings, private human/team choices, exact executable approvals) stay
  with the operator.
- Distribution and local assignment are separate: a package repository may
  ship capabilities for users without those capabilities being active for its
  own maintainers.

# Rejected alternatives

- Committing the workspace root into one child repository (2026-07-26):
  would make one repository's checkout the team boundary and leak machine and
  account state into portable material.
- Live inheritance of package config into the workspace (2026-07-26): a
  package update would rewrite deployment policy at a distance
  ([local policy is not package policy](/nodes/oats-kernel-expert/decisions/local-policy-is-not-package-policy.md)).
- Filesystem migration as a side effect of package installation or as a task
  for an in-flight development agent: it is an operator action with a
  rollback plan.

# Citations

1. OATS decision `agents/oats-expert/soul/knowledge/decisions/official-multi-repo-workspace-and-package-experts.md` (founder acceptance 2026-07-26).
2. Accepted human direction 2026-09-20 (Git-hosted workspace definition) and the framework's workspace adoption guide (`docs/workspace-adoption.md`) and portable-souls design (`docs/design/2026-09-14-portable-souls-and-git-workspaces.md`) in [awebai/oats](https://github.com/awebai/oats).
3. Legacy `agents/oats-expert/soul/knowledge/decisions/expert-souls-and-knowledge-rebuild.md` (human direction 2026-09-13): the five-expert roster and its "no expert per source module" clause. It does not mention per-package souls, hence the softened wording above.
