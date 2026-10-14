---
type: Lesson
title: Send a relay's own reading to the maintainer before offering a remedy
description: When acting as the OATS contact for an outside adopter, submit your own diagnosis or workaround to the maintainer first and relay only the accepted answer without adding a remedy.
tags: [coordination, adoption, relay, authority]
timestamp: 2026-10-14
---
# A relay's advice can become the project's answer

An expert acting as the OATS side's single contact for another workspace
must distinguish its own reading from the maintainer's answer. Send an
original diagnosis or proposed workaround to the maintainer for acceptance
before offering it to the adopter as a remedy. Relay the accepted answer as
given, retaining its limits and holds rather than adding an inferred fix.
This is a boundary on the relay's advice, not a claim that every ordinary
expert answer requires a new approval round.

The adopter's agents can treat the contact's advice as the project's answer
and turn it into pin changes or host operations. Qualifying a suggestion as
an expert's reading does not remove that downstream risk. A plausible
technical diagnosis is not authority to recommend the corresponding change.

# What the reported contrast taught

The source reports offering a pin move for a cache defect before the release
lane answered. The maintainer withheld remedy advice, and the expert had to
retract its recommendation the same day. In a later host-refusal case, the
expert instead submitted its analysis and proposed answer to the maintainer.
The maintainer reportedly checked it against the release tag and approved
the text before the expert relayed it. The useful contrast is the order of
acceptance and advice, not either incident's version or workaround.

# Scope and elimination route

The [maintainer's review and scope rules](/nodes/oats-maintainer/stewardship/review-protocol.md)
remain authoritative; this lesson neither grants release authority nor
changes them. The generalist owns the judgment at the communication boundary.
[Host-read evidence](/nodes/oats-expert/lessons/date-host-read-facts-before-an-adoption-gate.md)
answers what is installed; it does not authorize a remedy either.

Fixing the underlying defect and testing the remedy eliminates that specific
workaround. Code or CI cannot decide whether a relay is authorized to offer
an original recommendation as the project's answer. If this role recurs,
make the maintainer-first boundary explicit in the role's coordination skill
through a separately reviewed change; this harvest changes no skill. The
lesson preserves why that boundary matters, not a second messaging recipe.

# Evidence and limits

Evidence: OKF proposal from oats-expert/polaris-oats-expert-lfx-support,
2026-10-14; notes/relay-own-reading-goes-to-maintainer-not-adopter.md.

The note dates both incidents to 2026-10-13. The retraction, release-tag
check and maintainer acceptance are source-reported, not independently
verified by this harvest. No human acceptance is inferred and no product
decision is superseded. Third-party message text and incident-specific
remedies are not reproduced.
