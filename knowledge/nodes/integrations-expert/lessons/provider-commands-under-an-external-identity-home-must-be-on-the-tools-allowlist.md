---
type: Lesson
title: A provider command run under an external identity home must be on the tool's admission allowlist; a fake binary cannot tell you whether it is
description: aw admits only an exact allowlist of commands under --identity-home and refuses the rest with exit 2 to keep principal state from falling back to the working directory; oats.aweb 1.14.0 minted joined-team identities with aw team join under --identity-home, which is not admitted, and its suite passed because every join test used a fake aw, so a provider must read the tool's allowlist for every command it runs with an external home and prove admission against the real binary before a release.
tags: [integrations, aweb, identity, testing, release]
timestamp: 2026-09-25
---

**Observed.** The joined-team mint in oats.aweb 1.14.0 ran
`aw --identity-home <per-team home> team join <token>`. aw's identity-home
policy (identity_home_policy.go, every 1.36.x) admits an exact command list
under an external home and refuses everything else: "command … is not yet
identity-home-aware". `aw team join` is not listed; `aw id team
accept-invite` is. The provider's tests ran join and leave against a fake
aw, so nothing failed until the released source was read.

**Rules.**
- For every command a provider runs with `--identity-home` (or
  AWEB_IDENTITY_HOME), find it on the tool's allowlist in the released
  source at the floor version; if it is absent, use the admitted
  alternative the refusal names, or change the floor.
- Keep one test per such command that runs the real binary when present
  (skipped otherwise) and proves admission: the failure must be about the
  input (a bad token), never about the policy.
- The release gate for a lifecycle feature is one real run against the
  published binary (a scratch team), not a green fake-driven suite.
- Reviewer: reading the diff against the contract is not enough for a
  provider release; read the tool's admission surface for the commands the
  diff adds.
