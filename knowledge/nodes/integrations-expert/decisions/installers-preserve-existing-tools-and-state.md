---
type: Decision
title: Installers start from existing tools and preserve their ownership
description: An OATS installer reuses suitable existing tools, installs only missing ones, upgrades only its own installs, and preserves identities and configuration for adoption rather than replacement.
tags: [integrations, installers, adoption, ownership, human-direction]
timestamp: 2026-10-26
---
# Direction and rationale

The source records the project's human owner directing this approach on
2026-10-23, relayed through the lane maintainer: an OATS installer starts
from what the person already has. A machine is not a blank environment for
the integration to normalize. Existing tools, identities, harness settings,
plugins and deployments are inputs to adoption, not debris to replace.

This is recorded human direction, not an inference from the installer's
current implementation. The rationale is that many adopters already have
the prerequisites and working state; installing another preferred toolchain
can silently change which executable runs, even without deleting the old
one. Preserve the person's ownership instead of treating file survival as
proof that nothing changed.

# Consequences for installer design

- Discover each tool through PATH and inspect its version before planning an
  install. Reuse an existing tool that meets the required floor; install
  only what is missing. Discovery does not grant authority to replace or
  shadow a present but unsuitable tool.
- Do not put a version manager's global shim ahead of an existing install.
  The reported Omarchy case was a global mise selection taking precedence
  over an npm, nvm or system installation. Creating a second install is not
  harmless if command resolution now bypasses the person's choice.
- Upgrade only tools the installer itself installed. Identify upgrade
  guidance by installation origin rather than prescribing one global
  upgrade command for every discovered tool.
- Keep existing identities, harness configuration, plugins and deployments.
  Hand their discovery to the onboarding agent for adoption; do not silently
  overwrite them or create replacements to make the installer look uniform.

This decision constrains installer ownership. It does not authorize
onboarding to mutate or re-enroll discovered state, nor make an unsupported
existing version acceptable. Such cases need an explicit resolution outside
the installer's automatic missing-tool path.

# Enforcement and related boundaries

The elimination route is an origin-aware install plan and regression
fixtures with pre-existing toolchains and user state: assert reuse, no
resolution shadowing, and no upgrades of tools the installer did not own.
Keep exact version floors, discovery rules and package-manager commands in
the implementation and its docs, not as a second specification here.

PATH discovery is distinct from the lifetime of a generated invocation:
[persisted launchers record verified executable paths](/nodes/integrations-expert/lessons/persisted-launchers-need-recorded-kernel-paths.md).
Finding a suitable tool also does not substitute for
[host-install consent](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md)
when something really is missing, or for the
[human persistence handoff](/nodes/integrations-expert/lessons/desktop-persistence-apply-is-a-human-handoff.md).

# Evidence and limits

Evidence: OKF proposal from integrations-expert/integrations-expert-omarchy-oats-standard, 2026-10-26; notes/installer-starts-from-what-is-installed.md.

The note records the human owner's direction and date through the lane
maintainer; no correspondence is reproduced. The proposal identifies
awebai/oats-omarchy#22 as its implementation. Acceptance, PATH precedence
and implementation are source-reported, not independently audited by this
harvest. The direction is for OATS installers generally; the reported
implementation evidence is limited to one integration.
