---
type: Lesson
title: Distinguish question routing from human approval authority
description: Source-reported readings from 2026-11-02 distinguish question routing, plan approval, merge-review credit and human consent, without establishing uniform product authorization rules.
tags: [research, consent, authorization, delegation, personal-agents]
timestamp: 2026-11-02
---
# Dated conclusion

When comparing agent coordination products, ask separately **who carries a
question** and **who is authorized to approve the resulting action**. An
agent's ability to route a permission request does not, by itself, establish
its authority to supply the human's confirmation. A broker interface alone
therefore says little about the approval boundary.

This is a bounded, source-reported research conclusion as of 2026-11-02,
not a universal rule that consent can never travel through an intermediary
or that authorized delegation is impossible.

# Evidence and limits

The captured note reports two first-party examples:

- Claude Code agent-teams documentation routes permission prompts to the
  lead while denying a teammate the ability to approve a prompt or supply
  consent on the human's behalf [1].
- Google ADK Python PR #6462 reportedly fixes a path where a remote peer
  agent could supply a human confirmation [2].

The harvest inspected the captured note, not the live documentation, PR or
runtime behavior. The note does not preserve the ADK patch's implementation,
version coverage or tests. These examples support checking the distinction;
they do not establish a cross-product authorization standard, prove every
agent relay unsafe, or evaluate a channel that preserves authenticated human
authorization.

The note's broader assertion that four labs gate the same consequential
action classes lacks captured contract detail. No equivalent default policy,
coverage or enforcement across those products is inferred here.

## Plan approval is a separate authority boundary

A later source-reported reading of the same Claude Code documentation [1],
also dated 2026-11-02, adds a distinction missing from a simple
agent-versus-human approval label. For experimental agent teams, it reports:

- with the teammate's permission mode unchanged, a plan-approval request
  can be approved automatically without lead review;
- when the human explicitly puts the teammate in plan mode, the lead
  approves the plan or returns it, rather than asking the human to approve it;
- a teammate still cannot approve a permission prompt or provide consent
  on the human's behalf.

These are documentation interpretations, not a runtime enforcement audit.
The captured note preserves passages, but the proposal warns that the fetch
path returns model summaries; this harvest does not certify their wording
as verbatim. Availability is experimental, not a stable cross-product default.

The reported example is enough to challenge an unqualified claim that no
product has a coordinating agent with plan-approval authority. It is not
evidence that an agent can supply human permission or consent. The source
found no such consent feature in its survey; the capture does not establish
an exhaustive market-wide prohibition. The broader presence of lead/worker
interfaces already belongs in the
[supervision-pattern lesson](/nodes/market-research-expert/lessons/supervision-patterns-are-not-outcome-evidence.md),
not in a second product register here.

## Merge-review credit is not human confirmation

A separate recency proposal, also dated 2026-11-02, reports a contrast between
GitHub Copilot approval settings and the Claude Code team's own development
policy [3, 4]:

- GitHub reportedly lets an administrator opt in to counting Copilot's
  approval toward required repository approvals, with configurable path
  scope. This describes review credit under a configured gate, not an agent
  supplying a human's consent.
- The Claude Code team reportedly varies required human review by change
  risk, including a low-risk path without human approval once automated
  checks pass, while not counting an agent review as a person's approval.
  This is a reported team policy, not a contract for every Claude product.

The proposer says it rechecked both primary pages on 2026-11-02. That check
is **source-reported**: the capture preserves no exact page URLs or full
policy text, and this harvest did not fetch the pages or test enforcement.
The note also reports conflicting GitHub documentation without identifying
the conflicting pages; this harvest cannot resolve their scope or freshness.
Use the contrast as a lead to verify the configured gate, not as a certified
availability/defaults register or a blanket assertion that agents may merge.
No reviewer model or approval-quality evaluation is established here.

This extends the plan-versus-consent distinction rather than correcting an
accepted claim that no vendor permits agent approval; this concept made no
such universal claim. Automated review credit, omission of human review for
a risk class, human confirmation and permission to execute a merge are
separate properties. A vendor policy difference does not establish which
policy produces safer or more correct changes.

# Consequence for comparisons, not an OATS policy change

Compare the question-delivery path, plan-review decision, required-review
credit, human-confirmation path and executing tool's enforcement separately.
Record automatic plan approval separately from an actual lead-agent review.
Distinguish a model's assertion of approval from whatever authorization
evidence the product actually accepts; do not infer that either a direct
thread or a parent-agent relay proves the latter.
The [supervision-pattern lesson](/nodes/market-research-expert/lessons/supervision-patterns-are-not-outcome-evidence.md)
owns the separate question of whether an interface improves human outcomes.

The source suggests changing OATS question and approval handling. That is
not a decision of this research node and is not adopted here. The accepted
[coordination investigation](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md)
remains open, and [optional human attribution](/nodes/oats-maintainer/decisions/human-attribution-is-an-optional-messaging-contract.md)
is not superseded or made mandatory. This concept changes no operating
instruction, approval requirement or implementation contract. Any enforcement
change belongs in the owning capability's reviewed authorization design and
tests, not in a knowledge-only workaround.

**Owner and recheck:** market-research-expert. Recheck when Claude Code agent
teams leave experimental status, the cited vendor contracts or team review
policies change, approval-quality evidence becomes available, or a proposed
OATS approval primitive provides a readable contract and enforcement evidence.
Update or supersede this dated finding and log the change; retain unknown
behavior as unknown until then.

# Citations

Source-supplied locators, not independently audited by this harvest:

1. [Claude Code agent teams](https://code.claude.com/docs/en/agent-teams),
   source reading dated 2026-11-02.
2. Google ADK Python, PR #6462, source reading dated 2026-11-02.
3. GitHub Copilot approval announcement, dated 2026-10-28 by the source;
   source-reported primary-page recheck on 2026-11-02. Exact page locator
   absent from the capture.
4. Claude Code team's review-policy account, dated 2026-10-15 by the source;
   source-reported primary-page recheck on 2026-11-02. Exact page locator
   absent from the capture; a team policy, not a universal product guarantee.

Evidence: OKF proposal from market-research-expert/coord-personal-research-expert,
2026-11-02; notes/consent-must-not-be-relayed-between-agents.md.

Evidence: OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/coordination-products-have-coordinating-agents.md.

Merge-review refinement:

Evidence: OKF proposal from market-research-expert/coord-orgdesign-research-expert,
2026-11-02; notes/human-consent-agent-approval-split-2026.md.
