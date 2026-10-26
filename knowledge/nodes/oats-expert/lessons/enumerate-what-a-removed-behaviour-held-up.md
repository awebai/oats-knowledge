---
type: Lesson
title: Before removing a behaviour from a shared layer, enumerate what else it held up and write a requirement for each
description: When a cross-area spec drops a side effect from a shared delivery or lifecycle layer, list every job that side effect was also doing and reassign each one explicitly, because "stop doing X" silently drops the guarantees X was carrying.
tags: [planning, specification, cross-area, shared-layers, delivery, contracts]
timestamp: 2026-10-26
---
# A removed side effect was doing more than its name says

A shared layer's behaviour is usually named after one job and quietly does
several. Specifying its removal by negation ("present without
acknowledging", "detach without signalling", "write without locking") keeps
the named job in view and loses the rest. The spec reads as complete, the
developers build exactly what it says, and the dropped guarantees surface
later as bugs nobody specified against.

In the source's effort to give humans a threaded channel to long-lived
agents, the one-line wake was specified as presenting a message without
acknowledging it. A reviewer from another lane pointed out that the
acknowledgement had been doing two more jobs: suppressing redelivery of the
same message, and defining what recovery after a crash means. Both had to be
restated as separate requirements with named owners (a client-side record of
what has been presented for suppression; at-least-once re-presentation
reconciled against the conversation for recovery). Caught in review, this
cost one rewrite of a section; built as first written, it would have
produced duplicate wakes and an undefined recovery path across two
projects.

# Rule: list the jobs, then reassign each one

Before a spec removes or weakens a behaviour from a shared layer:

- write down every job the behaviour currently does, not only the one it is
  named for: what it suppresses, what it guards, what state it defines, what
  other components read from it;
- for each job, write a requirement that names which component now does it,
  or states explicitly that the job is no longer needed and why;
- when a job moves to a component in another project, record it as a
  dependency for the maintainer, as in [tracing each "done" item to its
  owning code](/nodes/oats-expert/lessons/trace-done-items-to-owning-code-before-accepting-repo-list.md).

A review from a lane that owns the shared layer is the natural place for
this check to be caught; it is cheaper to run it before asking for that
review. The delivery semantics decided for the threaded channel belong to
the messaging capability's owners and the maintainer's accepted
[threads decision](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md);
this lesson keeps only the method.

# Elimination route

A spec template for changes to a shared contract could require a "what this
behaviour currently does" list and a per-item disposition before the
section is accepted. Until the engineering skills carry that field, this
lesson is the reminder. No test can supply the list: the missing jobs are
exactly the ones the author did not know the behaviour had.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-threaded-channel,
2026-10-26; notes/summary-wake-needs-presented-record-not-read-state.md.

One effort, one review and one shared layer, source-reported; this harvest
did not read the design record or the review. The lesson is a planning
method, not a claim about which jobs any particular acknowledgement does.
