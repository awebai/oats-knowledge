---
type: Lesson
title: Release judgement for the tag-driven lane
description: Publication is irreversible and idempotent per version, so it runs before fragile housekeeping, is never re-tagged, and is proven only on the installed artifact from outside the checkout; official capability pins follow published tags in the same change, every version literal is a release step, a pin that can lag names its lag, and the runnerless lane is first-class.
tags: [stewardship, release, ci, npm, packaging, pins]
timestamp: 2026-09-21
---
**Owner: oats-expert. Origin 2026-07-10; consolidated 2026-09-05; extended
2026-09-21; cut to judgement 2026-09-22 (mechanics routed to the release
skill); extended 2026-09-24 with the lag lesson, the release-claim commit
rule and the lead's playbook entries. Update-on-change: whoever changes the
release workflow, the runnerless lane or the release skill revises this
concept in the same change.**

This concept holds the *judgement* a maintainer needs when cutting a release.
**The release procedure itself is the `git-tag-release` skill** (in the
oats-expert soul) and the release workflow in the repository; neither is
repeated here.

# Decisions the lane embodies

- **Tag, not manifest, is the version (decided 2026-07-21, release lane
  design; recorded by the kernel developer, owned by oats-expert).** CI derives the version from an immutable tag on a commit
  reachable from `main`; the manifest on `main` is bumped *after* publication.
  Consequence the repository cannot state: a local version bump is a release
  defect, not a convenience.
- **Kernel, runtime adapter and Desktop release from one tag as one version
  (2026-07-25, Desktop public-release contract).** Exact instance isolation
  spans kernel launch flags and adapter discovery, so a version drift between
  them is a correctness bug, not a packaging nit. Distribution packages
  (`oats.framework`) are the deliberate exception: their tag is decoupled so
  capability content ships without a kernel cut
  ([official capabilities](/nodes/oats-expert/decisions/official-capabilities-and-reviewed-marketplace.md)).
- **Kernel first, providers floor on it (2026-09-21).** When a kernel release
  introduces manifest fields, the provider releases that declare them are cut
  *after* it and floor on that kernel version, because every earlier kernel's
  closed validator rejects the fields.
- **The runnerless lane is first-class (2026-09-05).** No release step may
  depend permanently on hosted CI or hosted messaging; acknowledgements can
  travel as files. A runner outage or an urgent release may take an explicit
  human risk override, and the release report names what was bypassed.
  One candidate commit is tested once; later docs-only commits do not re-run
  green suites.
- **No maintenance line for a version nobody runs (2026-09-24, lead, agreed
  with the human).** When a minor line has been superseded and has no users,
  a maintenance branch for it is cost without benefit: in-flight work that
  began against the old line lands on `main` and ships in the next patch or
  minor, and the old release branch is left inert rather than maintained.
  The decision was taken alongside the Desktop's rebuild for workspace model
  v2, when the last work targeted at the previous line was redirected to
  `main`.

# Publish first, housekeep second

Registry publication is idempotent per version and cannot be undone, which
fixes the order of everything else:

- **Irreversible publication runs before fragile housekeeping.** The
  post-release bump PR has failed for reasons unrelated to the release;
  with this ordering each failure was cosmetic and rescued by hand from the
  pushed branch. The lasting discovery (2026-07-22, oats-expert) is that
  workflow-bot PR creation was denied by an **organisation-level Actions
  policy**, not the repository toggle — a 2026-09 reading that blamed workflow
  permissions is superseded. The detached-HEAD refspec failure is now fixed
  in the workflow itself and is no longer a lesson. **Playbook (2026-09-24,
  lead): the bump-PR step of the release workflow *always* fails under the
  organisation policy — treat its failure as expected, not as a signal, and
  open the bump PR by hand from the branch the workflow pushed.**
- **Never retag a burned version.** Publish skips an already-live version, so
  a partially shipped version cannot be re-tagged to ship the rest — cut a
  fresh patch. A release that recuts *before* publication ran is the only
  legitimate reuse of a version. Publication-token failures consume nothing;
  the same tag is rerun. **Registry propagation lag is not a failed publish
  (2026-09-24, lead):** a freshly published version can take minutes to be
  visible to an installer or a version query; a "not found" in that window
  is a reason to wait and re-query, never a reason to retag or republish.

# What the pre-merge gate cannot rehearse

Anything that only runs on a tag has never run when the PR is reviewed. A
packaging-config defect (2026-07-24: a scoped package name produced an
invalid Linux executable name) survived an exhaustive review chain and failed
the real run; a mac-only local build hid it and a fail-fast matrix cancelled
the legs that would have shown the extent. Elimination route: run the
installer build **verify-only on PRs** with fail-fast off — landed since; the
residual judgement is to distrust any "rehearsed" claim for a path that has
no PR-time run, and to read release-run history rather than the reviewer's
report.

# Verify the artifact, not the diff

Three findings established that a green suite and a read diff prove nothing
about what ships:

- A parse error has **file-wide blast radius**: one bad character in a shared
  script disabled every hook and command of an integration while a grep-level
  "verification" passed (2026-07-10). The elimination route (mechanical
  syntax-check of everything shipped) is in the workflow.
- A **repo-local probe cannot see packaging**: the `files` whitelist, bin
  links and thin-adapter kernel resolution are only exercised by installing
  the packed artifact into a clean prefix outside the checkout and running the
  real deployment path through it. Without the whitelist the tarball would
  have shipped souls, instances and private knowledge (2026-07-10). The
  clean-room smoke is in the workflow; the judgement that remains is to run a
  disposable *real harness session* from the packed artifacts whenever adapter
  or discovery behaviour changes — scaffold assertions cannot prove a harness
  loaded the composed resources.
- A clean-room smoke that resolves an official id through the live catalog is
  **networked**: a green run says nothing about a firewalled machine, and the
  failure there would look like a packaging defect (2026-07-29). The room
  therefore publishes its own local package.

Release promptly after breaking config-shape changes: once live configs
migrate, the previously installed kernel cannot read them outside the
checkout.

# Source → tag → pin, proven from both sides

An official capability exists in three places that must agree: its
authoritative source repository, a published immutable tag there, and the pin
the framework catalog installs. Any copy the framework carries is a
byte-for-byte mirror, not an authoring surface — this **inverts the 2026-07
bundled-first order** (decided 2026-09-05, oats-expert; see
[official marketplace](/nodes/oats-expert/decisions/official-capabilities-and-reviewed-marketplace.md)).
The order is enforced by tests from both sides (mirror manifest equals catalog
pin; the install test fetches the pinned tag), so a pin cannot advance before
its tag exists and pin, manifest bump and mirror bytes land in one commit. A
release was recut in 2026-09 because a ref bump moved without the mirror
bytes; the parity test is the elimination route (adopted 2026-09). Pinned-version
tests are a feature — they catch silent drift at the cost that every release
touches them — so treat them as part of the release, not noise. Catalog
identity is discovery, not trust
([integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md)).

**Playbook (2026-09-24, lead):**

- **A bundled provider's PR lands *with* its tag and catalog pin, never ahead
  of them.** `main`'s parity test requires the bundled version to equal the
  catalog pin, so a provider change whose tag is not yet cut, or whose pin is
  not yet moved, breaks `main` on merge. Cut the provider tag, then move the
  pin on the PR branch *before* squash-merging, so the merge commit carries
  bump, pin and mirror bytes together.
- **Mirror sync is the parity checker's finalize mode, never a hand copy.**
  A hand-copied mirror is how the 2026-09 recut happened; the checker that
  proves parity is also the only tool that writes it, so a mirror update is
  reproducible from the pinned tag rather than from whatever tree the author
  had checked out.

# Version bumps sweep the whole repository

Editing a capability the repository itself locks changes its integrity, so
version and lock move in the same commit or a clean clone fails restore while
warm local stores stay green (2026-07-24). A version sweep limited to the
test tree missed a pin in a release script and forced a recut (2026-09-20) —
the sweep covers tests, release and smoke scripts, docs, mirrors and CI
workflows.

**Every version literal is a release step (2026-09-24, lead).** A catalog
bump of a bundled provider is not one edit: the release-packaging test, the
mirror-parity test and the clean-room smoke each pin the version
independently, and each one left behind fails the release lane, not the PR
gate. Either the sweep enumerates them explicitly as a release step, or —
the preferable elimination route — they read the version from the catalog so
there is a single literal to move. Until the latter lands, a bump that
touches only the catalog is an incomplete release.

# A pin that can lag names its lag

Within one day of shipping the 2026-09-21 kernel-first wave, three unrelated
components refused with what read as corruption and was in fact **a pin
lagging a release** (2026-09-22, oats-expert): the kernel's bundled catalog
snapshot lagged a newer framework tag and refused onboarding as integrity
drift; a provider manifest field lagged an older kernel's closed validator
and was rejected at load; a deployment's runtime profile pinned to one bridge
release lagged the newer bridge installed globally and rolled back every
spawn. **All three refusals were fail-closed and correct** — each pin exists
precisely to refuse an unreviewed revision. The lesson is therefore not that
the pin is wrong but that **the message must name the lag and the re-pin**:
"X differs from Y" sends the reader hunting for corruption, while "pinned X
(r1) lags installed/published Y (r2); re-review the pin" sends them to the
decision that owns it. Two rules follow:

- **Upgrading one side is a review event for the other.** The change that
  moves a release *lists* the pins that reference the old one — catalog
  snapshots, profile files, edition requirements, validator floors — and
  either moves them in the same change or records why not. This is the
  cross-component form of the version sweep above.
- **A snapshot of a moving list is a design smell.** A bundled copy of the
  reviewed catalog is a convenience that will lag; prefer reading the reviewed
  list at the revision the consumer already names, and keep the snapshot as
  fallback for consumers that name none (the kernel adopted this in the patch
  that followed). A profile that pins a release is deployment policy, not
  framework code: re-pinning belongs to the deployment's human, and the
  framework's job is a legible refusal and an obvious re-pin path.

# What a release claim needs

A release claim names the exact tag, the published artifact, the installed
version and execution evidence from the published artifact — acquiring from
the tag and creating a soul, or onboarding from an empty directory — never a
read of the diff
([adoption evidence](/nodes/oats-expert/lessons/adoption-evidence-and-approved-scope.md)).
Release notes state what is **not** in the cut when related work ships in
following provider releases, so an independent re-run starts from a correct
expectation (2026-09-20).

**State the tag's own commit, not the last code merge (2026-09, second
verifier on a patch release).** The tag usually sits on the release-notes
commit, one after the last code merge, and the registry records that commit
as the package's `gitHead`. A claim that says "tag on the last merge" is
wrong by one commit and fails a from-the-tag verifier who compares the
registry's `gitHead` with the claim. Record the commit the tag resolves to,
say which code merge it sits on, and expect the verifier to compare both.

# Related

[How the OATS project ships and reviews](/nodes/oats-expert/stewardship/review-protocol.md).

# Citations

1. Legacy `agents/oats-expert/soul/knowledge/lessons/` `release-verification` (2026-07-10; tagged-commit rule added 2026-09), `npm-package-exports-and-files` (07-10), `package-smoke-tests-cross-checkout-boundary` (07-11), `npm-eotp-in-tag-release` (07-13), `release-bump-pr-org-restriction` (07-22), `release-ci-linux-build-unrehearsable-pre-merge` (07-24); `decisions/desktop-public-release-contract.md` amendment (07-25); `architecture/implementation.md` release-sync line; `stewardship/repo-state.md` organisation-policy item.
2. Legacy `agents/cli-dev/soul/knowledge/lessons/` `release-tag-driven-ci` (07-21), `exact-tag-detached-head-refspec` (07-25), `release-bump-pr-org-policy-block` (07-25), `release-workflow-static-tests` (07-25), `capability-source-edits-require-lock-refresh` (07-24), `clean-room-smoke-local-official-package` (07-29).
3. Legacy `agents/oats-coordinator/soul/knowledge/` `release-lane.md`, `payload-publication.md` (2026-09-05); current order verified against `docs/design/okf-mirror-provenance.md` in [awebai/oats](https://github.com/awebai/oats).
4. Legacy `agents/oats-expert/soul/knowledge/lessons/version-bump-grep-tests-before-push.md` (2026-09-20/21) and delivery-log release lessons of 2026-09-20 (tarball verification, honest release notes, decoupled distribution tag).
5. Elimination routes verified landed 2026-09-22 against the repository's release workflow (`refs/heads/` destination, syntax-check, idempotent publish, clean-room tarball smoke), the verify-only installer workflow (`fail-fast: false`), and the mirror-parity / release-packaging tests; kernel-first floor per `docs/release-notes/v0.24.4.md`.
6. Legacy `agents/oats-expert/soul/knowledge/lessons/pinned-release-lags-installed-release.md` (2026-09-22); `decisions/desktop-is-built-for-workspace-v2.md` (2026-09-24, the no-maintenance-line paragraph); lead's release playbook entries of 2026-09-24 (provider PR lands with tag + pin; version literals as release steps; checker-driven mirror sync; hand-opened bump PR; propagation lag ≠ failed publish).
