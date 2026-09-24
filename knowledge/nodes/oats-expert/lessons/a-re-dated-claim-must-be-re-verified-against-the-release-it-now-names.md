---
type: Lesson
title: A re-dated claim must be re-verified against the release it now names
description: When a doc sentence of the form "as of version X, Y is broken" is updated to a newer version during a release, the reviewer checks whether Y is still true at that version; a version bump inside a factual claim is either a verified fact or a doc error, never a mechanical edit.
tags: [lesson, review, docs, release, versions]
timestamp: 2026-09-24
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
  [re-reading a cherry-pick against the new base](/nodes/oats-expert/lessons/a-cherry-pick-across-a-base-change-must-be-reread-as-a-diff-against-the-new-base.md):
  green mechanical checks do not cover prose, and
  [the merge range is the scope](/nodes/oats-expert/lessons/pr-branch-merge-range-scope.md)
  includes every touched sentence.
