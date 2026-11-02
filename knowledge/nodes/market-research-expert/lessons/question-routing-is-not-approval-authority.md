---
type: Lesson
title: Distinguish question routing from human approval authority
description: Source-reported product readings from 2026-11-02 distinguish question routing, teammate-plan approval and human permission or consent, and a reported ADK revert corrects an earlier fix claim, without establishing a universal ban on relayed authorization.
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

The initial captured note reported two first-party examples: Claude Code
agent-teams documentation routes permission prompts to the lead while denying
a teammate the ability to supply human permission or consent [1], and Google
ADK Python PR #6462 was described as fixing remote-peer confirmation [2].
**The latter fix claim is withdrawn by the source's later recency pass.**

## Correction: the ADK transport guard was reverted

In a later proposal on 2026-11-02, the source reports directly fetching PR
#6462 [2]. It reports a merge on 2026-08-17 (`9e9eaa6`) rejecting tool
confirmations arriving over A2A, followed by a revert on 2026-08-20
(`9a32eba`). Its account of the revert gives two reasons: rejecting that
transport also blocked legitimate human-in-the-loop confirmations, while
HTTP run endpoints that were unauthenticated by default left another path
open. Thus the attempted transport restriction was neither a sufficient
approver-identity check nor compatible with all legitimate confirmations.

This corrects the earlier example, not the question-versus-approval
principle. Do not cite that merged PR as a lasting consent fix without
checking the subsequent history. Equally, a reverted transport restriction
is not evidence that agent assertions constitute human authorization.
The retained lesson is to examine **the approving principal and the
executing endpoint's enforcement**, rather than infer either from the
transport used to carry a response.

The harvest inspected the captured proposal and note, not the live PR,
patch, endpoints or tests. The direct fetch is **source-reported**, not an
independent security audit. These inputs establish no current affected-version
range, exploitability assessment or resolution status beyond the reported
merge/revert history. They do not prove every relay unsafe or evaluate a
channel that preserves authenticated human authorization.

The knowledge maintainer's review of this correction, on 2026-11-02,
confirmed in the google/adk-python repository that commits `9e9eaa6`
(2026-08-17) and `9a32eba` (2026-08-20) exist and that the revert's message
gives both reasons above [2]. That checks the reported history, not the
current code, endpoint defaults or any later fix.

The same recency note attributes two further distinctions to Claude Code
documentation read on 2026-11-02: the auto-mode classifier treats another
agent's approval claim as untrusted, and a fired scheduled-task trigger
cannot itself supply approval or consent [3]. These are source-reported
documentation readings, not tested enforcement guarantees. The capture
supplies no precise page locators, versions or evaluation context for them;
use them as leads for checking authorization semantics, not proof of a
cross-product standard or of classifier accuracy.

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

# Consequence for comparisons, not an OATS policy change

Compare the question-delivery path, plan-review decision, human-confirmation
path and executing tool's enforcement separately. Record automatic plan
approval separately from an actual lead-agent review. Distinguish a model's
assertion of approval from whatever authorization evidence the product
actually accepts; do not
infer that either a direct thread or a parent-agent relay proves the latter.
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
teams leave experimental status, the cited vendor contracts change, or a
proposed OATS approval primitive provides a readable contract and enforcement
evidence. Update or supersede this dated finding and log the change; retain
unknown behavior as unknown until then.

# Citations

Source-supplied locators, not independently audited by this harvest:

1. [Claude Code agent teams](https://code.claude.com/docs/en/agent-teams),
   source reading dated 2026-11-02.
2. Google ADK Python, [PR #6462](https://github.com/google/adk-python/pull/6462),
   source-reported direct reading dated 2026-11-02; merge/revert dates and
   commit identifiers above are supplied by the recency proposal and were
   confirmed against the repository's commit history in review.
3. Claude Code auto-mode classifier and scheduled-task documentation,
   source-reported reading dated 2026-11-02; precise page locators absent
   from the captured evidence.

Evidence: OKF proposal from market-research-expert/coord-personal-research-expert,
2026-11-02; notes/consent-must-not-be-relayed-between-agents.md
(initial claim and later recency correction).

Evidence: OKF proposal from market-research-expert/coord-claims-verification-expert,
2026-11-02; notes/coordination-products-have-coordinating-agents.md.
