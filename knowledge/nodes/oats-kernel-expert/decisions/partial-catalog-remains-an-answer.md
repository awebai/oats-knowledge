---
type: Decision
title: A partial catalog remains an answer in both CLI forms
description: Exposing catalog problems preserves successful partial-answer semantics across text and JSON, the established diagnostic stream, and the distinction between a problem and a missing item.
tags: [kernel, cli, compatibility, diagnostics, catalog]
timestamp: 2026-10-13
---
# Decision and rationale

A partially readable catalog can still provide a useful answer. Exposing
problems previously omitted from text output should preserve the successful
partial-answer semantics already shared with JSON: choosing a representation
does not change whether the same read counts as an answer. This is a bounded
catalog decision, not a rule that every failed read or diagnostic must exit
successfully.

The source reports agreement by both maintainer sides on 2026-10-13 to show
all catalog problems through the established text problem-row stream [1].
Sending newly visible problems to stderr was proposed to protect scripts
consuming text, then rejected because existing text diagnostics already
appeared under the table. Moving only the newly exposed problems would split
one diagnostic list across streams. A general stream migration requires a
separate coordinated compatibility decision; a visibility repair does not
authorize it.

**A diagnostic is not evidence that an item is absent.** The source's producer
inspection found problems attached to retained but invalid or non-spawnable
items, as well as missing informational metadata [2]. A nonempty problem list
therefore cannot support a blanket claim that the catalog listing is
incomplete. Display each diagnostic with its existing item context; base a
missing-item conclusion on evidence of omission, not the diagnostic count.

The durable decision is the compatibility rationale and the rejected stream
split. Exact fields, formatting and producer behavior remain authoritative
in repository code and documentation. This record does not claim that the
implementation has merged or shipped.

# Enforcement

Keep the rendering repair in the kernel and cover the same catalog evidence
in text and JSON regression cases: successful partial answers, all diagnostics
visible in the established channel, and retained-item problems that must not
produce an invented missing-item conclusion. Tests enforce the chosen
behavior; this decision preserves why changing representation or revealing
more diagnostics must not silently migrate the contract. No delivered test
coverage is asserted here.

# Related

[Compatibility follows supported adoption](evidence-bounded-compatibility-and-migration.md)
owns the general compatibility boundary; this decision applies it to a
catalog visibility repair.

[The CLI as a machine boundary](../lessons/machine-boundary-contract.md)
owns the general semantic-exit and truthful-diagnostic obligations.

# Citations

1. The proposal and named note attribute the decision and stderr rejection to
   [the first maintainer comment](https://github.com/awebai/oats/issues/1098#issuecomment-6150347222)
   and [the second maintainer comment](https://github.com/awebai/oats/issues/1098#issuecomment-6150371757).
2. The proposal and named note identify
   [the item-context refinement](https://github.com/awebai/oats/issues/1098#issuecomment-6150627062);
   the note additionally identifies
   [the subsequent context comment](https://github.com/awebai/oats/issues/1098#issuecomment-6150685531).

Acceptance and producer inspection are source-reported. This harvest read
the proposal and its named note, not those discussions or the kernel
implementation, and does not independently establish human acceptance.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-upgrade-fixes, 2026-10-13; notes/partial-catalog-answer.md.
