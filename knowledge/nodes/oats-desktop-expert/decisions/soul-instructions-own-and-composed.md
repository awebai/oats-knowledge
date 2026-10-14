---
type: Decision
title: A soul's instructions and own skills come from opt-in inspection
description: Keep soul-authored content distinct from injected instructions, and read composed instructions and own skills through opt-in inspection fields gated by the authoritative host's features.
tags: [desktop, souls, instructions, skills, composition, feature-gating, latency, remote]
timestamp: 2026-10-14
---
# Decision and rationale

Accepted 2026-10-07/08 (human direction, maintainer contract decisions).
Shipped in awebai/oats#768 and #792; the kernel read is #751; the routed
follow-up is #795 (kernel) and #797 (Desktop).

**What the page shows.** The capability page already reads what a capability
injects. A soul's page needed the same for what the soul tells its instances.
The human asked for *both* the soul's own AGENTS.md and the AGENTS.md a new
instance gets once capabilities apply, "making it very clear" which part is
whose. The original Instructions design was one tree with two groups (the
2026-10-14 skills extension is below). "This soul" holds
the soul's own AGENTS.md. "Instance" holds AGENTS.md "after spawn, with
injects": the composed document, made of parts. The soul's part is headed
**From this soul**; every other part is headed **Injected by …**, with Open
capability for capability parts. The header text carries the distinction, not
colour alone. Wording was cut twice for length at the human's request: a
long label plus parenthetical read as clutter in a 220px nav.

**Why a flagged field, not a new command and not always-on.** The maintainer
rejected a new command: the soul's view is `inspect --soul`, and spawn preview
is about one spawn's options. The composition must be spawn's own, read-only,
so it costs a scratch materialization, about +0.7 s per inspect. Always-on
would charge every soul inspection, including ones that never show
instructions (the sidebar inspector, schedules, cache refreshes). So it is an
opt-in flag that only the soul page sends. Measured through the app, it adds
56–97 ms to a read of about 220 ms, so no separate parallel read was built.
The answer gives the soul body and each block as contiguous ranges into one
text, so the Desktop never re-parses markers to tell parts apart.

**Why routed souls needed more.** The Desktop gates on features, never on
versions ([CLI authority](standalone-product-and-cli-authority.md)). A remote
host's features were checked only inside the kernel's `--server` routing, and
the roster the Desktop polls never runs the host's version probe. So the
Desktop could not know whether a remote host composes. Two shortcuts were
rejected:
- *Send the flag and retry without it on refusal:* it branches on an error
  instead of a declared capability, and costs two SSH round trips on every
  uncached visit.
- *Probe on demand or persist routed probes:* that is probing on every poll,
  or written, stale and partial state.

The accepted design has the host report its own features in its status
answer, relayed by the roster as `probe.features`. Anything that is not an
array is unknown, and unknown means not supported. Hosts too old to report
read as unknown until they upgrade: a self-healing false negative, never a
false positive.

# Own skills extend the same inspection boundary (2026-10-14)

The source reports agreement on a soul's **own** skills, not the skills its
capabilities contribute. They belong with its instructions: a Skills group
between This soul and Instance makes authorship distinct while letting the
person read the files. This extends the earlier two-group design without
changing the separation of soul-authored and injected content.

Use an opt-in `oats inspect --soul <name> --skills` field, not another reader. The
reported choice carries file text inline under a finite aggregate budget,
listing omitted files rather than pretending their text was read. Only the
page that needs it pays for the content, and a routed soul answers in one
call. Rejected alternatives:

- **Per-file reads:** enlarge the CLI surface and charge a routed round
  trip for each file.
- **A new `souls show` verb:** forks the established soul inspection surface
  and needs separate routing.
- **Desktop reading the soul directory:** cannot read a routed soul's local
  files and recreates the second model rejected by CLI authority.

The `soul-skills` gate applies at the server boundary, not merely in the
renderer. Local use needs the CLI's declared feature; routed use also needs
`server-probe-features` and the held host roster row's declaration of
`soul-skills`. Otherwise the server drops the flag. A renderer request is
intent, not evidence of support; neither a version guess nor an optimistic
request followed by refusal supplies that evidence.

The view must distinguish unsupported reporting, a known empty list, a
reported listing failure and an unreadable contract. Reject a malformed
skills answer as a whole rather than display a plausible partial inventory;
this does not reject the rest of the soul inspection. Keep the group and an
explanation instead of guessing contents. The formal shapes, budget and UI
sentences belong in the current contract and tests, not a second knowledge
specification.

Skill names, descriptions and file contents remain the soul's words, never
Desktop-authored assertions. Apply the existing
[source-attribution decision](source-prose-is-an-attributed-quote.md), with
text or a strict file reader that admits no raw HTML, images or fetched
content. Spawn is the authority for which skills are the soul's own: reuse
its enumeration and pin inspection against its preview in a regression,
rather than maintain another discovery rule in Desktop. This is the
elimination route for inventory drift, not a code-layout map.

# Related

- [One standalone Desktop product](standalone-product-and-cli-authority.md):
  feature gating, and the kernel as the only source of deployment facts.
- [Browser-owned state and accessibility under repaint](../lessons/browser-owned-state-and-accessibility-under-repaint.md):
  the section is one long-lived controller, so a refresh keeps selection,
  focus and scroll.
- [Kernel-composed instructions are executable surface](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md):
  what the composed text is, from the kernel's side.

# Current contracts

- [Current docs/desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md) (`soul-composed-instructions`, `server-probe-features`)
- [Current soul-instructions.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/soul-instructions.mjs)

# Citations

1. Human direction 2026-10-07 (show both, clearly separated) and 2026-10-08 (shorter group wording).
2. Maintainer contract decisions 2026-10-07 (extend `inspect --soul`, one composer, opt-in flag) and 2026-10-08 (hosts report their own features; additive; no on-demand probing).
3. awebai/oats#751, #768, #792, #795, #797 (all merged).

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-soul-skills, 2026-10-14.

For the skills extension, the proposal identifies contract agreement in
[awebai/oats#1144](https://github.com/awebai/oats/issues/1144) and reports the
kernel and Desktop changes merged in
[#1178](https://github.com/awebai/oats/pull/1178) and
[#1201](https://github.com/awebai/oats/pull/1201). No backing note was named.
Agreement, implementation and regression results are source-reported, not
independently audited by this harvest; no new human-acceptance receipt is
inferred.
