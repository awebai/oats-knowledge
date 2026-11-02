---
type: Conclusion
title: Capability distribution does not establish fleet pinning or safe provenance
description: The 2026-11-02 investigation separates capability distribution, contribution governance, content pinning and rollout evidence, without establishing a vendor-wide lockfile gap or measured convergence benefit.
tags: [research, capabilities, distribution, provenance, uncertainty]
timestamp: 2026-11-02
---
# Dated conclusion

Compare **distribution, version selection, content identity, review and
rollout to existing instances** separately. An organization-wide marketplace
or shared instruction repository does not by itself establish which content
a running agent received, whether it was reviewed, or whether every agent
received an update.

This is a **source-reported research conclusion as of 2026-11-02**, not an
audit of vendor contracts or a claim that OATS leads the market.

# What the investigation establishes and leaves open

The source reports organization-wide sharing mechanisms in Claude Code,
Cursor and GitHub, and contrasts ref/commit selection, latest-tracking rules
and registry versions [1]. Its GitHub default-branch interpretation is
explicitly an inference. The capture has no exact primary-page locators or
version-specific contracts sufficient to certify those install/update
semantics. The comparison axes survive; a definitive product feature matrix
does not.

The investigation did not identify a documented vendor fleet lockfile with
content hashes. This is a **bounded search result**, not proof that no vendor
has one: the capture lacks a reproducible survey inventory. It also supplies
no measured cost of copied-agent-configuration drift. Its Duolingo account
about repeated shell-script copies is an analogy from repository tooling,
not an agent-fleet effect estimate or proof that a particular template tool
solves agent rollout.

The note's public-registry security reports concern malicious or critically
risky skills, not controlled comparisons of pinned and unpinned fleets.
Their short summaries do not establish that lack of pinning caused the
reported harm or that pinning alone prevents it. A hash can identify a fixed
malicious input too; **content identity is not review or trust**. No registry
prevalence estimate or measured pinning benefit is promoted from this capture.

# Contribution governance is not demonstrated convergence

A round-3 pass on **2026-11-02** adds source-reported organizational examples
[4]: Uber's DevEx-owned distribution CLI, Stripe's common rule format with
subdirectory-scoped content, and AutoScout24's marketplace repository with
per-plugin CODEOWNERS and a required linter. The last account distinguishes
team autonomy to update existing plugins from governance of additions.
These are attributed company-practice leads, not independently audited
configurations or one shared contract implemented identically everywhere.
The captured summary retains names and dates, but no precise primary-page
locators, linter specification or runtime rollout evidence.

The useful distinction is between **who owns the distribution channel and
format, who may change team content, and what can reject a contribution**.
A required linter can check a declared invariant independently of a reviewer's
approval; its presence alone establishes neither the adequacy of the checks
nor whether running agents converge on reviewed content. Scoped rules and
team plugins are reported ways to accommodate local needs, not evidence that
overlays or forks are universally absent or inferior.

The investigation found no measured drift reduction, time-to-converge result
or documented RFC/board procedure in these accounts. This is a bounded
evidence gap, not proof that no such process or measurement exists. Do not
turn a reported governance pattern into a proven convergence strategy or
invent a consensus process to fill the gap. A selected invariant belongs in
reviewed tooling and executable checks; this research selects no OATS
capability governance or rollout design.

# Consequence for comparisons

Ask what is selected, what content is actually loaded, how its provenance is
reviewed and which existing instances change when a pin is updated. Require
evidence for those transitions rather than infer them from distribution
availability or semantic versioning. The research does not select a lock
format, prescribe an upgrade mechanism or certify an installation. If a
rollout invariant is adopted, enforcement and tests belong in the owning
implementation rather than a remembered warning about drift.

The [storage/maintenance comparison](/nodes/market-research-expert/conclusions/agent-knowledge-storage-2026.md)
owns the same investigation's layout and unchanged-configuration finding;
configuration edit frequency is not a measured stale-content rate. The
[approval-authority lesson](/nodes/market-research-expert/lessons/question-routing-is-not-approval-authority.md)
owns the existing distinction between agent and human approval; capability
distribution establishes neither.

**Owner:** market-research-expert. Recheck when version-specific primary
contracts document fleet content selection, contribution governance and
rollout, or controlled studies measure configuration divergence, convergence
time and review/pinning effects. Update or
supersede this dated finding and log the change. Do not retain the current
search gap as a permanent product limitation.

# Citations and evidence boundary

1. Claude Code marketplace documentation, Cursor team rules, GitHub shared
   instructions, the Agent Skills specification and MCP registry, as named
   by the source; exact pages/versions are not retained in the capture.
2. Duolingo, LDX3 June 2026 account, as described by the source; an analogy
   from repository tooling only, with no exact primary locator retained.
3. Koi and Snyk public-skill-registry reports, as named in the note; no exact
   report URLs, sampling methods or matched pinning comparison retained.
4. Uber DevEx accounts, dated March/October 2026; Stripe rule-format account,
   dated 2026-02-19; AutoScout24 marketplace account, dated 2026-05-07, all as
   named by the round-3 source. No exact primary locators or measured
   convergence outcomes are retained in the capture.

These broad source attributions are not primary-page checks, reproduced security results
or a product-availability audit. No measured model result is established for
the distribution comparison.

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/capability-sharing-pinning-and-identity-2026.md.

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/cross-group-convergence-and-cross-machine-messaging-2026.md.
