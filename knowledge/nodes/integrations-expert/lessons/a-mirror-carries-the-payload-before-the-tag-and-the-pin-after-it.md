---
type: Lesson
title: A packaged integration lands in its source repository first; the mirror carries the payload before the tag and the catalog pin after it
description: A release of a mirrored capability stages in the package's own repository, is tagged there, and only then pins the framework's catalog; the mirror PR carries payload, docs and tests before the tag and gains the pin as a separate post-tag commit, so the mirror stays byte-identical to the tagged payload and no pin ever names a tag that does not exist.
tags: [integrations, release, mirror, catalog, pins]
timestamp: 2026-09-25
---

The framework repository mirrors each official capability's payload and pins
its catalog to a tag of the package repository. Two orderings went wrong
before this was written down: a pin that named a tag not yet pushed, and a
mirror reviewed against a stage that then moved.

**Order of record.**
1. Stage the release in the package repository; both reviewers approve the
   stage head.
2. Open the mirror PR against the framework with the payload byte-identical
   to that stage head (`diff -rq` against the checkout), docs and tests, and
   no pin. The Desktop suite runs on it
   ([a provider mirror must run the Desktop suite](/nodes/integrations-expert/lessons/a-provider-mirror-must-run-the-desktop-suite.md)).
3. Merge the stage and push the tag; read the tag back (annotated object and
   peeled commit).
4. Add the pin as one commit on the mirror PR: catalog ref, guide example,
   floor wording; re-diff the payload against the tag checkout, not the
   stage; the reviewer reads that delta alone.
5. Merge the mirror head-guarded at the pinned head.

The general judgement, pins follow published tags in the same change, is in
the framework's [release judgement](/nodes/oats-expert/stewardship/release-traps.md).
