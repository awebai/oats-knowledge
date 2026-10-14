---
type: Decision
title: Shared readers separate client terms from attributed kernel prose
description: Keep one shared interpretation of codes, require each caller's terms explicitly, and return attributed kernel prose as separate parts rather than a string clients must parse.
tags: [desktop, shared-code, wording, attribution, rejected-alternatives]
timestamp: 2026-10-14
---
# Decision and rationale

The source records a 2026-10-10–13 decision for sharing Desktop readers with
another client: share the interpretation of codes and data, not an implicit
Desktop voice. Where a shared sentence needs client-specific wording, the
caller supplies its own terms explicitly, with no default. Desktop-only
remedies tied to a dialog or menu stay with that client; adding a term for
every control would turn the terms into a second description of the UI.

The goal was to preserve Desktop's existing wording while preventing a
second client from acquiring its own drifting table of meanings. Neutral
wording was rejected because it changed the first client's behavior and made
remedies less specific. A Desktop default silently prints the wrong client's
name when a caller forgets its terms; a module-level setter makes the answer
depend on shared mutable state. Required terms fail at the named public
function instead of producing another client's sentence.

The source also records why the terms use a module-private brand: duck typing
can admit incomplete objects, while an object registry would violate the
no-module-level-mutable-state condition. The accepted cost is that terms from
one evaluated copy are not valid in another. Fix duplicate loading rather
than weaken that check. Packaged graph and shell tests are the enforcement
route; this is not a claim that a single shell launch proves every view loads
correctly. [Shared-code packaging](shared-code-keeps-one-relative-path.md)
owns the packaging rationale.

# Keep the speaker at the reading boundary

A reader marks a reason read from the CLI's error envelope as kernel-origin
text; its own timeout, protocol failure or gate is not thereby kernel speech.
This does not reclassify source-authored prose merely transported by a kernel
envelope: the existing attribution decision still follows the actual origin.
Return the presentation parts separately—headline, client-authored lead and
kernel sentence—so a client can quote the kernel with its speaker without
parsing a joined string. A one-line form is those same parts joined, not a
second wording rule. Withheld or absent kernel text gets no dangling lead.

Likewise, message and remedy belong together at the attributed-rendering
boundary: the source's `kernelLines(message, fix, terms)` decision prevents
each caller from reconstructing that rule. A client must not recognize a
kernel warning by matching its prose. The producer owns that prose, and a
rewording is not a new machine contract.

This supplies the interface rationale needed to apply
[attributed source prose](source-prose-is-an-attributed-quote.md); that concept
remains the canonical visual and accessibility treatment. It does not require
every existing view to change presentation during a shared-code move.

# Scope and enforcement

Use required-terms tests, attribution/parts equivalence tests and shared
reader coverage to preserve the boundary. Keep the code's API inventory in
the repository. This decision concerns shared-reader behavior only: it does
not change CLI authority, decide product succession or authorize a second
deployment model.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-lfx-desktop-queue, 2026-10-14; notes/shared-readers-carry-desktop-wording.md; notes/an-error-reader-says-whose-words-it-carries-and-answers-the-parts.md; notes/the-terms-brand-fails-loudly-on-a-second-copy-of-the-module.md.

The proposal and notes report the expert's terms decision and agreement on
the attributed parts in [awebai/oats#855](https://github.com/awebai/oats/issues/855)
(comments 6111654641, 6111663016 and 6111784559), and implementation in
[#953](https://github.com/awebai/oats/pull/953),
[#1054](https://github.com/awebai/oats/pull/1054) and
[#1094](https://github.com/awebai/oats/pull/1094). Acceptance, implementation
and packaging checks are source-reported, not independently audited or run
by this harvest.
