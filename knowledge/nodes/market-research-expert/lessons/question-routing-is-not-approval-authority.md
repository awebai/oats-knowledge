---
type: Lesson
title: Distinguish question routing from human approval authority
description: Two source-reported product examples from 2026-11-02 distinguish routing a request from an agent supplying human confirmation, without establishing a universal ban on relayed authorization.
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
2. Google ADK Python, PR #6462, source reading dated 2026-11-02.

Evidence: OKF proposal from market-research-expert/coord-personal-research-expert,
2026-11-02; notes/consent-must-not-be-relayed-between-agents.md.
