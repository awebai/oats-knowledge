---
type: Lesson
title: Release judgement for the tag-driven lane
description: Publication is irreversible and idempotent per version, so it runs before fragile housekeeping, is never re-tagged, and is proven only on the installed artifact from outside the checkout; a provider release is mirrored and pinned in one PR, every version literal is a release step, a pin that can lag names its lag, and breaking provider and kernel releases move in lockstep.
tags: [stewardship, release, ci, npm, packaging, pins]
timestamp: 2026-09-21
---
**Owner: oats-expert. Update-on-change: whoever changes the release workflow,
the runnerless lane or the release skill revises this concept in the same
change.** The release procedure is the `git-tag-release` skill and the
repository's [release lane](https://github.com/awebai/oats/blob/main/docs/release-lane.md);
this concept holds only the judgement a maintainer needs when cutting a
release.

# Decisions the lane embodies

- **Tag, not manifest, is the version (2026-07-21).** CI derives the version
  from an immutable tag on a commit reachable from `main`; the manifests on
  `main` are bumped *after* publication. A local version bump is a release
  defect, not a convenience.
- **Kernel, runtime adapter and Desktop release from one tag as one version
  (2026-07-25).** Instance isolation spans kernel launch flags and adapter
  discovery, so a version drift between them is a correctness bug. The
  distribution package (`oats.framework`) is the deliberate exception: its
  tag is decoupled so capability content ships without a kernel cut
  ([official capabilities](/nodes/oats-maintainer/decisions/official-capabilities-and-reviewed-marketplace.md)).
- **Kernel first, providers floor on it (2026-09-21).** When a kernel release
  introduces manifest fields, the provider releases that declare them are cut
  after it and floor on it, because every earlier kernel's closed validator
  rejects the fields. **A breaking provider release and a kernel that refuses
  its predecessor move in lockstep** (2026-09-26: the knowledge provider's
  4.0 needed kernel 0.29, which refuses its 3.x): the release notes lead with
  the upgrade order, and old deployments keep their kernel until they move
  their pins.
- **The runnerless lane is first-class (2026-09-05).** No release capability
  may depend permanently on hosted CI or hosted messaging. A runner outage or
  an urgent release may take an explicit human risk override, and the release
  report names what was bypassed.
- **No maintenance line for a version nobody runs (2026-09-24, agreed with
  the human).** In-flight work that began against a superseded line lands on
  `main` and ships in the next release; the old release branch is left inert.

# Publish first, housekeep second

Registry publication is idempotent per version and cannot be undone, which
fixes the order of everything else:

- **Irreversible publication runs before fragile housekeeping.** Workflow-bot
  PR creation is denied by an **organisation-level Actions policy**, not the
  repository toggle, so the workflow's bump-PR step fails by design: treat
  that failure as expected, not as a signal, and open the bump PR by hand from
  the branch the workflow pushed. Its merge gate differs from every other
  PR's — it carries `[skip ci]` and never gets checks, so the gate is a diff
  of exactly the version manifests and locks at the tag's version; anyone
  waiting on its CI waits forever.
- **Never retag a burned version.** Publish skips an already-live version, so
  a partially shipped version cannot be re-tagged to ship the rest — cut a
  fresh patch. A recut *before* publication is the only legitimate reuse of a
  version. **Registry propagation lag is not a failed publish:** a version
  can take minutes to become visible; a "not found" in that window is a
  reason to wait and re-query, never to retag or republish.

# What the pre-merge gate cannot rehearse

Anything that only runs on a tag has never run when the PR is reviewed. A
packaging-config defect (2026-07-24) survived an exhaustive review chain and
failed the real run. The elimination route — installer builds verify-only on
PRs, fail-fast off — has landed; the residual judgement is to distrust any
"rehearsed" claim for a path with no PR-time run, and to read release-run
history rather than the reviewer's report. Check `main`'s own CI, not only the
PR's: a guard that fails only under CI's shallow clone once kept `main` red for
days while every PR looked fine.

# Verify the artifact, not the diff

- A parse error has **file-wide blast radius**: one bad character in a shared
  script disabled every hook of an integration while a grep-level check
  passed (2026-07-10). Everything shipped is syntax-checked.
- A **repo-local probe cannot see packaging**: the `files` whitelist, bin
  links and adapter resolution are exercised only by installing the packed
  artifact into a clean prefix outside the checkout. Without the whitelist
  the tarball would have shipped souls, instances and private knowledge
  (2026-07-10). When adapter or discovery behaviour changes, run a disposable
  *real harness session* from the packed artifacts — scaffold assertions
  cannot prove a harness loaded what was composed.
- A clean-room smoke that resolves through the live catalog is **networked**:
  green says nothing about a firewalled machine (2026-07-29), so the room
  publishes its own local package.

# Source → tag → pin, proven from both sides

An official capability exists in three places that must agree: its
authoritative source repository, a published immutable tag there, and the pin
the framework's catalog and workspace carry. Any copy the framework carries is
a byte-for-byte **mirror**, not an authoring surface (decided 2026-09-05,
inverting the 2026-07 bundled-first order). Tests enforce it from both sides,
so a pin cannot advance before its tag exists. **A provider release is tagged
in its own repository first, then mirrored and pinned in ONE framework PR** —
payload, catalog and workspace pins and the version literals reviewed as one
diff; a provider PR that lands ahead of its tag or pin breaks `main` on merge.
Mirror bytes are written only by the parity checker from the tag, never by
hand — a hand copy is how a 2026-09 release had to be recut. The provider-side
order and why the gate includes the Desktop suite are the integration node's
[mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md).
Catalog identity is discovery, not trust
([integrity, origin and consent](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md)).

# Every version literal is a release step

Editing a capability the repository itself locks changes its integrity, so
version and lock move in the same commit (2026-07-24). A version sweep limited
to the test tree missed a pin in a release script and forced a recut
(2026-09-20); the sweep covers tests, release and smoke scripts, docs, mirrors
and CI workflows. Pinned-version tests are a feature — they catch silent
drift at the cost that every release touches them — and each one left behind
fails the release lane, not the PR gate. Either the sweep enumerates them, or
— the preferable elimination — they read the version from the catalog so
there is one literal to move. A post-publication probe carried from release to
release goes stale the same way: rebuild its expected versions from the tag
each time.

# A pin that can lag names its lag

Within a day of the 2026-09-21 kernel-first wave, three unrelated components
refused with what read as corruption and was **a pin lagging a release**: a
bundled catalog snapshot behind a newer framework tag, a provider manifest
field ahead of an older kernel's closed validator, a deployment profile pinned
to an older bridge release. All three refusals were correct — each pin exists
to refuse an unreviewed revision. The lesson is that **the message must name
the lag and the re-pin**: "X differs from Y" sends the reader hunting for
corruption; "pinned X (r1) lags installed Y (r2); re-review the pin" sends
them to the decision that owns it.

- **Upgrading one side is a review event for the other.** The change that
  moves a release lists the pins that reference the old one and either moves
  them in the same change or records why not.
- **A snapshot of a moving list is a design smell.** Prefer reading the
  reviewed list at the revision the consumer already names; keep the snapshot
  only as fallback. A profile that pins a release is deployment policy: the
  framework's job is a legible refusal and an obvious re-pin path.

# What a release claim needs

A release claim names the exact tag, the published artifact, the installed
version and execution evidence from the published artifact — never a read of
the diff ([adoption evidence](/nodes/oats-maintainer/lessons/adoption-evidence-and-approved-scope.md)).
Release notes state what is **not** in the cut when related work ships in
later provider releases, so an independent re-run starts from a correct
expectation. **State the tag's own commit, not the last code merge**: the tag
usually sits on the release-notes commit one after the last merge, and the
registry records that commit; a claim wrong by one commit fails a verifier who
compares them.

# Related

[How the OATS project ships and reviews](/nodes/oats-maintainer/stewardship/review-protocol.md).

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (release lessons 2026-07-10 → 2026-09-22, `decisions/desktop-public-release-contract` amendment, `decisions/desktop-is-built-for-workspace-v2`), agents/cli-dev/soul/knowledge @ 7838d3ca (release-lane lessons, 2026-07-21 → 2026-07-29) and agents/oats-coordinator/soul/knowledge @ 7838d3ca (`release-lane`, `payload-publication`).
2. Migrated from agents/oats-expert/soul/knowledge/stewardship @ 7838d3ca (delivery-log: the lead's 2026-09-24 release playbook entries; the 0.29.0 lockstep, stale-probe and shallow-clone lessons).
3. Mirror + pin in one PR as practised by [awebai/oats#264](https://github.com/awebai/oats/pull/264) and [#266](https://github.com/awebai/oats/pull/266).
