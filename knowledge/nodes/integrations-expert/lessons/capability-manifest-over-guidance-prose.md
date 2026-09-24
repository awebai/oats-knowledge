---
type: Lesson
title: A capability's own manifest overrides guidance prose about what its settings require
description: Prose can be stricter than or different from the code, so verify manifest settings and CLI commands before declaring a human block or naming an operator step.
tags: [lesson, verification, capabilities, configuration, collaboration]
timestamp: 2026-09-24
---

Learned 2026-09-24 by the integrations expert reading handed-over example
configuration.

When a maintainer hands over example configuration with placeholders such
as `REPLACE_WITH_INTENDED_MODEL`, it is easy to read every placeholder as a
required decision. It often is not. Prose is written from memory and tends
to describe the fully specified case, while the manifest states what the
code actually enforces.

Before telling anyone that an input needs their decision, open the
capability's declared settings and read them. They say which keys exist,
which have defaults, and which are optional. A field documented as
"optional; when omitted the default applies" is not a decision. A capability
that declares one setting does not need the three the prose implied.

The cost of getting this wrong is asymmetric. Inventing a value that should
have been a human's is a real error. But wrongly declaring a choice "blocked
on a human" stalls the work, spends someone's attention on a non-question,
and looks like diligence while producing nothing, so it tends not to get
corrected. Reading the manifest costs one command.

The same rule applies to setup guidance that names CLI verbs: verify the
command against the targeted CLI (its command table or help) before shipping
the text, and pin the named commands in a test. A messaging setup review
found guidance naming a team-creation verb no release of the CLI had ever
exposed; the verified existing paths were hosted signup with a username, a
team API-key init, or an invite token. See
[guidance names only verbs the target CLI exposes](/nodes/integrations-expert/lessons/guidance-names-only-verbs-the-target-cli-exposes.md).

Keep the distinction the manifest cannot make for you: a setting that is
merely required is yours to fill with anything legitimate; a setting that
carries real identity (an account, a team, a credential) stays the human's
even when the schema would happily accept a guess.
