---
type: Lesson
title: A bridge's home marker is retirement state, not harmless bookkeeping
description: An undeclared bridge marker can make an otherwise disposable home require recovery, so runtime-side bookkeeping should reuse runtime-owned state rather than add home bytes.
tags: [kernel, runtime, bridges, retirement, baseline]
timestamp: 2026-10-15
---
# Lesson and rationale

Do not treat a runtime bridge's marker in an instance home as free internal
bookkeeping. In the reported pi fresh-home investigation, a marker intended
only to remember a start would also change the kernel's retirement decision.
The marker was rejected, not shipped as a new lifecycle contract.

Retirement compares home contents with the spawn baseline. A new marker
outside the kernel-receipt and declared capability-disposable exclusions
becomes changed home content. Even a helper, reviewer or failed launch that
produced no useful work can then require a recovery copy, which diagnostics
subsequently report. The bridge's small convenience imposes a retention cost
on every home where that marker remains.

This is not a claim that every non-kernel write changes retirement: a
capability can declare disposable home roots through
`retirement.disposable.home`. The relevant constraint is that the runtime
bridge is not a capability and has no such declaration route. Choosing a
hidden name does not create an exemption; top-level `.oats-*` names are
reserved for kernel entries and capabilities' exact names.

The design lesson is to derive the bridge's per-home signal from state the
runtime already maintains outside the home, rather than create an
undeclared home marker. This governs bridge-owned bookkeeping, not the
instance's legitimate task knowledge or a prohibition on all native harness
writes. The [pi fresh-home decision](/nodes/oats-kernel-expert/decisions/pi-fresh-home-uses-runtime-sessions.md)
applies it without duplicating this retirement rationale.

# Elimination route and limit

A reviewed declaration path for runtime bridges could make disposal intent
explicit. Alternatively, a lifecycle regression could prove that bridge
startup and restart bookkeeping leave the retirement home digest unchanged,
separately from deliberate task writes. The proposal records both routes as
deferred for this one-bridge repair; this lesson is a guard until enforcement
exists, not evidence that either route is implemented or approved.

Do not solve the symptom by broadening digest exclusions informally or
rewriting old baselines. The [independent digest-version decision](/nodes/oats-kernel-expert/decisions/baseline-digests-have-an-independent-version.md)
protects the meaning of spawn-time evidence. Likewise, an avoidable recovery
copy is not a later deletion authorization: [leftover diagnostics report
facts, not disposal verdicts](/nodes/oats-kernel-expert/decisions/retire-leftovers-are-facts-not-deletion-verdicts.md).

# Related

- [Kernel and capability responsibilities](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md) owns the generic-seam boundary; a bridge does not acquire capability authority by writing into a home.
- [Home and work authority](/nodes/oats-kernel-expert/decisions/home-work-authority.md) owns the operational-home boundary; this lesson adds the rejected marker's retention consequence, not a new work-mode grant.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-pi-fresh-state, 2026-10-15; notes/fresh-home-signal.md.

The source attributes the marker rejection to review of
[awebai/oats#1251](https://github.com/awebai/oats/issues/1251), with the repair
in [#1254](https://github.com/awebai/oats/pull/1254). The note records the
initial review finding; the proposal qualifies its kernel-receipts-only
wording with capability-disposable exclusions and supplies the deferred
elimination routes. The investigation and reported merge were not
independently reproduced or audited by this harvest; no human acceptance
is inferred.

Verified by the knowledge maintainer at review of the harvest, 2026-10-15,
by reading [awebai/oats#1254](https://github.com/awebai/oats/pull/1254) and
its discussion, and the capability documentation at `990cc76b`; nothing was
run. The pull request, merged on 2026-10-15 at `990cc76b`, records that its
first review round rejected the bridge's home marker because retirement
would keep a recovery copy of every started pi home and top-level `.oats-*`
names belong to the kernel and capabilities; the merged bridge writes nothing
in the home, and a test checks that a fresh home is left byte-for-byte
unchanged. The capability documentation at that commit defines
`retirement.disposable.home` as a capability manifest declaration of hidden
top-level home entries. The verdicts establish maintainer review, not human
acceptance.
