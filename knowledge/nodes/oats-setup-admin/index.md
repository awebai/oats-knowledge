# oats-setup-admin

Judgement from administering a workspace's OATS setup and config: which
configuration changes went wrong and why, how a refusal or a misleading
answer was read, and what verification caught that an absence of errors
would not. Procedures live in the `oats.setup` skills and the repository
docs; onboarding, rebuild and cutover judgement lives in
[oats-operator-expert](/nodes/oats-operator-expert/index.md). This node never
holds one deployment's state (hosts, accounts, bindings, settings).

## Start here

* [A host-wide pi model is one `launch set` write](lessons/a-host-wide-pi-model-is-one-launch-set-write.md) - A machine-wide harness-and-model choice is a `souls.launch` host fact written by `oats soul launch set`, not a PR, launch-config or hand edit; resolve the nickname to pi's `provider/model-id` first and verify with spawn previews.
* [Diagnose "no harvests lately" from the base and the pin history](lessons/diagnose-missing-harvests-from-the-base-and-the-pin-history.md) - When asked why knowledge harvests stopped, count the base's `okf-harvest/*` PRs by date, line the drop up with the oats.okf pin history, and read the captured harvest instructions for host-dependent gates before auditing live instances; a provider fix reaches a home only on respawn, so the PR count recovers after respawns.

## Sections

* [Lessons](lessons/index.md) - Misrouted changes, misleading answers, and what verification caught.

## Read alongside

* [Place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md) - the placement rule a setup-admin's change must respect.
* [oats-kernel-expert](/nodes/oats-kernel-expert/index.md) - the launch contracts a host pin runs into.
