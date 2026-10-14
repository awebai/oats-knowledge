---
type: Lesson
title: The spec author rechecks dictated words against the build
description: When a spec fixes user-facing wording, the author requests wording discrepancies at handback and checks the sentences against the built cases before the PR opens.
tags: [specification, documentation, review, handover]
timestamp: 2026-10-14
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

# Distinct responsibility and elimination route

[Consumer-spec checks](/nodes/oats-expert/lessons/run-consumer-spec-against-built-producer.md)
exercise compositions before developer handover. This check comes after the
build and addresses the author's retained authority over exact prose.
[Re-verifying a re-dated release claim](/nodes/oats-maintainer/lessons/a-re-dated-claim-must-be-re-verified-against-the-release-it-now-names.md)
is the maintainer's related review lesson, not a replacement for the lead's
pre-PR check.

Where wording enumerates an executable set, prefer one authoritative set
with generated listings or completeness tests over manually maintained
copies. Check examples against real behavior where practical. The remaining
semantic review and discrepancy handback belong in specification and
verification guidance; this harvest changes no skill and creates no new
release gate. The lesson preserves why an explicit owner is needed even
when developer compliance and review are both working as intended.

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
