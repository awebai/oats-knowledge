---
type: Decision
title: Soul declares identity and intrinsic requirements, config assigns deployment policy
description: A soul carries what it is and what it intrinsically needs (kind, source-complete capability requirements, defaults, knowledge interests); scoped deployment configuration assigns bindings, settings, targets and policy; manifests and packages never carry deployment targets.
tags: [kernel, config, targeting, souls, requirements, portable-souls, layers]
timestamp: 2026-09-20
---
# Rationale

**Origin (2026-07).** Decided 2026-07-11 (capability packages) and 2026-07-13
(config shape) by the founder; the deployment-over-forks boundary dates from
2026-07-11. The principle: whatever is *identity* travels with the soul;
whatever is *deployment policy* lives in scoped configuration owned by the
adopter. In its 2026-07 form the soul declared only its **kind**, and
configuration declared the families that exist and assigned capabilities,
layers, settings and exclusions to global, family or soul targets. The earlier
shape kept membership lists in configuration, away from the soul they
described; renaming that shape without inverting membership was rejected
because the inversion, not the label, was the improvement.

**Amendment 2026-09-14/20 (Portable Souls, accepted by the human; official
capabilities decided with the human 2026-09-20): the soul side grew from
"kind" to "identity and intrinsic requirements".** A portable soul declares
its **source-complete capability requirements** — the capability, its source
and revision policy — so it can be acquired independently of any private
upstream configuration; **defaults** as fallbacks among permitted choices; and
its **knowledge interests** (which node it owns, which it reads). The official
operate-on-OATS capability is written into the soul definition at creation as
an ordinary requirement with its catalog source, visible and removable; the
kernel adds no ambient operational skills and a soul without it is a valid
OATS-unaware soul. The reasoning is the 2026-07 principle applied honestly:
what a soul *needs in order to be itself* is identity, and letting the kernel
or a deployment confer it by magic hid identity in the wrong place.
An expert who rejects a soul because it declares `requires` is applying the
2026-07 letter against the 2026-09 principle. In the Portable Souls model
there is **no repository capability-default tier and no family entity**:
workspace defaults fill choices the soul leaves open, soul requirements
constrain every composition, and an explicit operator choice may rebind
defaults and bindings but never erase a requirement; conflicts report both
origins. Family targeting survives only in the legacy classic-config
deployments that the [fresh-install-first rollout](/nodes/oats-expert/decisions/fresh-install-first-rollout.md)
preserves unmigrated.

**What configuration still owns, unchanged since 2026-07:** deployment
bindings and settings, provider selection among permitted choices, private
team and human identifiers, store locators, exact executable approvals and
local exclusions. Portability is not possession of credentials: a soul can
carry the software it needs, never another operator's credentials, team
enrolment or machine paths, and a missing deployment input is an explicit
`needs configuration`, not a false launch.

Where layered classic configuration applies, specificity is fixed — soul over
family over global, then closer scope — and an equal-specificity conflict fails
with provenance rather than depending on declaration order. "Global" is
scope-local, never machine-universal by implication.

**Manifests and packages never carry deployment targets.** Letting a package
select its own targets was rejected: reuse would carry deployment policy,
violating scope ownership and soul portability. Reusable behavior belongs in a
capability; deployment-specific acquisition, targeting, bindings and settings
belong in scoped configuration; neither manifests nor portable souls record
deployment names. A package profile may *recommend* targets because it is
config source material, but the adopter's resolved local config is always
authoritative and no package can make a capability, family assignment or
setting mandatory.

Knowledge, messaging and tasks remain formal, exclusive slots. Making every
capability additive was rejected because those contracts are part of the OATS
pattern and competing providers for one slot must stay explicit.

Deferred by design in 2026-07, not forgotten: tag or selector targeting,
multiple types per soul, and per-instance targets. The Portable Souls model
resolved the family question by removing the entity rather than extending it;
add dynamic targeting to the classic model only under real maintenance
pressure.

# Related

[Keep kernel responsibilities generic and capability runtimes complete](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md);
[Local configuration remains authored policy](/nodes/oats-kernel-expert/decisions/local-policy-is-not-package-policy.md);
[Operating OATS is capability content; the reviewed list is the marketplace](/nodes/oats-expert/decisions/official-capabilities-and-reviewed-marketplace.md);
[Portable Souls roll out fresh-install-first](/nodes/oats-expert/decisions/fresh-install-first-rollout.md).

# Current contracts

- [Current configuration.md](https://github.com/awebai/oats/blob/main/docs/configuration.md)
- [Current capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/config-shape-agent-types-and-injections.md` (2026-07-13); SHA-256 `0236004f0a692d444beca8215bc43fbb6ebd0993c63d8d60ab6349435e6becb6`.
2. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/capability-packages.md` (2026-07-11, targeting and option 4); SHA-256 `6e01d2c9a44912af6a2405b3949e4af7c76a503f61afd0f6d57552cf0093ff74`.
3. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/workspace-configs-over-subpackages.md` (2026-07-11); SHA-256 `9ca4e3e2e312c78d261fa8e428d8506e1334836c09c8e560d5612bf1def880e1`.
4. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/distribution-packages-config-profiles-and-requirements.md` (2026-07-26, adopter sovereignty); SHA-256 `c9109cecd0d4622152718436afe5836ea56e00bf7afa52b261eb13da683fb9cc`.
5. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/official-capabilities-oats-core-setup-and-marketplace.md` (2026-09-20), explicit soul-definition declaration.
6. Accepted design `docs/design/2026-09-14-portable-souls-and-git-workspaces.md` §4 "Source-complete soul requirements" and §12 "Two authorities, one resolver" (accepted 2026-09-15), and `docs/workspace-adoption.md` "The five framework experts", in [awebai/oats](https://github.com/awebai/oats).
