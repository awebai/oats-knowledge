---
type: Lesson
title: A notice sent after a semicolon reports a variable the broken chain never set
description: In one shell invocation, an edit, a commit, a merge and the notice were joined by && except the notice, which followed a semicolon and printed a variable the earlier steps were meant to fill; when the edit's pattern did not match, every && step was skipped, the notice still ran, and it announced a merge with empty identifiers; write notices only from a read-back of the target, in their own step, guarded by the read-back's result.
tags: [process, shell, notices, read-back]
timestamp: 2026-09-25
---

**Observed.** A pre-approved one-phrase fix, commit, push, head-guarded
merge and the "merged" mail were chained in one command. The phrase was
split across two lines, so the single-line pattern did not match; the
chain's `&&` steps stopped, but the mail command sat after a `;` and read
the merge state from a variable that was never set. The reviewer received
"MERGED at head (empty)" and read the truth back from the forge within
minutes. A second attempt then hit a transient "not mergeable" while the
repository's check was still running on the fresh push.

**Rules.**
- See also [verify the remote ref after every scripted push](/nodes/oats-expert/lessons/verify-the-remote-ref-after-every-scripted-push.md).
- A notice is its own step, written from a read-back of the target after
  the action, and guarded by what the read-back says (`case "$state" in
  MERGED*)`), never appended after a `;` to the chain that was supposed to
  produce the state.
- Match text with the exact bytes, including line breaks, and assert the
  match before editing; a pattern that finds nothing must stop the run.
- After a push to a branch with required checks, a merge can be refused as
  unstable until the check finishes; wait for the check, then merge, then
  read back. The refusal is not a conflict.
