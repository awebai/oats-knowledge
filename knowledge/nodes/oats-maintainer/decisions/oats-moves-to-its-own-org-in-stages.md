---
type: Decision
title: OATS moves to its own GitHub org and npm scope by full transfer, in separate stages
description: Move OATS and its non-aweb packages to the oats-project GitHub org and npm scope by repository transfer, staged so the transfer ships alone and only the later declared-string and npm stages carry a bridge; never recreate a transferred name at the old owner.
tags: [organisation, repositories, npm, compatibility, migration, stewardship]
timestamp: 2026-10-30
---
# Decision and acceptance

On 2026-10-30 the directing human accepted, directly in the source
instance's session, that OATS and its non-aweb capabilities move from the
`awebai` GitHub organisation and npm scope to a new organisation and scope,
**`oats-project`**, by **full repository transfer**, **in stages**.

Seven repositories move: `oats`, `oats-okf`, `oats-engineering`,
`oats-cloning`, `oats-authoring`, `oats-omarchy` and `oats-knowledge`.
`oats-aweb`, `oats-apps` and `oats-machine` stay at `awebai` because they are
aweb-specific or by the human's call; `oats-jira` and `oats-linear` stay by
the human's call. The human also rejected the names `framework`, `oatshq`,
`oats-team` and `openoats`; do not re-propose them.

The acceptance is **source-reported**: the record is the session, which a
reviewer cannot read. Changing the destination, the set of moving
repositories or the transfer-not-copy choice supersedes a human-accepted
decision and needs that human's acceptance, cited.

# The stages, and why they are separate

A rehearsal with real GitHub transfers of throwaway repositories, on the
released kernel (0.69.6) and with pins on 0.47.0, 0.60.0 and 0.68.0,
established the fact that shapes the plan: **a transfer alone is invisible
to OATS**. With nothing edited after the transfer, adopter sync kept a
byte-identical lock, spawn worked, a fresh machine onboarded from an empty
cache, an official-style workspace whose member clones still named the old
remotes kept working, and anonymous https, ssh, partial fetch, raw and API
URLs, pushes, issues, PR create and merge, REST writes and every pin type
passed, including a version that exists only at the new owner. Moved-tag
detection still fired.

Breakage comes only from **changing declared strings**, because the kernel
keys membership and clones on literal repository strings and the clients
identify the CLI by its npm name:

- Flipping a member's backlink or the deployment's workspace key fails
  `oats workspace status` with `backlink-elsewhere` and spawn with
  `E_SOUL_UNKNOWN`. Membership files live in each member repository, so
  the flip is not atomic across repositories.
- A clone whose remote still names the old key then fails
  `E_CLONE_MISMATCH` until the remote is changed; any one matching remote
  passes, which is a usable transition aid.
- A client refuses a CLI whose reported package name is not the one it
  expects ("not the oats CLI"), so a renamed kernel fails with every
  installed client until the clients know the new name.
- Pins survive the transfer: a catalog pin's source is its catalog id, so a
  new catalog URL changes nothing while commit and digest match, and a
  `git:` pin edited to the new owner simply re-resolves. A transfer keeps
  tags and commits, so neither path trips `E_PACKAGE_INTEGRITY`.

So the move is three stages, and they do not travel together:

1. **Transfer** the repositories. This is the safe step and needs no kernel
   release; GitHub redirects carry every old URL in shipped catalog copies
   and locks.
2. **Change the declared strings** (membership backlinks, workspace keys,
   catalog URLs). This stage needs a **bridge release** that accepts both
   keys, because the flip is neither atomic nor backward compatible on its
   own.
3. **Rename the npm packages.** npm has no scope move; see the
   [republish-not-move trap](/nodes/oats-maintainer/stewardship/release-traps.md#a-package-rename-is-a-republish-not-a-move-2026-10-30)
   in the release judgement, which also holds the token deadline that
   bounds this stage.

The obvious plans get this backwards: they bundle a bridge with the
transfer, or treat the transfer as the risky step. A redirect smoke test
passes them and the string flip then breaks spawning.

# Coherence rule: never recreate a transferred name at the old owner

GitHub keeps a transferred repository's redirect only until a repository or
fork is created at the old name; creating one permanently ends it. Old CLIs
carry the old URLs in their shipped catalog copies indefinitely, so a later
repository in `awebai` named like a transferred one would silently break
every old CLI. No repository is ever created at `awebai/<transferred name>`.

# Rejected alternatives

- **Copy instead of transfer.** A copy loses Releases, issues, PRs and the
  redirects, and leaves every old CLI on a frozen repository.
- **Find-and-replace straight after the transfer.** This is the string
  stage without its bridge. Most occurrences of the old owner are history
  (issue references, release notes) and are not rewritten at all.
- **A v0.22-style clean break.** v0.22.0 moved `@oas-framework/oas` to
  `@awebai/oats` as a clean break with a migrate command that is gone, and
  never deprecated the old package. That is not a precedent here: it falls
  outside the bound of
  [pre-adoption contracts are removed, not translated](/nodes/oats-maintainer/decisions/clean-contract-precedent.md),
  which keeps reader compatibility for published commitments and real
  deployments.

# Open state (owner: oats-maintainer; whoever moves a stage updates this)

As of 2026-10-30 no real repository has been transferred, and the other
maintaining side has not yet decided the contract stages (the bridge's
shape and the string-flip order). The rehearsal's limits: tiny
repositories; no harness launched; no Desktop; Actions on a transferred
repository, triggers and the harvester's PR path not exercised. A pilot on
the smallest real repository closes those before the string stage is
planned.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/haiku-oats-migration-maintainer,
2026-10-30; notes/repo-move-is-a-contract-change.md;
notes/transfer-rehearsal-result.md.

The rehearsal results, the npm test and the human's acceptance are
source-reported; this harvest did not repeat the transfers or read the
session. The second note corrects the first on the spawn failure code
(`E_SOUL_UNKNOWN`, not `E_MEMBERSHIP_UNCONFIRMED`); the corrected code is
recorded here.
