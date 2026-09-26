---
type: Lesson
title: Check the PR's own check before an ACK; the author's local run is not the runner's run
description: A stage PR's GitHub check had been red on every head since round 1 while the author's local suite was green, because a test's skip guard threw when the runner lacked the host binary; the reviewer ACKed two rounds on the local evidence and found the red check only when preparing the merge, so read the PR's check conclusion and its failed log as part of every round, since a runner without the host's binaries is not a duplicate of a green local suite.
tags: [review, ci, testing, release]
timestamp: 2026-09-25
---

**Observed.** oats-aweb #15's validate-and-test check failed on all seven
heads of the branch. The author ran the suite locally with the published aw
fixture on PATH and reported green each round. On the runner there is no aw
binary; the test meant to skip built its skip message from
`(null + null).trim()` and threw a TypeError. The reviewer read diffs and
ACKed rounds 3 and 4 on the author's runs, and saw the red check only when
writing the merge runbook.

**Rules.**
- Every round: read the PR's check conclusion; when it is red, read the
  failed log before judging the diff. "Do not duplicate a green suite" is
  about re-running, not about ignoring a different environment's result.
- A test that depends on a host binary must skip on `spawnSync(...).error`
  and on null output, and the skip path itself must be exercised once
  without the binary.
- The merge guard includes the check: the head-guarded merge runbook checks
  the check's `headSha` and conclusion, not only the branch head.
