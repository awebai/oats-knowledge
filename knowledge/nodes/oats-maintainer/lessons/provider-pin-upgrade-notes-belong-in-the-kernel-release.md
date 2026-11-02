---
type: Lesson
title: A provider pin carries its upgrade consequences into the kernel release
description: When kernel release preparation advances a provider pin, its author carries operator-visible behavior changes and upgrade steps from every crossed provider release into the kernel Upgrade section before tagging.
tags: [release, providers, pins, upgrade, review]
timestamp: 2026-11-02
---

# The author owns upgrade coverage

A kernel release can change an operator's experience through a provider pin
without changing kernel code. During release preparation, read the provider's
CHANGELOG across the entire old-to-new version interval, not just the final
patch. Carry each operator-visible behavior change and each Upgrade step into
the kernel release's `## Upgrade`, preserving the provider's conditions and
scope. A clause under Changed does not replace the consequence or action an
operator needs to find before upgrading.

Do this in the author's preparation, before the tag, rather than relying on
the second reader to discover an omission. The source's rationale is that
operators use the kernel's release notes without reading every provider's
CHANGELOG, and released notes are not edited. This complements the existing
[semantic second read](/nodes/oats-maintainer/stewardship/review-protocol.md#release-prep-second-reads-check-hand-written-claims-2026-10-28),
not a replacement for it or a new release-approval authority.

# What exposed the gap

The source reports that OATS 0.69.9 advanced oats.aweb from 1.32.1 to 1.33.1.
The prep mentioned joined-team polling under Changed but omitted its effect
on idle Claude homes and the provider's paused-home upgrade step from
Upgrade. A second reader returned the prep for that omission. The risk was
an operator finding that an idle agent no longer answered joined-team mail,
not merely an incomplete list of changed files.

This is one reported release-prep failure, not evidence that an operator
actually suffered the outage. The provider's release artifacts own its
runtime behavior and exact upgrade procedure; this lesson keeps neither a
second procedure nor a current-version ledger. The existing
[mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)
owns payload parity, which cannot establish complete operator guidance.

# Prevention route

Prefer release tooling that enumerates the crossed provider versions and
carries their upgrade entries into the candidate notes, with checks for an
omitted release or Upgrade entry. Whether another changelog entry changes
what an operator sees or must do still needs semantic judgment in the
existing release-preparation guidance. Until that is enforced, this manual
coverage check is release-process debt, not automation delivered here.

# Evidence

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-02; notes/a-pin-carries-its-providers-upgrade-lines.md.

The [second read of oats#1709](https://github.com/awebai/oats/pull/1709#issuecomment-6575948203)
was read during harvest and corroborates the omission and before-tag return
at `ba09ef12`. It is a maintainer-instance review record, not independently
verified human acceptance, runtime behavior or release execution. No new
human decision or supersession of the release gates is claimed.
