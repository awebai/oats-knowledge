---
type: Decision
title: Human attribution is an optional messaging-capability contract
description: Add human attribution through a provider-neutral messaging contract, default new onboarding to human-bound mode where supported, and preserve unchanged operation for capabilities and deployments without human identities.
tags: [messaging, human-identity, onboarding, compatibility, contracts]
timestamp: 2026-11-02
---
# Decision

On 2026-10-30, Pepe set the review bar for the onboarding redesign: a
messaging capability may provide human identities as well as agent
identities. When it does, an agent spawned by a human traces back to that
human identity, so OATS can show which human the agent belongs to. The
kernel and CLI consume that fact through a capability-neutral contract,
not a provider-specific integration.

Human-bound mode is the default for new onboarding where the messaging
capability supports it, **not a requirement for using OATS**. A capability
that supplies no human identities still works. Existing deployments with
no human bound keep working unchanged; they are not forced to re-onboard.
Optional attribution must not turn absence into a compatibility failure.
Onboarding skills and flows must teach the same design the contracts support.

# Why

Attribution makes the human behind an agent explicit without making one
messaging service part of the kernel's model. Requiring human identities
universally would exclude otherwise usable messaging capabilities and
break existing no-human deployments. A provider-specific shortcut would
also prevent a different capability from supplying equivalent functionality.
These are review constraints, not descriptions recoverable from code.

# What this preserves

- The [served-identity decision](/nodes/oats-maintainer/decisions/served-identity-is-a-messaging-layer-fact.md)
  keeps identity rules in the messaging capability. Human attribution is an
  additional fact, not a replacement for the principal an instance serves
  or a decision to add provider vocabulary to kernel flags.
- The [default-team decision](/nodes/integrations-expert/decisions/a-workspace-has-a-default-team-there-is-no-personal-team.md)
  remains in force: no personal team, account-level team creation, a root
  consumed by OATS, and no human login in spawn, mint, retire or wake. The
  redesign adds provenance to that root rather than reviving the rejected
  human-login lifecycle path.
- The [human-identity custody condition](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md#coherence-rules-that-hold-whatever-is-built)
  still requires agreement with the messaging side before code signs as a
  human. This attribution decision does not resume the deferred threads UI
  or settle signing-key custody.

# Attribution consent is a human choice, not terminal work (2026-11-02)

The source reports Pepe's further direction on 2026-11-02, relayed by the
release-lane maintainer in mail `bc0b1bc6`: agents execute onboarding and
attribution commands; the person's acts are clicks, logins and answers.
**Acceptance is source-reported**, not independently verified from that
private relay. The [newcomer acceptance decision](/nodes/oats-operator-expert/decisions/onboarding-passes-on-the-newcomers-experience.md)
owns the general onboarding direction and its secret-entry, login and
shell-capturing-install exceptions; this section adds its attribution-design
consequence rather than creating a second onboarding procedure.

Human binding and steward approval are not reasons to ask the person to type
commands. Design required consent as a click or login: the agent performs the
permitted setup operation and the person makes the identity-owning choice.
The account-claim flow, where an agent requests the claim and the person
clicks a verification link, is the source's model. Documentation should name
the setup expert as the executor rather than leave a bare command addressed
to the person.

A design needing the human's own signing key goes to the release lane before
implementation; an agent must not take custody of that key to satisfy the
no-typing goal. This strengthens the existing before-build custody review,
not a grant to sign as the human or a settled key-storage design. Consent,
identity authority and execution permission remain different requirements.

This direction does not supersede native authentication, the scoped
[desktop-persistence handoff](/nodes/integrations-expert/lessons/desktop-persistence-apply-is-a-human-handoff.md)
or a harness refusal. The [auto-mode finding](/nodes/oats-operator-expert/lessons/intake-consent-does-not-predict-auto-mode-approval.md)
rejects a general guarantee that a conversational yes permits a retry.
Implement the intended consent flow and executor wording in the owning
provider and setup guidance, with acceptance coverage; knowledge is not an
execution workaround. No implementation or rollout is certified here.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-02; notes/agents-run-every-command.md.

# Scope and acceptance of the original direction

This records direction, not a completed contract or implementation. At
capture the contract was undecided and nothing was built. Both sides must
decide the contract before implementation; the
[onboarding effort's lane arrangement](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md#onboarding-redesign-delegation-2026-10-30)
owns release coordination and the
[release-only review decision](/nodes/oats-maintainer/stewardship/onboarding-redesign-release-only-review.md)
owns review. Wire fields, custody mechanics and provider commands are not
specified by this concept.

Acceptance is **source-reported**: Pepe, directly to the release lane in
session on 2026-10-30. The public
[brief of record, awebai/oats#1665](https://github.com/awebai/oats/issues/1665)
was read during harvest on 2026-10-30. It confirms that the publishing agent
reports this human direction, including optional human identities,
provider-neutral contracts and backwards compatibility. That is
**source-reported (relay at the brief)**, not verified human authorship.
No private session or implementation was audited.

# Citations

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-30; notes/onboarding-redesign-juans-side-builds.md.
