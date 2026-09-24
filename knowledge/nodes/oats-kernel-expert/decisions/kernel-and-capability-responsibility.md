---
type: Decision
title: Keep kernel responsibilities generic and capability runtimes complete
description: Native lifecycle and exact OATS-managed composition belong to the kernel while replaceable capabilities own concrete runtime behavior; since 2026-09-23 no harness carries an exclusive-visibility claim, the official core is a visible, suppressible kernel default, and credentials are never OATS-managed.
tags: [kernel, capabilities, layers, composition, boundaries, workspace-model]
timestamp: 2026-09-23
---
# Rationale

Decided 2026-07-11 by the founder (kernel/provider split), amended 2026-07-27
(ambient runtime extensions retained). The kernel/layer split rejects both
monolithic tool features and unrestricted competing implementations of one
fundamental responsibility. Soul and instance lifecycle are the OATS pattern
itself; knowledge, messaging and tasks remain explicit exclusive choices,
alongside additive capabilities. Exclusivity means one source of truth per
concern: whichever capability is bound to a layer owns that concern, and the
overlapping features of every non-selected tool stay off. The tool is the
adopter's choice, never the kernel's.

This preserves a stable specialization framework without requiring each
deployment to accept one memory or service model. A selected knowledge
capability owns its complete runtime, not just a backend beneath mandatory
kernel theory.

**The kernel composes capabilities only through generic seams** (decided
2026-07-27): declarative instance resources, lifecycle hooks, namespaced
commands and structured launch contributions. It must never branch on a
capability's identity. A layer's spawn hook is advisory and offline: it may
brief the instance from declared settings and warn when they are incomplete,
but it must not reach the external system or authenticate at spawn, because
spawn must never depend on a tracker or broker being reachable. Cleanup that
is human-visible work (for example closing a tracker roster) is a skill-level
protocol, not a retire hook.

**Composition is instance-local at spawn.** Materializing at config level and
relying on harness discovery was rejected (2026-07-11) because visibility would
differ by harness and unrelated souls could see the resources. Composition must
derive the expected resource set from the resolved config, prove complete
materialization, and fail closed; "copy what happens to exist" is not
composition. Scaffolded files carry package ownership so a package cannot
overwrite soul-owned or another package's artifacts.

**What the composition claim covers — and its 2026-09-18 narrowing.** The
2026-07-26 strict-curriculum decision set an exclusive, OATS-only visible
context as the target for every harness, with the durable test "two runtimes,
an unrelated ancestor skill present, both see exactly the recorded set". The
founder amendment of 2026-07-27 first narrowed it (shared ambient Pi extensions
retained; verify the runtime's package contract instead of duplicating its
resolver). On **2026-09-18 the human superseded the universal claim**:
[strict curriculum is a Pi-profile claim](/nodes/oats-kernel-expert/decisions/native-launch-strict-pi-only.md).
What stays for every harness: OATS builds the **complete resolved instance
home** (selected skills, capabilities and resources, composed instructions,
task, metadata, work placement, lifecycle wiring), records what it supplied,
and fails closed on missing or conflicting *OATS-managed* resources — that is
provenance of the OATS-managed subset. What no longer holds outside Pi's
strict profile: any claim that everything visible inside the harness came
from OATS. Claude Code and Codex launch natively with their own context,
skills, plugins and permission behaviour; native context there is expected,
not a failed check, and bypass flags are added only on explicit user opt-in.
The two-runtime exclusivity test is therefore a Pi-adapter test, not a
kernel invariant; do not defend it as one, and do not rebuild isolation
adapters for the native harnesses.

**2026-09-23: no harness keeps an exclusivity claim.** Workspace model v2
extended native launch to Pi
([native launch amendment](/nodes/oats-kernel-expert/decisions/native-launch-strict-pi-only.md)),
so the two-runtime exclusivity test no longer describes any adapter's
policy. Complete OATS-managed composition stays: every resolved capability
is copied whole into the home and recorded per module with source, commit
and content digest
([workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md),
decision 10).

Exact OATS-managed composition makes a role's curriculum inspectable and
exposes missing or conflicting resources before launch. It is not a sandbox:
runtime-native tools and ambient extensions remain. One accepted limit
stands: machines cannot detect contradictory natural-language instruction
blocks, so doctor exposes composed prose for humans rather than pretending to
adjudicate it. Keep current schemas and launch policies in their maintained
contracts, not a parallel knowledge specification.

**Credentials are never a kernel or capability concern** (human decision
2026-09-18, [harness authentication is native and user-managed](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md)).
The harness owns login, credential resolution and refresh; OATS launches it
in its native authenticated context and never parses, copies, stores or wraps
credentials, for any harness. Composition and curriculum are OATS-controlled;
authentication is harness-controlled; neither boundary justifies isolating the
other.

**Contracts versus capability functionality** (reaffirmed 2026-09-16 by the
redesign lead for knowledge, mirroring the [messaging boundary](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md)).
Kernel contracts are: the selected provider and its exact approval, captured
source and instance context, versioned opaque binding and invocation inputs,
lifecycle ordering and required outcomes, independent helper execution, and
retained authority with cleanup and custody obligations. Capability
functionality is: the knowledge model, storage and read views, episodic
conventions, the harvester and its prompts, promotion policy, validation,
delivery and acceptance semantics. No universal kernel harvester, mandatory
state-file layout, node/store model, promotion algorithm or Git publisher
follows from the contracts. Helper memory and injection behaviour is reviewed
as capability policy or an explicit neutral contract — never the default
knowledge capability's policy hardcoded into the captured path.

**Helper compositions declare policy per injecting capability** (helper/input
contract, 2026-09-17; framework adoption 2026-09-21). Every capability that
ships an injection declares how a *helper* composition treats it — inherit,
omit, or a file of its own — and a missing policy is a typed refusal, never a
guess; omission is not consent. A hook may opt into a versioned
source-receipt input, but no source-registration convention is imposed on
every knowledge provider. The framework's own choices carry their rationale:
the operate-on-OATS briefing is *inherited* because a helper is still an OATS
instance; the messaging injection is *omitted* because a harvest helper has no
messaging identity and must not be told it can mail. The rule generalised from
the adoption gap: any new manifest contract the kernel refuses on absence is
adopted by the framework's own capabilities in the same release that
introduces the refusal, and a packaging test enforces it — the framework's
packages are the first that must pass the contracts they impose.

**Operating on OATS is explicit capability content, not ambient kernel
behaviour** (decided 2026-09-20 with the human). The skills that teach an
agent to operate OATS were kernel-owned and appeared in every instance by
magic; a soul's definition did not show it received them, and they could not
be removed or replaced. They are now an official capability written
explicitly into a soul definition at creation, visible and removable: the
kernel never adds it silently, and a soul without it is a valid, deliberately
OATS-unaware soul. Only the briefings describing the layout the kernel itself
creates stay kernel-owned. This amends the composition rule above: the kernel
composes what the soul and its configuration declare, and nothing else.

**Amended 2026-09-23 (workspace model v2, decision 26).** The official core
is now a kernel *default*, including in the standalone view, where a soul
without it would be the hollow agent the framework refuses. It is visible in
the spawn preview, and any mention of the core in the soul suppresses it,
whether that mention names a source or says "off". The 2026-09-20 reasoning
survives in narrower form: nothing is conferred *invisibly*, and a soul can
still be deliberately OATS-unaware with one line. When the core resolves as
a module, the kernel's own "you run on OATS" briefing is suppressed so that
exactly one such block composes. A soul that turns the core off gets the
kernel's briefing back, so no instance is left without it.

# Related

[Optional reference theory](/nodes/oats-expert/decisions/optional-reference-theory.md);
[A minimal process boundary avoids permanent private coupling](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md);
[Soul declares identity and intrinsic requirements, config assigns deployment policy](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md);
[Kernel-composed text is executable surface](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md);
[Strict curriculum is a Pi-profile claim](/nodes/oats-kernel-expert/decisions/native-launch-strict-pi-only.md);
[Kernel supplies provider-neutral messaging intent](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md);
[Verified Claude Code launch and isolation facts](/nodes/oats-kernel-expert/references/claude-code-isolation-facts.md).

# Current contracts

- [Current capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/kernel-and-providers.md`; SHA-256 `33e2091b5e541fb17cdbe3d8b7c36b4604466cac4300624c8549e2fbd3139e21`.
2. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/strict-instance-curriculum.md`; SHA-256 `11f1e545a2eeebb17fd2d37df36be9722e90acae86d7fb51c5c4867eada70cae`.
3. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/runtime-contract-not-resolution-internals.md`; SHA-256 `7a7508abbc9868e80700bae98a2593865966464f259444c97a86516930d64fdf`.
4. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/capability-extension-seams.md` (2026-07-27); SHA-256 `0df09bb7bed31ea57e955ef7ab5b46a3d3db831588552f7d1f56308740732f37`.
5. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/capability-packages.md` (2026-07-11, options 3 and 5); SHA-256 `6e01d2c9a44912af6a2405b3949e4af7c76a503f61afd0f6d57552cf0093ff74`.
6. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/jira-over-aweb-tasks.md` (2026-07-10); SHA-256 `dbd596bad5920064a8f5dae72793f04081f1bffea60744064bdc69d42c893573`.
7. OATS rationale source `agents/integrations-expert/soul/knowledge/decisions/oats-jira-settings-contract.md` (2026-07-10, advisory hook rationale only); SHA-256 `5fae455d787971569ccb947bcd91ac0e5e24bd3ac534a5268161b59d0ab721da`.
8. OATS rationale source `agents/oats-expert/soul/knowledge/lessons/active-capability-resources-must-materialize-fail-closed.md` (2026-07-27); SHA-256 `9dbf7e16a75a2a6544003cbeaf43f287c2f6b116da6733f323cd336b5aae330a`.
9. OATS rationale source `agents/oats-expert/soul/knowledge/lessons/skill-discovery-repo-boundary.md` (2026-07-11); SHA-256 `9476d7a73e41272733f73f81a3e997d60d4e9ed852d1c1d977af4923f6b74fb6`.
10. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/provider-neutral-knowledge-and-harvest.md`, "Contract versus capability functionality" and "Accepted helper/input implementation contract" (2026-09-16/17).
11. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/helper-injection-policy-on-every-injecting-capability.md` (2026-09-21).
12. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/official-capabilities-oats-core-setup-and-marketplace.md` (2026-09-20), kernel clause only.
13. Accepted decision [workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md), decisions 10, 22 and 26 (2026-09-23), and framework `docs/design/2026-09-23-workspace-module-contracts.md`, "0.25.2 operator-rebuild round" R3.
