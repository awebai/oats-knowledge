---
type: Lesson
title: The spec author checks user-facing claims before handover and against the build
description: Test interaction claims before developers copy a spec into docs, share disproved claims with every developer using it, and recheck dictated wording against the built cases before the PR opens.
tags: [specification, documentation, review, handover]
timestamp: 2026-10-27
---
# Exact compliance can preserve a false sentence

When a spec requires particular user-facing words, a developer can preserve
them exactly while the implementation evolves beyond the cases the author
had in mind. A reviewer checking compliance with that spec can confirm the
same stale sentence. Agreement with the spec is not independent evidence
that its words still describe the build.

The lead who fixed the wording owns closing this gap. Ask the developer to
list at handback where the dictated words say less or something different
from the implementation. Before opening the PR, reread those sentences
against the built cases and resolve discrepancies with the wording's owner.
Check counts and exhaustive claims first: words such as “one,” “only” and
“every” can become false when a design gains another case. The developer's
list helps the check; an empty list is not proof that every sentence is true.

This is not permission to rewrite another owner's promise or to make prose
agree with an incorrect implementation. Resolve whether the words, the
implementation or the agreed requirement must change, and submit the
correction to the applicable review.

# Test interaction claims before they become shared instructions

The 2026-10-27 refinement moves part of this check earlier: a lead's claim
about what a click, key or viewer does can become several developers' docs
and release notes before the final build review. A plausible sentence
written from memory is not evidence that the interaction works.

Before handing over such a claim as established behavior, test it on the
actual surface within the authorized verification scope. If it has not been
tested, mark it as an open question for a developer to verify, not an
operator instruction ready to copy. If a developer disproves it, correct
the spec and notify every developer working from that spec promptly so they
can correct their dependent prose. Fixing the discoverer's docs does not
establish that another developer's release note was fixed too.

This extends rather than replaces the pre-PR wording check above: the
initial claim can be wrong before any implementation changes, and its
copies can survive a correction to the shared source. It is distinct from
[checking the affected-test inventory](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md),
which finds omitted test consumers rather than false instructions copied
from a spec.

# Distinct responsibility and elimination route

[Consumer-spec checks](/nodes/oats-expert/lessons/run-consumer-spec-against-built-producer.md)
exercise compositions before developer handover. The post-build wording
check here addresses the author's retained authority over exact prose;
the interaction-claim refinement also checks prose before it spreads.
[Re-verifying a re-dated release claim](/nodes/oats-maintainer/lessons/a-re-dated-claim-must-be-re-verified-against-the-release-it-now-names.md)
is the maintainer's related review lesson, not a replacement for the lead's
pre-PR check.

Where wording enumerates an executable set, prefer one authoritative set
with generated listings or completeness tests over manually maintained
copies. Check examples against real behavior where practical. Turn a
reproducible interaction claim into a real-surface regression or executable
documentation example where feasible; text equality alone cannot establish
that an action works. The remaining semantic review, explicit unverified
questions and correction fan-out belong in specification and verification
guidance; this harvest changes no skill and creates no new release gate.
The lesson preserves why an explicit owner is needed even when developer
compliance and review are both working as intended.

# Evidence and limits

Evidence: OKF proposal from oats-expert/polaris-oats-expert-tui, harvested
2026-10-14; notes/spec-words-kept-to-the-letter-need-a-check-against-the-build.md.

The source reports a 2026-10-13 finding in the
[terminal-client effort](https://github.com/awebai/oats/issues/855): wording
written for two display forms survived a build with four, and the developer
reported three discrepancies, including an incorrect count. The proposal
reports that the author corrected the prose before review concluded. These
are source-reported observations, not an independent audit of the build,
review verdicts or release status. They support the ownership gap, not a
claim that reviewers generally check only the spec or that released errors
can never be corrected.

Evidence: OKF proposal from oats-expert/extra-pane-reachable-expert,
2026-10-27; notes/spec-interaction-claims-reach-the-docs.md.

In [awebai/oats#1569](https://github.com/awebai/oats/issues/1569), the source
reports that an untested spec claim about selecting a prompt pane with a
mouse click failed the kernel developer's real-tmux check. The kernel docs
were corrected, but a client release note had already copied the claim;
the source caught that remaining copy at verification and reports a fix in
[awebai/oats#1575](https://github.com/awebai/oats/pull/1575) before handover.
This is one source-reported case, not an independently repeated interaction
test or a permanent statement about viewer bindings. It supports the timing
and correction-propagation lesson, not a claim that every spec sentence is
copied or that the reported fix shipped.
