---
type: Lesson
title: The suite's real-aw pins age with the installed client — compare against the clean base on the same host before calling a failure a regression
description: The package pins the real binary's refusals (exit code and message), and those pins break when the installed aw changes its check order, as aw 1.36.49 did for `team join` with a bad token; run the suite on the clean base on the same host before attributing a failure to a branch, and re-pin the real-aw tables in a dedicated PR, never inside a feature PR.
tags: [oats.aweb, testing, real-aw, pins, aw-version, review]
timestamp: 2026-10-26
---

Learned 2026-10-26 while reviewing stage 1 of the threaded human channel on a
host with aw 1.36.49.

# What was observed

The package keeps "real aw" admission-table tests that run the published
binary and pin its refusals, as the integrations discipline requires
([a fake CLI that accepts what the real binary refuses hides a broken hook](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md),
rule 2). Two of them (oats-aweb-1-14 and 1-15) pin that
`aw --identity-home <dir> team join not-a-token …` exits 2 with the
identity-home policy message. On aw 1.36.49 the client decodes the invite
token before applying the identity-home policy and answers exit 1 "invalid
invite token payload", so both tests fail identically on the clean base and
on the branch under review.

# Rule

- **A real-aw pin is a fact about one client version.** When it fails, run
  `npm test` on the clean accepted base on the same host first; identical
  failures are host drift, not a regression of the change under test.
- **Re-pin in a dedicated PR**, so the feature PR's diff stays about the
  feature and the pin change is reviewed as what it is: a new fact about the
  client. State the aw version the re-pinned table claims.
- **Do not weaken the pin to make both versions pass**: the test exists to
  prove the failure is about the input, never about the policy.

# Elimination route

Pins that carry the aw version they claim (in the test and in the PR) make
the drift legible, and a version-gated expectation table would turn this
lesson into code; until then the comparison against the clean base is the
only check.

# Citations

Evidence: OKF proposal from oats-aweb-expert/threaded-channel-aweb-expert,
2026-10-26; notes/real-aw-pin-drift-1-36-49.md. The failures are
source-reported from `npm test` on the clean base and on the branch with aw
1.36.49; the exact aw change that reordered the checks was not located by the
source, and this harvest did not run the suite. The source also reported an
unrelated load-dependent failure that passed in isolation; it is not recorded
here.
