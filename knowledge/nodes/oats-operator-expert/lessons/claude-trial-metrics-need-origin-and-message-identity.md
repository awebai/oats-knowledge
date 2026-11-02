---
type: Lesson
title: Claude trial metrics need origin and message identity
description: In Claude Code 2.1.308 trial transcripts, origin-bearing user entries distinguish input turns from tool results, while message identity prevents repeated streaming usage from being counted twice.
tags: [operator, trials, measurement, claude, transcripts]
timestamp: 2026-11-02
---
# Avoid two biased counters

A trial that counts every transcript user entry as a new input turn can
count tool results as turns. Filtering out all metadata entries instead
can omit channel-driven turns. The source's Claude Code 2.1.308 smoke-run
inspection found a useful distinction:

- A turn-start user entry carried `origin`; tool-result user entries did
  not.
- TASK input, `oats session input` and scheduled wakes appeared with
  `origin.kind: human`.
- aweb pushes appeared with `origin.kind: channel` and `isMeta: true`.
  Excluding `isMeta` entries therefore lost the channel inputs.

For this observed format, distinguish inputs by their recorded origin rather
than user-role count or a metadata exclusion. **The label `human` is not
proof that a person typed the input**: the same label represented automated
terminal input and scheduled wakes in the reported runs. These are counts
of recorded input-turn starts, not completed tasks, correctness or delivery
acknowledgements.

Usage repeated across streamed entries for the same `message.id`. Counting
each entry separately would inflate reported usage; aggregate at message
identity rather than summing every repeated entry. The note does not
establish how to reconcile conflicting usage snapshots, missing identifiers
or resumed/compacted histories, so those cases remain unqualified.

The source also observed `system/turn_duration` as an active-time signal.
Keep it distinct from elapsed trial time and queueing delays; the report
does not establish it as a billing or end-to-end latency contract.

# Make measurement reproducible

The elimination route is a version-qualified parser with sanitized fixtures
for human-labelled input, scheduled input, channel metadata, tool results
and repeated streaming usage. Assert the intended input and message counts;
flag unsupported shapes instead of silently assigning comparable numbers.
Requalify the parser when the transcript format changes. Exact schema
maintenance belongs in that parser and its tests, not in this lesson.

This is operator measurement judgment for comparing trials, not a new kernel
activity contract or permission to inspect other instances' transcripts.
The [measurement non-interference lesson](/nodes/integrations-expert/lessons/a-measurement-must-not-change-the-state-under-test.md)
remains canonical for ensuring that collecting a metric does not alter what
it measures.

# Evidence and limits

Evidence: OKF proposal from oats-operator-expert/coord-trial-kit-expert, 2026-11-02; notes/claude-transcript-turns.md.

The observations are source-reported from Claude Code 2.1.308 smoke runs.
This harvest read only the captured note and proposal, not transcripts, and
did not run a parser or validate token totals. No universal transcript
schema, complete cost model or result for other harnesses is claimed.
