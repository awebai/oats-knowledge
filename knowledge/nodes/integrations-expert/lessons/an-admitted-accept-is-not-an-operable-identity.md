---
type: Lesson
title: An admitted accept is not an operable identity; gate a provider feature on the whole lifecycle (connect, message, release), not on the first command that stops refusing
description: aw 1.36.10 admitted local accept-invite under an external identity home, and the OATS gate then found the accepted identity could neither message (no workspace connection; connect and init not admitted) nor release its membership (workspace delete and team leave both refuse), so a release gate for a lifecycle feature must run the whole lifecycle against the published tool before anyone declares the floor, and the floor is the version where every step is admitted.
tags: [integrations, aweb, identity, release, testing]
timestamp: 2026-09-25
---

**Observed.** The join defect in oats.aweb 1.14.0 was the refusal of one
command under an external identity home. The tool's fix admitted the accept
step. The real gate (join, send a mail, read the inbox, leave) then failed
at step two: "empty base url" / "current identity is not connected to an
aweb workspace", and at step four: "deleting or detaching that principal is
a separate administrative act" / "cannot leave the only team". A membership
was left behind in a person's team.

**Rules.**
- A provider feature's floor is the tool version where EVERY command of the
  feature's lifecycle is admitted and works for the identity shape the
  provider creates; write the gate as that lifecycle and run it before the
  floor constant is set.
- When a tool fix names one command, ask the tool's owner for the whole
  path ("with this identity, how does it message and how does it leave?")
  before building against the fix.
- Run such gates only in a team the human designates, leave the residue in
  place for the tool's owner to inspect, and report exact command/error
  pairs; never invent a cleanup through admin or init commands.
