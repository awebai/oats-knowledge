---
type: Decision
title: If any workspace member is private, host the workspace definition in a dedicated private repository that is not itself a public member
description: The workspace definition names every member, so whoever can read its host sees the member list; with mixed public/private membership the only honest host is a dedicated private repository, chosen before the first sync because every deployment points at it.
tags: [decision, operator, workspace, disclosure, privacy, membership, hosting, cutover]
timestamp: 2026-09-23
---

Decision formed 2026-09-23 by the OSS coordinator while laying out a mixed
public/private two-team workspace.

# Rule

When a workspace has at least one private member, host the workspace
definition in a **dedicated private repository** that exists to hold the
definition (and, optionally, private souls) and is **not itself a public
member**. Do not host it in an existing public member, and do not host it
inside the private member.

# Why

The workspace model ([workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md))
makes the definition a single file that **lists every member** and lets
any member host it. That freedom reads as convenience — "put it in the repo
we already have" — but the host is really a **disclosure decision**: the set
of people who can read the host is exactly the set who learn the full
member list, including the names of repositories they cannot otherwise see.

Two natural choices both fail for mixed membership:

- **Hosting in a public member** publishes the private member's existence.
  Outsiders reading the public repository learn a private repository's
  name, and often infer its purpose from the team labels beside it. The
  private repository stays unreadable, but its existence is no longer a
  secret — and that is usually the part the organisation cared about.
- **Hosting inside the private member** hides the workspace from every
  public contributor. An outside operator who clones a public member finds
  a membership backlink pointing at a repository they cannot read; the
  workspace is a dead reference for them.

A dedicated private repository is the shape where **each reader sees
exactly what they are entitled to**: insiders resolve the whole workspace;
outsiders see a public member whose backlink they cannot follow — but that
costs them nothing usable, because a public member's souls remain
reachable through the standalone path (the member's own capabilities plus
the core package). A public soul stays spawnable by someone who has never
seen the workspace file.

# Why "not a public member" matters

The host is itself a member (it backlinks to itself like any other), so it
appears in its own member list. If the host is private, its appearance in
the list is harmless — only insiders read the list. If the host were
public, the whole point collapses. The rule is therefore not merely
"private host" but "private host that is *not a public member*": a private
repository that also serves public contributors as a member would be a
contradiction.

# Ordering: decide before the first sync

Choose the host **before** writing the first membership backlink and before
the first sync. Every member's membership file and every machine's local
file point at the host by canonical key; moving the host later means
touching every member repository *and* re-pointing every deployment on
every machine, sequenced per deployment
([cutover is sequenced per deployment](/nodes/oats-operator-expert/playbooks/cutover-is-sequenced-per-deployment.md)).
Disclosure is also irreversible: a member name that spent a week in a
public host is in public history forever. The cheap moment to get this
right is the moment the workspace is drawn, not after the first private
member joins.

This is the same instinct as
[place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md):
the member list is an organisation-level fact whose audience is the
organisation's insiders, so it belongs at a scope only insiders can read.

# What goes wrong without it

- An organisation adds a private operations repository to a workspace
  hosted in its public agents repository; the private repository's name
  ships in the next public commit.
- An operator "fixes" the leak by moving the definition into the private
  repository; public contributors lose the workspace entirely and file
  issues about unresolvable backlinks.
- Two half-hosts emerge (a public one for outsiders, a private one for
  insiders) — two workspaces for one organisation, violating the
  one-workspace-per-organisation principle and forking every default.

# Consequences

- A mixed workspace has one more repository than it has "real" members;
  accept the extra repository as the price of honest disclosure.
- Private souls may live in the host; public souls must live in public
  members so the standalone path keeps them usable.
- Outsider verification of a rebuild
  ([outsider verification of a rebuild](/nodes/oats-operator-expert/playbooks/outsider-verification-of-a-rebuild.md))
  should include an outside operator confirming that a public member
  discloses nothing beyond its own contents.

# Citations

- `docs/rebuild-to-v2.md` (section "Decide the one workspace" — the
  private-host paragraph and the standalone-path remark).
