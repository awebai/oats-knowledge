---
type: Lesson
title: Open a CI-only draft during kernel review convergence
description: When the kernel branch needs a PR to trigger CI, the expert opens a clearly non-review draft on the first push so exact-head CI runs during convergence rather than starting only after acceptance.
tags: [kernel, ci, review, handover]
timestamp: 2026-10-27
---
# Start the evidence loop without requesting review

A pushed branch is not necessarily a tested branch. In the source's kernel
work, waiting until the expert accepted the developer's converged head to
open the PR also postponed the first CI run. That serialized the review
loop and CI, adding a full CI cycle to hand-over and delaying discovery of
failures that could still change the head.

Where ordinary branch pushes do not trigger the required CI, the source's
successful practice was for the **expert**, not the developer, to open the
implementation PR as a **draft on the first push**. Its body explicitly
states that it is not ready for review and exists to run CI on successive
heads. The expert supplies the complete description and marks it ready only
after accepting the converged head, with the required CI evidence bound to
that head. Opening the draft is an evidence request, not a request for the
maintainer to finish the expert's review.

This preserves the existing
[content-bound review and hand-over gates](/nodes/oats-maintainer/stewardship/review-protocol.md).
A draft, an earlier green run or a promise of later CI is not acceptance.
Required checks outside ordinary PR CI remain required. The
[affected-test inventory](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md)
addresses coverage, not when the first run starts.

# Scope and elimination route

**Owner: oats-kernel-expert. Update-on-change:** recheck this workaround when
the repository's workflow triggers or the expert's delivery guidance change;
retire the dependency on a draft if ordinary branch CI supplies the required
evidence before hand-over.

The structural elimination route is branch-triggered CI for the required
checks, with deliberate handling of duplicate branch/PR runs. This is a
candidate for the repository's workflow owners, not an approved workflow
change. If PR-only triggering remains intentional, its residual timing rule
belongs in the existing `land-your-prs` guidance named by the source. This
lesson changes no soul skill and grants no new publication or merge authority.

Unlike a bounded [feasibility spike](/nodes/oats-expert/lessons/test-feasibility-before-choosing-between-owners.md),
this draft is the implementation PR that may later become ready; the spike's
never-ready/close-without-merge terms do not apply. Nor is this the Desktop's
[automatic-PR feature](/nodes/oats-maintainer/decisions/desktop-parity-lifecycle-and-policy.md):
it is an expert's deliberate delivery action, not automatic forge behavior.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert,
2026-10-27; notes/lesson-draft-pr-for-ci-during-review.md.

The source reports using this practice for
[awebai/oats#1578](https://github.com/awebai/oats/pull/1578) and
[#1599](https://github.com/awebai/oats/pull/1599), and catching a CI failure
during the latter's review loop. It reports inspecting workflow triggers at
`27a07074`: PRs and pushes to main/release branches ran CI, ordinary feature
pushes did not. Those triggers are dated context to recheck in the repository,
not a permanent workflow specification. The source's CI-only testing
constraint explains the incident; it does not establish a project-wide ban
on permitted local verification. These observations are source-reported,
not independently reproduced runs, audited PR outcomes or human acceptance.
