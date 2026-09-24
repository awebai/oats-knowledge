---
type: Lesson
title: Harvested knowledge on an unpushed main never leaves the machine
description: A checkout-mode instance whose harvester promotes knowledge onto the local main of a repository it may not push keeps that knowledge on one machine with no failure signal; when the soul lives in the repository and the instance does not own main pushes, harvest delivery must be a branch and a pull request.
tags: [lesson, operator, knowledge, harvest, checkout-mode, placement, custody]
timestamp: 2026-09-24
---

Observed 2026-09-24 by the maintainer of a second deployment when the roster's
knowledge migration asked for six lessons described as "already on main".

# Rule

When a soul lives inside the repository an instance checks out, and that
instance does not own pushes to the canonical branch, the harvester's delivery
must be **a branch plus a pull request** — the same path workspace-mode
instances already use — never a commit on the local main. Until the knowledge
capability does that for checkout mode, the instance forwards harvested
concepts through an inbox pull request at task boundaries.

# Why

The harvester did exactly what it was asked: it promoted the notes into the
soul bundle and committed. The commit landed on the work tree's local main.
Main pushes belonged to another role, so the commits stayed local, the tree
drifted ahead of the canonical branch, and every other machine kept reading a
soul without those lessons. Nothing failed: validation passed, the log listed
the promotions, the instance reported "harvested". The knowledge was simply
unreachable, which is worse than a failure because no one looks for it.

This is the mirror image of
[a shared checkout serves a stale soul](/nodes/oats-operator-expert/lessons/shared-checkout-serves-a-stale-soul.md):
there the tree is behind the remote, here it is ahead of it, and in both
cases the bundle is valid, current-looking and wrong about the world.

# What goes wrong

- A migration or another instance rebuilds knowledge that already exists on
  one machine, because "not on main" reads as "never written".
- A local main that carries harvest commits can no longer fast-forward to the
  canonical branch; each sync becomes a merge commit on a tree nobody meant to
  fork.
- The lessons that concern how the deployment itself is operated — the ones
  the operator most needs elsewhere — are exactly the ones that stay behind.

# Consequences for placement

- Decide, per soul that lives in a repository, who owns pushes to the branch
  the harvester commits to. If the instance does not, its harvest delivery is
  a pull request, and the placement decision says so; see
  [place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md).
- An operator verifying a deployment's knowledge flow checks the local branch
  against the remote in *both* directions: behind means stale, ahead means
  stranded.
- A knowledge base held outside every work tree, with delivery by pull
  request for everyone, removes the condition entirely; that is the roster's
  centralisation decision, not a per-deployment fix.

# Citations

- Legacy note `notes/harvested-knowledge-on-an-unpushed-main-never-leaves-the-machine.md`
  of the second deployment's maintainer instance (2026-09-24); the six
  stranded lessons were delivered through an inbox pull request the same day.
