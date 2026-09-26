---
type: Lesson
title: A provider's wire answer must pass the kernel's validator on the provider's own stage; a reviewer reading a new key as a feature is how a strict wire breaks readiness
description: oats.aweb 1.14.0 added a teams block to its binding-check answer, the reviewer read it as a readiness feature, the kernel's check wire accepts only status, problems and warnings and discarded the whole answer, and every readiness of an aweb home on 0.26 and 0.27 showed unknown until the kernel's real-bundled-provider test caught it at mirror time; so a provider stage must vendor the kernel's answer rule as a test and run every answer through it, and a reviewer must check every key a provider adds to a kernel-consumed document against the kernel's wire, not against the feature's intent.
tags: [integrations, kernel-contract, readiness, review, testing]
timestamp: 2026-09-25
---

**Observed.** The 1.14.0 brief asked for a teams readiness view. The developer
attached it to the check result; the reviewer listed "teams readiness block"
among the delivered features. The kernel's `runProviderCheck` rejects any
result key outside status|problems|warnings, so 0.26.0 and 0.27.0 reported
"check answered invalid binding data" for every aweb home. Two provider
releases shipped with it; the kernel's mirror test caught it.

**Rules.**
- For every document a provider writes for the kernel (check answers, hook
  outputs, manifests), the provider's stage carries a vendored copy of the
  kernel's validator or shape rule and runs every produced document through
  it; a shape change on either side fails the stage, not the mirror.
- Reviewer: a new key in a kernel-consumed document is a wire question first.
  Find the consumer's decoder and confirm it accepts the key before crediting
  the feature. Views that the kernel does not consume belong in their own
  operation (here `messaging:teams`), not in the check answer.
- The mirror PR's real-bundled-provider tests are the last guard; keep them,
  and treat their failure as a provider defect until proven otherwise.
