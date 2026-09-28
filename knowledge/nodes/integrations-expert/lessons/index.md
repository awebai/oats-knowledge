# Lessons

Hook, testing and release discipline learned building providers against the kernel's contracts.

## Hooks and provider state

* [A lifecycle hook never trusts the ambient environment](a-lifecycle-hook-never-trusts-the-ambient-environment.md) - Inputs come from the payload, persisted meta or the instance home, because the invoker may be another instance.
* [A hook reports only the cleanup it confirmed, and keeps the credential a retry needs](a-hook-reports-only-the-cleanup-it-confirmed.md) - Emit meta before failing, claim only confirmed effects, re-check uncertain ones, and delete a local key only after the remote record is gone.
* [Settings reach hooks as a payload, and the brief tells the agent where they are](settings-reach-hooks-as-a-payload-and-the-brief-tells-the-agent-where-they-are.md) - One merged payload in, one brief line and persisted meta out; advisory hooks warn, required hooks fail.
* [Host-only settings are declared in the manifest and refused by the resolver](a-merged-provider-payload-cannot-enforce-host-only-keys.md) - The node's one home for hostOnly: machine facts come only from the host file, and the resolver, not the provider, refuses them elsewhere.
* [A provider that owns an in-life lifecycle owns its state file and its verbs](a-provider-command-never-rewrites-the-kernels-instance-record.md) - Keep in-life state in a provider file mirrored through hook meta, never in instance.json, and teach the provider's verbs, not the native mutations.

## Kernel contracts

* [A document a provider writes for the kernel passes the kernel's own rule](a-provider-answer-is-validated-by-the-kernel-not-by-the-reviewer.md) - Vendor the kernel's validator on the provider's stage; a new key is a wire question; operation keys are bare names.
* [A provider test that fakes the kernel's payload proves nothing about the kernel](a-provider-test-that-fakes-the-kernel-payload-proves-nothing-about-the-kernel.md) - Read the kernel's merge for a key before giving it meaning, and change the kernel rather than guess in the provider.
* [A fallback the contract defines is implemented in every path and is a warning](a-fallback-the-contract-defines-is-a-warning-not-a-readiness-problem.md) - Every mode and readiness take the defined default and warn; readiness derives the value exactly as spawn does.
* [Type availability failures, but rethrow domain errors untouched](type-availability-failures-but-rethrow-domain-errors.md) - A typed availability wrapper catches only transport and unusable-source failures and lets custody, path and validation errors pass.

## Acceptance against the real tool

* [A fake CLI that accepts what the real binary refuses hides a broken hook](a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md) - Fakes model refusals; the gate is the whole lifecycle on the published binary; one exported floor; the rehearsal controls which binary runs.
* [Integration guidance and local validation follow the real contract](guidance-names-only-verbs-the-target-cli-exposes.md) - Name only verbs the CLI exposes, read the manifest over prose, and validate a service-defined value the same way in every path.
* [A client view that contradicts the source of truth is a client defect](a-failing-readiness-diagnostic-is-not-a-missing-fact.md) - Read the authoritative source and the message-level envelope, and never rewrite a live identity to satisfy a view.
* [A grant is proven per path at the receiver](a-grant-home-needs-a-custody-reference-for-encrypted-receive.md) - Custody attachment is necessary, not sufficient; scopes do not name the endpoints a path calls, so rehearse each path and direction.

## Packaging and release

* [A provider release is mirrored and pinned in one PR after the tag](a-provider-release-is-mirrored-and-pinned-in-one-pr.md) - Tag in the package repository, then one framework PR carries the tag-identical payload and every pin; the gate runs the Desktop suite.
* [Prefer a narrow integration-owned wrapper, and document its support matrix](prefer-a-narrow-integration-owned-wrapper-over-a-third-party-cli.md) - Own a JSON-first wrapper with credentials from the environment, and state what is supported, human-only or unsupported.

## Messaging service seams

* [A team per workspace needs a service primitive](a-team-per-workspace-needs-a-service-primitive.md) - The messaging service has no idempotent team create-or-return; its human-login conclusion is superseded by the default-team decision.
* [A global instance identity's address is released only by the authority that owns its lifecycle](a-global-instance-identity-leaves-a-permanent-address-behind.md) - Settle which authority releases a global identity's address and joins further teams before defaulting instances to global.
