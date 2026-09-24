---
type: Lesson
title: Verify the remote ref after every scripted push before reporting a head
description: A chained release or merge script can fail mid-way while later steps still report the intended outcome; read the remote or PR state back before naming it to a reviewer.
tags: [lesson, release, git, review-protocol, github]
timestamp: 2026-09-24
---

Learned 2026-09-24 by a maintainer who sent two consecutive false "new head"
reports in one landing, both from the same shape: a `&&` chain whose git step
failed while an unconditional print of the local head and the mail step still
ran.

- `git checkout -B <branch>` is refused when another worktree (a developer
  instance's work tree) holds that branch. Use a detached checkout of the
  remote branch and push `HEAD:refs/heads/<branch>` instead; never touch the
  other instance's worktree.
- `git push --force-with-lease` to a URL rather than a named remote has no
  remote-tracking ref to lease against and is refused. Give the expected
  value explicitly: `--force-with-lease=refs/heads/<branch>:<old-oid>`.
- Never let the report step run unconditionally. Read the remote back
  (`git ls-remote <url> refs/heads/<branch>`), compare with the local head,
  and only then name the head to the reviewer.

The same rule applies to head-guarded merges and notices on the forge. The
expected-head guard takes the full 40-character object id from the PR view,
not an abbreviated SHA. A notice about an outcome is composed from a
read-back of that outcome (PR state, remote ref, or remote tag) in a
separate step after the action. If action and notice share one chain, the
notice branches on the read-back value, not on the intent.

A reviewer who fetches the branch catches this immediately, but it costs a
round trip and trust. Also: a scratch worktree that received a
`node_modules` symlink for gate runs will commit that symlink under a
directory-wide `git add`; list `git diff --name-only origin/main...HEAD`
before opening the PR.
