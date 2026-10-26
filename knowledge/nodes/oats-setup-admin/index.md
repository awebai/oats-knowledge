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

## Sections

* [Lessons](lessons/index.md) - Misrouted changes, misleading answers, and what verification caught.

## Read alongside

* [Place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md) - the placement rule a setup-admin's change must respect.
* [oats-kernel-expert](/nodes/oats-kernel-expert/index.md) - the launch contracts a host pin runs into.
