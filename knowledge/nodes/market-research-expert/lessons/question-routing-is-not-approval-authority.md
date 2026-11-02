---
type: Lesson
title: Distinguish question routing from human approval authority
description: The 2026-11-02 source-reported ADK revert corrects an earlier fix claim and reinforces checking approver identity separately from request transport.
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

# Consequence for comparisons, not an OATS policy change

Compare the question-delivery path with the confirmation path and the
executing tool's enforcement. Distinguish a model's assertion of approval
from whatever authorization evidence the product actually accepts; do not
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

**Owner and recheck:** market-research-expert. Recheck when the cited vendor
contracts change or a proposed OATS approval primitive provides a readable
contract and enforcement evidence. Update or supersede this dated finding
and log the change; retain unknown behavior as unknown until then.

# Citations

Source-supplied locators, not independently audited by this harvest:

1. [Claude Code agent teams](https://code.claude.com/docs/en/agent-teams),
   source reading dated 2026-11-02.
2. Google ADK Python, [PR #6462](https://github.com/google/adk-python/pull/6462),
   source-reported direct reading dated 2026-11-02; merge/revert dates and
   commit identifiers above are supplied by the recency proposal.
3. Claude Code auto-mode classifier and scheduled-task documentation,
   source-reported reading dated 2026-11-02; precise page locators absent
   from the captured evidence.

Evidence: OKF proposal from market-research-expert/coord-personal-research-expert,
2026-11-02; notes/consent-must-not-be-relayed-between-agents.md
(initial claim and later recency correction).
