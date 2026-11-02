---
type: Lesson
title: A re-dated claim must be re-verified against the release it now names
description: Verify version-qualified behavior against the named release, including a skill's feature floor; an earliest possible future version is a planning bound, not evidence that the feature shipped.
tags: [lesson, review, docs, release, versions]
timestamp: 2026-11-02
---

Learned 2026-09-24 by the maintainer while reviewing a provider release's
mirror PR.

# What happened

A mirror PR for a provider release updated every version literal in the
integration guide to the new floor. One sentence said that, as of the old
version, sending through a session grant was rejected by the server with a
specific error. The developer bumped its version to the new floor; the fix
for that very error shipped in the floor release, so the sentence became
false. The first reviewer approved after checking the pin, the payload
parity, the floor markers and the tests; a second reviewer read the sentence
and asked whether it was still true.

# Rule

A version literal inside a sentence that asserts behaviour is not a pin.
Before approving a release that bumps it, decide for each such sentence
whether the behaviour is still true at the named version, from the
release's own evidence (acceptance results, changelog, source), and rewrite
it as history plus current state if it changed. Sentences of the shape
"as of X, Y does not work" are the ones to search for, because they are the
ones releases exist to falsify.

# Why

Parity checks, pins and tests cover bytes and behaviour; none of them reads
prose. A guide that carries a falsified limitation forward tells the next
operator to work around a problem the release removed, and it does so with
the authority of a freshly updated version number.

# Consequences

- Reviewing a release's docs means grepping for version-qualified claims
  and re-verifying each, not diffing the version literals.
- The same discipline as
  [re-reading a cherry-pick against the new base](/nodes/oats-maintainer/lessons/a-cherry-pick-across-a-base-change-must-be-reread-as-a-diff-against-the-new-base.md):
  green mechanical checks do not cover prose, and
  [the merge range is the scope](/nodes/oats-maintainer/lessons/pr-branch-merge-range-scope.md)
  includes every touched sentence.

# Feature floors need a shipped feature (2026-11-02)

The same distinction applies before a release, not just when re-dating a
limitation. A skill's claim that a feature needs package version X or later
must be checked against a tag that actually includes that feature. Before it
ships, say "the release that ships it"; an explicitly labelled earliest
possible version can record a planning bound, but cannot certify feature
availability. If the feature misses a release, correct the claim rather than
letting the guessed floor become a shipped promise.

The source reports that getting-started guidance named oats.aweb 1.33.0 for
a root route still pending in oats-aweb#147. The 0.69.9 pin move exposed the
mismatch through a skill-versus-mirror test. The skill was live from main, so
the misleading version line mattered at merge, not only at the next tag.
That timing is the new lesson; the actual floor remains in release evidence,
not this knowledge record.

The [correction at b0ad6929](https://github.com/awebai/oats/commit/b0ad692950ba6df50e4a76604c8192f56a9d9410)
was read during harvest: it changes the skill's floor to 1.34.0 and describes
that version as the earliest possible shipment in the test. The
[second read](https://github.com/awebai/oats/pull/1709#issuecomment-6575948203)
explicitly says no 1.34.0 tag existed then. Neither proves shipment in
1.34.0, and the still-unqualified skill wording is not adopted as evidence
that a future numeric floor is safe.

Prefer deriving feature-availability guidance from one release-qualified
source, with CI exercising the documented route against its named released
package rather than merely comparing duplicate version literals. The
reported test caught this instance; no general version-claim gate is claimed.
The remaining semantic check belongs in existing release and skill-review
guidance, not a second procedure or a knowledge-only permanent workaround.
No skill or test is changed by this harvest.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-02; notes/a-skill-names-a-version-only-once-it-ships.md. The CI failure
and main-served timing are source-reported; the public correction and reader's
assessment were checked, but no CI run, release or runtime was reproduced.
