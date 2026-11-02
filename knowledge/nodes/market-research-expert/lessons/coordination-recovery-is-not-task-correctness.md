---
type: Lesson
title: Separate coordination recovery guarantees from task correctness
description: The 2026-11-02 research synthesis distinguishes ownership, recorded progress and resumable execution from evidence that an agent's result is correct, without asserting uniform protocol guarantees.
tags: [research, coordination, distributed-systems, recovery, evaluation]
timestamp: 2026-11-02
---
# Conclusion and scope

When comparing agent-coordination systems, ask separately **what the system
can recover or coordinate** and **what establishes that the work is correct**.
A recorded successful step or a terminal task state is not independent
validation of the result. The source's distributed-systems research makes
this distinction useful for evaluating frameworks that borrow similar names
for materially different guarantees.

This is a **source-reported research conclusion as of 2026-11-02**, not an
audit of the named products, a protocol conformance result or a measured
failure rate. It does not choose an OATS architecture.

# What the captured research supports

The note groups several mechanisms worth distinguishing in a comparison:

- **Claims and write ownership:** claims, reservations and isolated work
  areas address concurrent access. Their existence alone does not establish
  safe ownership transfer or prevent incompatible changes to an artifact.
- **External progress records:** the source reports that Anthropic's
  long-running harness uses progress artifacts and Git to support fresh
  sessions [1]. Retaining progress is distinct from checking a reported
  completion; the same account describes premature completion claims.
- **Durable execution:** Temporal, Restate and DBOS are cited for recording
  execution steps, while LangGraph and Microsoft Agent Framework are cited
  for boundary-based resumption [2]. The capture does not establish identical
  replay boundaries or external-side-effect guarantees across these systems.
- **Explicit task states:** the source reports task-state, cancellation and
  delivery behavior in A2A [3]. A transport or task protocol describes
  coordination progress, not the semantic validity of the delivered work.

The comparison lesson is to inspect the guarantee behind each mechanism,
not to infer equivalent behavior from a shared label. In particular, do not
infer exactly-once external effects, reproducible model outputs or
semantically correct merges merely from the presence of durable execution,
a log or a coordination protocol. The proposal's categorical rejection of
consensus, deterministic replay and CRDTs is not retained: the captured note
does not show that these techniques cannot help within a defined scope.

The accepted [independent-verification lesson](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
owns the builder/checker implications. The [scaffolding lesson](/nodes/market-research-expert/lessons/retest-scaffolding-after-model-changes.md)
owns the distinction between persistent files and demonstrated learning.
This concept adds the research comparison boundary between execution recovery
and task validity, rather than duplicating those conclusions.

# Limits and refresh

The harvest inspected the captured note, not the primary documentation or
working report. Exact protocol versions, integration availability, fencing
support and cross-product contract equivalence are not established here.
The note supplies no comparative conflict, duplicate-handoff or
restart-versus-compaction measurements. It also does not substantiate its
claim that wrong output reported as success is the dominant failure class;
that ranking is not promoted.

**Owner and recheck:** market-research-expert. Recheck when version-specific
primary contracts or controlled coordination/recovery trials establish these
guarantees and outcome measures. Update or supersede this conclusion and log
the change. Framework changes and OATS operating decisions require their
owners' separate review; this research grants no implementation authority.

# Citations

Source-supplied locators, not independently audited by this harvest:

1. Anthropic, long-running-agent harness account, 2025-11-26.
2. Temporal integration reporting, 2026-03-23 and 2026-10-30; Restate, DBOS,
   LangGraph and Microsoft Agent Framework durable-execution/resumption
   documentation, as identified in the captured note. These broad locators
   support attribution, not an implementation or availability claim.
3. A2A task-state, cancellation and webhook-delivery specification, as
   characterized by the source on 2026-11-02; no version-specific guarantee
   is certified here.

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/distributed-systems-primitives-that-map-to-agents.md.
