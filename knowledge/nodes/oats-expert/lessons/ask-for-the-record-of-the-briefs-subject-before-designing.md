---
type: Lesson
title: Before designing from a human's brief, and before offering a "decision for the requester", check the lane's records; a recorded decision makes the item a supersession request to its human
description: A brief can read as a new idea when its author decided and parked the same direction hours earlier, and a draft's "decisions for the requester" can reverse what another human recently decided; ask the lane's maintainer for the record of each subject, resume a parked direction rather than inventing a second mechanism, address each item a recorded decision owns to the human who made it with citation, reason and loss, mark it pending even when that human has delegated review and quote their words as a decision or a leaning, and publish the draft where the lane's readers can open it.
tags: [planning, briefs, decisions, supersession, resumption, maintainer, cross-area, review, delegation]
timestamp: 2026-10-30
---
# A brief is written from the author's head, not from the records

A human writing a brief for a lead does not restate what they decided last
week or this morning. A direction they decided and then paused reads, in the
brief, like a fresh idea: the brief asks for the outcome and says nothing
about the record. A lead who plans from the brief alone will design the
mechanism again, differently, and the proposal will contradict coherence
rules the project has already agreed with its other lanes.

In the source's effort (a redesign of the project's two clients), the brief
asked for thread-based communication between humans and agents. The lane's
human had decided that direction the same day and deferred it with nothing
built, keeping the record as the point to resume from. The lead learned this
from the lane's maintainer, not from the brief and not from the roster: a
roster shows who is present and when an instance was last seen, not what was
decided. The maintainer's accepted record is
[humans address long-lived agents through threads](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md),
which also carries the coherence rules a redesign must keep. Those rules and
the direction stay in that node and are not restated here.

# Rule: ask for the record, then resume rather than restart

Before designing from a brief:

- name the brief's subjects (the mechanisms it asks for, not only the
  surfaces it touches) and ask the lane's maintainer, in one message, for the
  recorded decision or direction on each;
- if a subject has a decided-and-parked direction, the redesign **resumes**
  it: it designs from the record's resumption point and keeps its coherence
  rules, and where it would change a recorded rule it names that as a
  supersession for the human who accepted the rule, never as a quiet second
  mechanism;
- ask the maintainer who receives the proposal. The lane that owns the
  subject decides its readers; a proposal that touches several lanes has one
  owning lane and named second readers, and a contract or supersession goes
  to the release lane as well. Publish the draft where those readers can
  open it: an artifact private to the requester's account is invisible to a
  maintainer in another workspace, and the review round is lost before it
  starts. Have the fallback ready (an issue comment carrying the text and
  screenshots) rather than discovering the access gap from the reviewer.

Reading the maintainer's node is part of the check, but it is not the whole
check: a direction decided and parked today may not yet be harvested, and
the maintainer knows which record is current.

# Rule: a draft's "decisions for the requester" each have an owner

The same check applies a second time, at the draft: not only to the
mechanisms the brief asks for, but to every item the lead is about to
number as a choice for the requester. A design draft naturally ends in a
list of open decisions, and the requester naturally reads that list as
theirs to pick from. In the source's effort, the lane's maintainer read
draft 1 and found that several of its twelve "decisions for the requester"
(a status-dot grammar, monospace chrome, the landing view) reversed
decisions another human had taken recently, one of them merged the same
day; the Desktop node's
[chrome typography](/nodes/oats-desktop-expert/decisions/chrome-typography-follows-information-role.md)
and
[agent-centered navigation](/nodes/oats-desktop-expert/decisions/agent-centered-navigation.md)
are two of the records those items touched. A draft that offers such items
as choices cannot be acted on: whichever way the requester picks, the
deciding human has not been asked, and a correction round follows.

Before numbering a "decision for the requester":

- check whether a recorded decision already owns the item, in the lane's
  node and with the lane's maintainer, as above;
- if one does, the item is not a choice for the requester. It is a
  **supersession request addressed to the human who made that decision**,
  and it carries three things: the exact citation of the decision, the
  reason to change it, and what the operator loses if it changes. It waits
  for that human's answer, not for the requester's comment, and the draft
  says so where the item appears;
- a framework or packaging choice (a renderer library and a native addon
  entering the kernel's package, with the build and test model that
  follows) is not a design decision at all. It is a structural call for
  the release lane, made before any design spec sets, as
  [a framework request is ergonomics, not architecture](/nodes/oats-expert/lessons/framework-request-is-ergonomics-separate-chrome-from-live-pane.md)
  already asks the lead to name it;
- the remaining items, which no record owns, are the requester's.

The result is one decision message per human, each able to act on it. The
source rebuilt its draft with an owner on every item; the saved round is
the correction the maintainer would otherwise have had to send.

# Rule: delegated review authority is not the human's call on a supersession

The check holds when the human has stepped back from the review. A human
who tells the maintainers to review another side's work "without my
sign-off, I trust your verdicts" has delegated **review**: judging whether
what the other side builds is right and ready. That delegation does not
extend to superseding what the same human, or another human, has accepted;
nothing in it is the deciding human's answer to a supersession request, and
the knowledge doctrine's line (an agent alone does not overturn a human's
decision) is unchanged by it.

In a second effort by this soul (a cross-side onboarding redesign in which
the other side built and this side's lanes reviewed under exactly such a
mandate), the brief's knowledge section proposed removing a role that
human-accepted decisions had established, and said only that this was "a
decision for the human". The lane maintainer receiving the brief asked
whether the human had made that call and for the human's exact words. The
human had not: the words were "I am more inclined towards", a leaning. The
brief was amended and accepted whole.

So, for every item in a brief that would supersede a human-accepted
decision, however broad the delegated review mandate:

- say that the item **waits for that human's explicit call**, where the
  item appears, and do not let the mandate's wording stand in for it;
- **quote the human's own words and label them**: a decision ("do X") or a
  leaning ("I am more inclined towards X"). A leaning is direction worth
  recording and designing toward; it is not acceptance, and the brief must
  not let a reader infer one from the other;
- the receiving maintainer will check exactly these two things before
  accepting the brief; writing them in on the first draft is the saved
  round.

This extends the record check above: it applies to the lead's own brief's
proposals, not only to the requester's items, and delegated authority held
by the reviewers is not the human's call. When the same brief is built by
the other side, its ownership table has its own two-sided reading; see
[a cross-side brief names who builds and which lane reviews](/nodes/oats-expert/lessons/cross-side-brief-names-who-builds-and-which-lane-reviews.md).

# How this relates to neighbouring lessons

[Trace each "done" item to the code that owns it](/nodes/oats-expert/lessons/trace-done-items-to-owning-code-before-accepting-repo-list.md)
treats the brief's repository list as a claim to check against code. This
lesson treats the brief's *ideas* the same way: a claim to check against the
lane's records before planning. The Desktop expert's own rule that an
established design decision is changed only after reading why it was made
([one design authority](/nodes/oats-desktop-expert/decisions/design-direction-and-quality-bar.md))
is the same stance inside one lane; this lesson is for the lead who arrives
with a brief that spans lanes and does not yet know which records exist.

Superseding a human-accepted decision is never silent; the knowledge
doctrine and the maintainer's review hold that line. This lesson keeps the
lead from needing it by accident.

# Elimination route

A brief template that asks the author for "existing records on this
subject" would catch the common case at the source. Until the planning
skills carry that question, the lead asks it at the start of every
human-initiated effort; a maintainer's reply costs one message and saves a
design round.

# Evidence and limits

Evidence: OKF proposal from oats-expert/ui-ux-redesign-expert, 2026-10-26;
notes/threads-direction-resumes-not-restarts.md. The draft-stage rule,
the supersession request's shape, the structural status of the framework
choice and the readable-draft point: OKF proposal from
oats-expert/ui-ux-redesign-expert, 2026-10-26;
notes/supersession-each-goes-to-its-human.md. The delegated-review rule:
OKF proposal from oats-expert/oats-workspace-onboarding-setup-expert,
2026-10-30;
notes/delegated-review-authority-and-builder-reviewer-split.md.

The delegated-review case is one brief and one human, source-reported: the
maintainer's questions, the human's quoted words and the brief's amendment
and acceptance are the source's report; this harvest read neither the
brief, the mail nor the human's session. Which role the brief proposed to
remove, and whether that direction later became a decision, is not recorded
here; the lesson is the brief-writing step and grants no authority over
that or any other human-accepted decision.

One effort and one human, source-reported: the lead received the pointer in
verified mail from the Desktop lane's maintainer after its start notice, and
this harvest did not read that mail or the redesign proposal. The draft-1
reading (which items reversed recorded decisions, and that the private
artifacts could not be opened) is likewise the source's report of the
maintainer's verified mail; neither the mail nor either draft was read
here, and the Desktop decisions linked above are cited as records the
items touched, not restated or judged. The lesson is the planning and
drafting step; it grants no authority over the parked direction or any
recorded decision, whose supersession is each deciding human's call.
