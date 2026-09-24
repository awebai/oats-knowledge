---
type: Decision
title: Integrity, origin and consent are different proofs
description: Contained reproducible bytes, consistent provenance and explicit executable or host-install consent answer distinct trust questions; under workspace model v2 membership is the trust for member capabilities and a package's per-version approval is re-verified at spawn.
tags: [kernel, trust, integrity, consent, packages, security, workspace-model, approval]
timestamp: 2026-09-24
---
# Rationale

Founder decisions of 2026-07-12 (scope as trust boundary), 2026-07-26
(per-capability approval, separate host-install consent) and 2026-07-29
(provenance consistency). A digest can match while the artifact tells a
different origin story from the lock. Approval therefore needs provenance
consistency as well as content integrity. Acquisition from a local directory
does not turn acquired content into locally authored authority; official
discovery is not executable approval either. Trust every capability in an
official package automatically was rejected: repository identity is not
consent to independently updated executable code.

**The configuration scope is the trust boundary.** A capability authored at a
scope is trusted with that scope; an acquired one needs a lock and an integrity
match, so location alone can never confer trust and an acquired artifact cannot
masquerade as authored by dropping its lock. Resetting trust on every restore
was rejected as theatre.

**Workspace model v2 (2026-09-23/24): membership is the trust for members,
and an approval is verified where it is consumed.** On the new line the
trust decision for member capabilities is reciprocal membership, observed
with the operator's own access. This is the model a team already accepts for
a repository's committed agent skills
([workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md),
decision 2). It supersedes the configuration-scope boundary above for that
line only; classic deployments keep it.

Its consequence is a code-execution boundary. A member's hooks and scripts
run, at the member's latest state, on every operator's machine at spawn, and
only the handshake gates them. In a mixed public/private organisation,
executable capabilities therefore belong in packages or private members, and
public members carry souls. Applying that to a deployment is operator
judgement.

Packages keep a one-time executable approval per version, recorded in the
lock next to the commit it approved.
- **The spawn is the gate, not the write.** The executables digest is
  recomputed at the locked commit and must equal the approved one. The lock
  is an editable file: a copied approval next to a different commit would
  otherwise run hooks that nobody approved.
- **Never typed.** The digest is always computed. An unattended approval
  names exactly the entry the current resolution contains, and end-of-input
  at an approval prompt is a decline, never a yes.
- **Versions must be immutable.** A version whose tag moved fails integrity
  and asks again. A reference that resolves to a branch is refused, because
  a version must not move.

A trust boundary must contain the actual runtime bytes. Escaping manifest
paths, mutable hoisted resources and package-staging dependencies undermine
that boundary even when the manifest itself is hashed. Resolve an escaping path
by rejecting it or by hashing its real target; the trusted-framework exception
for kernel-hoisted resources never extends to external packages. Generated
provenance inside the digest must be replayable from exact locked data, not
today's tool version. Classify a spelling's policy class *before*
normalization erases it: a remote manifest's home-relative path is host-ambient
however absolute it resolves. A persisted field that is later re-parsed as
input is itself a trust boundary and must be validated against the writer's
exact grammar, not its prefix — read-only strictness is not enough once some
path turns the value back into a command — and "absent" must never collapse
with "present but malformed". Argument vectors remove shell injection, not
option injection
([hook failures and error messages are output channels](/nodes/oats-kernel-expert/lessons/hook-and-error-channels-disclose.md)
owns that rule); the lock-system consequence is a remote reference that
silently selects nothing and reports the wrong pin — a fail-open on the pin,
the worst failure a lock system can have.

Check order is not cosmetic: missing → drifted → provenance → untrusted,
because reporting "untrusted" for drifted bytes sends the operator to the
wrong repair.

**Keep separate decisions separate**: acquiring a package, activating behavior,
approving executable surfaces and installing host requirements authorize
different effects. None silently implies the others. Host-requirement recipes
are allowlisted structured data producing argument vectors, with consent,
execution and verification as separate steps — never shell strings; a
consented install that fails is fatal, an unaccepted one is not. A
runtime-package requirement is not a path requirement (founder ruling
2026-07-28: a messaging capability used from a runtime *requires* that
runtime's package rather than relying on an ambient host install): detect it
through the runtime's own contract, treat identity as per-runtime, accept that
an install plan may be a sequence covered by one consent, remember that
installed is not enabled, and yield no consentable plan for an unknown
runtime. Verify through the exact executable and scope the session will use,
and prefer a runtime's machine output over its human rendering whenever a
decision depends on a field. None of these consents asserts that a *secret
value is present*: credential presence is a per-human runtime fact, so
integrations surface a missing credential through an advisory spawn warning
and an actionable first-use failure, never through checked-in configuration
(2026-07-10, restated 2026-09-20 against the current requirement kinds).

Matching checksums do not authenticate a sender or grant permission to alter
credentials. Current per-capability closure and consent mechanics belong in the
package contract, not historical dependency-hash recipes.

# Related

[Capability resources must outlive package staging](/nodes/oats-kernel-expert/decisions/contained-capability-lifetime.md);
[Hook failures and error messages are output channels](/nodes/oats-kernel-expert/lessons/hook-and-error-channels-disclose.md);
[Identity and location belong to the resolved object](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md).

# Current contracts

- [Current packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)
- [Current capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/integrity-alone-cannot-see-disputed-origin.md`; SHA-256 `e8b5835e738f83369391d400e6e93ca6dd235e3b585e27d5a9c3cf609dcb0d56`.
2. OATS rationale source `agents/dev-coordinator/soul/knowledge/lessons/hashed-generated-provenance-must-be-replayable.md`; SHA-256 `a50dff1dba27fb203299023fd7028ec84f2f00553de3c49b6dea3d2281befe47`.
3. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/distribution-packages-config-profiles-and-requirements.md`; SHA-256 `c9109cecd0d4622152718436afe5836ea56e00bf7afa52b261eb13da683fb9cc`.
4. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/scoped-capability-store-and-templates.md` (2026-07-12, trust-boundary rationale only); SHA-256 `4376ec5c9d15359a6cf03df123c4939beccc9ea082e0bffe806b041849372c08`.
5. OATS rationale source `agents/integrations-expert/soul/knowledge/lessons/capability-artifact-paths-must-be-integrity-bounded.md` (2026-07-11); SHA-256 `a988383d4b16792cf65e61c8fcab00654d5492128ea5d7e24e279d8ee9c44e74`.
6. OATS rationale source `agents/integrations-expert/soul/knowledge/decisions/linear-task-interface-selection.md` (2026-07-10, credential-presence rationale only); SHA-256 `518b4e0277740bd8ce96ba8742f9d4199ad94913814d10443945f4e18d8b93cd`.
7. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/runtime-package-requirements.md` (2026-07-28); SHA-256 `b6ac44624494e769054a9481c0acf2a3b915c0d973eb3fe7521aafbffe5edc18`.
8. OATS rationale sources `agents/cli-dev/soul/knowledge/lessons/lock-source-strictness-prevents-reclassification.md` (SHA-256 `486aa777d35f9e4d5c3c464754702617ed9214a92165072c8dedee1a21ea9897`), `public-refs-are-option-injection-vectors.md` (SHA-256 `fd161c4df5e551eeaaa9635100cc2528cb221fc725773a0c14c08e5ed672fbf3`), `local-path-policy-before-expansion.md`, `requirement-recipes-data-allowlist.md`, `session-runtime-executable-scope-probe.md` (2026-07-26/28), principle only.
9. Accepted decision [workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md), decisions 2 and 13 (2026-09-23, refined 2026-09-24); framework `docs/design/2026-09-23-workspace-module-contracts.md`, "0.25.1 fix round" M3, "0.25.2 operator-rebuild round" R9 and the post-0.25.0 "member capabilities are a code-execution boundary" clarification.
