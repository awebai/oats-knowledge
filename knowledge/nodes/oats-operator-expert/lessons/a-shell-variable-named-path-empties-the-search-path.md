---
type: Lesson
title: A loop variable named path empties the search path in zsh
description: In zsh the lowercase array path is tied to PATH, so assigning a plain string to a variable called path inside a loop makes every subsequent command in that shell unresolvable; the loop then prints its own success messages while nothing ran.
tags: [lesson, shell, zsh, verification]
timestamp: 2026-09-22
---

Learned 2026-09-22 by an operator cleaning up worktrees from a shell loop.

A cleanup loop of the form `for wt in ...; do path=...; git -C "$path" ...`
printed "removed" for nine worktrees while every `git` and `tail` call
failed with "command not found". The assignment had replaced the shell's
search path; the echo after the failed command did not depend on the
command's result.

The general rule: never use `path` (or `PATH`, `cdpath`, `fpath`, `manpath`)
as a scalar variable name in zsh, and make a loop's success message depend on
the command's exit status, not on reaching the next line.
