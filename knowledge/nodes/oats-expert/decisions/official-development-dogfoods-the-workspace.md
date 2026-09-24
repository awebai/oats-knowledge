---
type: Decision
title: Official OATS development runs on the architecture it offers adopters
description: The framework and its official package repositories develop as one multi-repository OATS workspace so the project exercises its own workspace, curriculum and discovery architecture at real scale, under one cross-package stewardship gate. Superseded in part 2026-09-23 (members at latest state; member-and-publisher non-collapse) and 2026-09-24 (six package experts join the roster).
tags: [workspace, packages, development, stewardship, dogfooding, supersession]
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
  *The revision-pinning half of this bullet was superseded 2026-09-23 — see
  below; the Git-shared boundary and "membership is discovery, not
  activation" stand.*
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
  *"No per-package soul is planned" was superseded 2026-09-24 — see below.*

# What changed on 2026-09-23 (supersession: members at latest state)

[Workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md),
accepted by the lead with the human on 2026-09-23, removed the idea that the
official workspace **pins reviewed source revisions** of its members' souls.
A member repository is discovered **at its latest state** — no `@revision`
on members; the reciprocal membership handshake is the whole trust decision
for member-tier material, exactly as a repository's own committed skills are
trusted through its access control. A team that wants frozen capabilities
publishes them as a **package**, the only versioned thing in the model.

For the official workspace this produced a rule stated by the human at
implementation start: **a repository may be a member AND a package publisher,
and the two roles do not collapse.** Every official package repository is a
member of the OATS workspace (its souls are discoverable at latest state)
*and* its published package is consumed by the framework's own souls as a
package — versioned, locked, executables approved per version. What a
repository exports as member-tier capabilities and what it publishes as a
package are different tiers even when they live in the same repository;
membership never turns a package into a latest-state member capability. The
dogfooding consequence is that the framework's own souls consume the official
packages the same way an adopter does, while the package repositories'
expert souls are reached through membership like any adopter's own souls.

# What changed on 2026-09-24 (supersession: package experts join the roster)

The [roster amendment](/nodes/oats-expert/decisions/roster-amendment-operator-and-integration-experts.md)
accepted 2026-09-24 by the lead and the OSS coordinator under authority the
human delegated ("use your best judgement") supersedes the 2026-09-20
sentence **"no per-package soul is planned."** Workspace model v2 had already
required (2026-09-23) that **every official package repository carries a
member soul that is the expert in that capability** — six package experts
(knowledge, messaging, two tracker integrations, authoring, development),
ordinary member souls, discoverable in the official workspace, spawnable by
anyone in it and the natural owner of their package's PRs. The roster
amendment ruled on their knowledge: each package expert owns **that
package's FACTS**, and nothing cross-package. They are named
`oats-<package>-expert` (`oats-okf-expert`, `oats-aweb-expert`, …), matching
the package repositories and the domain experts' prefix, which also keeps them
clear of the aweb project's own `aweb-expert`.

The amendment also changed two roster entries this concept had left
implicit:

- The **setup expert becomes the deployment operator expert and owns a
  knowledge node** (rebuild and onboarding rationale, migration judgement,
  multi-machine layout, cutover sequencing, outsider verification) — the
  five-soul record's "owns no knowledge" clause is amended. The reasoning:
  operating a real deployment through the rebuild round surfaced knowledge
  that no repository reading yields and that the stewardship log does not
  hold; a node without an owning soul rots.
- The **integrations expert owns a node** for cross-package
  provider-integration judgement, read by the six package experts. Folding it
  into the kernel expert would mix integration judgement with kernel
  internals; folding it into one package expert would lose the cross-package
  part.

This does **not** revive the 2026-07-26 "one maintainer soul per package"
shape as a substitute for the domain experts: the six package experts sit
*beside* the domain roster, own facts rather than architecture, and the
**single stewardship gate** for cross-package architecture stays with
`oats-expert` — release stewardship was explicitly kept as a Playbook there,
not a soul. Two of the package experts (messaging, knowledge framework) sit
on cross-project seams and their charters name the external node they must
read, so two rosters do not re-derive each other's decisions.

# What survives from 2026-07-26

- **Dogfooding intent**: the official workspace must exercise package
  profiles, nested scopes, strict curricula, cross-repository discovery,
  messaging and Desktop at real scale before those are claimed for others.
  Under v2 this includes the member-and-publisher double role: the framework
  consumes its own packages through the same pin, lock and approval path it
  offers adopters.
- **One stewardship gate** across packages; package contracts stay coherent
  because one owner reviews them together. Package experts own facts, not
  the cross-package architecture.
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
- Pinning member souls at reviewed revisions (2026-09-20 shape, dropped
  2026-09-23): versioning belongs to packages; a member frozen at a revision
  is a package by another name and duplicates the lock's job.

# Citations

1. OATS decision `agents/oats-expert/soul/knowledge/decisions/official-multi-repo-workspace-and-package-experts.md` (founder acceptance 2026-07-26).
2. Accepted human direction 2026-09-20 (Git-hosted workspace definition) and the framework's workspace adoption guide (`docs/workspace-adoption.md`) and portable-souls design (`docs/design/2026-09-14-portable-souls-and-git-workspaces.md`) in [awebai/oats](https://github.com/awebai/oats).
3. Legacy `agents/oats-expert/soul/knowledge/decisions/expert-souls-and-knowledge-rebuild.md` (human direction 2026-09-13): the five-expert roster and its "no expert per source module" clause. It does not mention per-package souls, hence the softened 2026-09-20 wording above.
4. Legacy `agents/oats-expert/soul/knowledge/decisions/workspace-model-v2.md` (human acceptance 2026-09-23), decisions 11, 19 and 20: no `@revision` on members; member-and-publisher non-collapse; a member expert soul in every package repository. Worked example in `docs/design/2026-09-23-simplified-workspace-model.md`.
5. Legacy `agents/oats-expert/soul/knowledge/decisions/roster-amendment-operator-and-integration-experts.md` (lead + OSS coordinator, delegated authority, 2026-09-24): operator node, integrations node, six package experts owning package facts, release stewardship as a Playbook.
