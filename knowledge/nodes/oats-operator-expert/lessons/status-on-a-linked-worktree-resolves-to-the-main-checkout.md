---
type: Lesson
title: A roster command run against a linked Git worktree can resolve its agents root to the main checkout
description: When a directory flag points at a linked worktree, roster listing followed the repository's common Git directory to the main checkout's agents root while composition preview used the worktree itself; verify which root a command reports before reading its output as the worktree's state.
tags: [lesson, worktree, kernel, status, verification]
timestamp: 2026-09-21
---

Learned 2026-09-21 by an operator preparing a roster change in a linked
worktree of a member repository on a 0.24-series kernel.

The roster listing addressed at the worktree printed the main checkout's
agents root and its old souls, while the composition preview addressed at
the same path read the worktree's new souls. The worktree's
`git rev-parse --show-toplevel` is the worktree; its `--git-common-dir` is
the main checkout, and the listing evidently followed the latter.

The general check: a command that prints the root it resolved is telling you
where it looked; read that line before trusting a listing as evidence about
a worktree. Where two commands disagree, the one that shows the worktree's
own content is the one reading the path you gave.
