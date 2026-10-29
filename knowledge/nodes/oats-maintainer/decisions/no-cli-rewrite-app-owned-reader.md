---
type: Decision
title: CLI speed comes from Node fixes and an app-owned warm reader, not a native rewrite
description: Reject full and partial native CLI rewrites in favor of Node startup fixes and an app-owned warm reader that preserves kernel JSON authority without a separately installed daemon.
tags: [direction, performance, cli, desktop, tui, rejected-alternatives]
timestamp: 2026-10-29
---
# Decision and acceptance

The source records Pepe's acceptance on 2026-10-29: do not rewrite the `oats`
CLI in Rust or another native language, either in full or as a partial
native fast path for hot reads. Improve Node startup first, then amortize
repeated reads in an **app-owned warm reader**. Acceptance is source-reported
in the proposal and named note, with a decision-comment locator below; this
harvest did not independently verify the conversation.

The selected direction is:

- **Node fixes:** use the compile cache and load only the leaves needed by
  hot reads. The kernel node owns the separate
  [cache-placement rationale](/nodes/oats-kernel-expert/decisions/compile-cache-stays-in-the-per-user-oats-home.md)
  and [import-boundary decision](/nodes/oats-kernel-expert/decisions/hot-read-imports-preserve-contracts-and-static-boundaries.md).
- **App-owned reader:** Desktop's bundled server and the TUI start a child
  from the kernel installation they already use. That process keeps the
  kernel's own read code warm and answers the CLI's JSON envelopes over
  stdin/stdout. It dies with the app and exits when the installation changes;
  the app falls back to the CLI. There is no system service, socket or
  separate user installation or acceptance step for the reader.

These are lifecycle and ownership constraints, not a claim that the reader
has shipped. The app owns the process lifetime, not a second implementation
of deployment facts. This preserves the
[public process boundary](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md)
and [installed-kernel authority](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md),
rather than permitting private kernel imports into a client or a hidden
bundled operational kernel.

# Why this choice

The [kernel evaluation](/nodes/oats-kernel-expert/lessons/kernel-rewrite-does-not-remove-child-waits.md)
separates startup and module loading from provider, network and harness waits.
A language change does not remove unchanged external work. A kernel-only
rewrite would also leave the Node requirements of the capabilities and
clients in the evaluated system; it is not a Node-removal plan.

The source reports that the first Node fixes reduced `version` from about
195 to 59 ms and `session inspect` from about 223 to 93 ms. These are historical,
source-reported examples supporting the choice, not a cross-host performance
budget or a reproduced benchmark. The evaluation's roughly 3–5% spawn gain
from a rewrite was an estimate, not a measured equivalent native kernel.

The warm-reader comparison likewise informed the direction, not a performance
promise: the source quotes roughly 0.1 CPU seconds per Desktop tick for a warm
reader versus roughly 0.2 for starting a native binary per poll. Neither a
complete reader nor an equivalent native implementation was established by
that comparison. Keep the distinction between avoiding startup repeatedly
and making a newly started process cheaper; measure representative workloads
before claiming the delivered benefit.

# Rejected alternatives

- **Full or partial native rewrite:** adds per-platform builds and signing,
  plus duplicate maintenance of the most-read contract in the partial case,
  for startup savings the selected Node work aims to obtain without that
  distribution and contract cost.
- **System service with a socket:** adds installation, lifecycle management,
  discovery, socket permissions and stale-daemon risk after an update.
  App-owned lifetime was selected to obtain the warm-process benefit without
  that separate operational burden.
- **Desktop importing kernel code in-process:** breaks the client boundary
  and does not provide the TUI with the same benefit.
- **A maintainer agent as the reader:** replies cost seconds and tokens, the
  agent is restarted and compacted, and most hosts have no such agent. This
  responsibility belongs to an ordinary process, not an agent conversation.

# Reconsideration and contract boundary

Revisit a native rewrite only if **both** conditions remain: hot reads still
exceed roughly 150 ms after the Node fixes, **and** poll CPU remains a complaint
after the app-owned reader. That is a trigger to reconsider, not automatic
approval for a rewrite.

The reader's request/reply format, feature probe, version and fallback rules
are a public contract to take to the other maintainer side on the evaluation
issue before implementation. Being told about the direction is not agreement
to those details. This decision does not invent the protocol, certify that
review happened, or supersede the existing process-boundary decision.

On the same issue, the other side recorded no objection to the **shape**
(app-owned, no service or socket, the kernel's own read code, CLI fallback)
and named what it will check the contract for: every reply reflects the
deployment at request time (warm code, not warm data, with any cache and its
invalidation stated); replies indistinguishable from the CLI fallback,
including envelope, error codes and unknown answers; and a feature probe and
version rule matching the app's accepted CLI range, with remote routes
proposed out of the first cut. Those are review criteria, not an agreed
contract. The
messaging node's [batched-query rationale](/nodes/oats-aweb-expert/decisions/readiness-cache-needs-measured-cost.md)
remains a separate measured publisher concern, not proof this reader serves it.

# Evidence

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe, 2026-10-29; notes/no-cli-rewrite-app-owned-reader.md; notes/hot-reads-stay-off-core.md.

The source identifies [awebai/oats#1630](https://github.com/awebai/oats/issues/1630)
as the kernel 0.69.4 evaluation and
[comment 6494974298](https://github.com/awebai/oats/issues/1630#issuecomment-6494974298)
as the decision record. It identifies
[#1632](https://github.com/awebai/oats/pull/1632) and
[#1634](https://github.com/awebai/oats/pull/1634) as the Node fixes. These are
source-provided evidence locators, not independently audited acceptance,
merge, release or benchmark receipts from this harvest.

Checked by the knowledge maintainer at review on 2026-10-29: the decision
comment states the rejection of options D and E, the conjunctive
reconsideration trigger, the `version` and `session inspect` timings, the
app-owned shape and the ~0.1 CPU-second expectation; the issue body carries
the ~0.2 native-per-poll ceiling and the 3–5% spawn estimate; #1632 and
#1634 are merged. The other side's shape reply is
[comment 6494985666](https://github.com/awebai/oats/issues/1630#issuecomment-6494985666).
The rejection reasons for a system service, an in-process import and an agent
reader come from the source notes and were not checked against the issue.
