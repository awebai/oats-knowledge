---
type: Lesson
title: A shared checkout's local main leaks into every worktree spawned from it
description: Worktree-mode instances branch from the checkout's local main, not the shared remote's; unpushed commits there ride every developer's PR, so branches must be created from the remote main and the checkout's main kept equal to it.
tags: [lesson, operator, git, worktree, harvest, pr-scope]
timestamp: 2026-09-24
---

Learned 2026-09-24 by a maintainer reviewing a developer's mirror PR that
carried dozens of files of another agent's committed soul.

# What happened

The developer had not touched those files. Their worktree branch had been
created from the shared checkout's local main, which held several unpushed
memory-harvest commits from a checkout-mode instance whose soul lives in the
repository, and which was also far behind the shared remote's main. The
previous PR from the same checkout had escaped only because that developer
happened to rebase onto the remote main before handoff.

# Rules

- A worktree instance creates its branch from the remote main (fetch first),
  never from the checkout's local main, and says so in its handoff. The
  spawner puts that line in every helper's task.
- A reviewer lists the merge range's paths before reading any diff and
  treats soul paths as out of scope; a branch that does not contain the
  current remote main and shows many non-merge commits is the tell (see
  [review the whole PR merge range for scope](/nodes/oats-expert/lessons/pr-branch-merge-range-scope.md)).
- A checkout-mode instance whose soul is committed in the repository must not
  run a harvester that commits into the shared tree: those commits reach no
  remote and leak into every spawn. Its lessons go to notes and to the
  central knowledge repository by pull request (see
  [harvested knowledge on an unpushed main never leaves the machine](/nodes/oats-operator-expert/lessons/harvested-knowledge-on-an-unpushed-main-never-leaves-the-machine.md)).
- Moving the checkout's main back onto the remote main is destructive git on
  a shared tree and belongs to the human, after whatever sits only there has
  been promoted.
