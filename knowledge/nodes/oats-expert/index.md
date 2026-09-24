# oats-expert

Overall OATS direction, motivations, cross-domain planning and adoption
judgment; the vision and architecture record; stewardship judgement (how the
project ships, review protocol, release traps).

## Start here

* [Current OATS direction](roadmap/current-direction.md) - Dated priorities on the 0.25 line — workspace model v2 published, centralised per-soul knowledge for the amended roster (five experts plus the operator expert, the integrations expert and six package experts) in progress as Phase D, then Desktop parity as a native build on the kernel's JSON — with official capabilities (oats.core, oats.setup) and the reviewed official marketplace as the distribution model; nothing here claims a deployment has adopted what is published.
* [Workspace model v2 — membership is trust, location is not version, every capability is copied whole into the instance](decisions/workspace-model-v2.md) - One workspace per organisation whose reciprocal membership is the whole trust decision for member capabilities; a soul says where each capability comes from and never which version, packages are the only versioned thing, nothing is installed, every capability is copied whole into the instance at spawn, and harnesses start normally. Supersedes the revision-pinned import model of 2026-09-20 and the classic per-deployment activation surface.
* [Durable specialization preserves judgment across sessions](decisions/durable-specialization.md) - OATS exists to make agent expertise a versioned project artifact; durable specialist roles preserve reviewed judgment without replacing native sessions or forcing a universal assistant.
* [Optional reference theory, capability-owned runtime](decisions/optional-reference-theory.md) - OATS offers an adoptable reference knowledge theory while each capability owns its runtime behavior and may choose a different model.
* [Operating OATS is capability content; the reviewed list is the marketplace](decisions/official-capabilities-and-reviewed-marketplace.md) - Knowing how to operate OATS is repackaged as two official capabilities — a core every soul receives and a setup capability held by the setup expert — and the reviewed package list in the framework repository is the official marketplace, without a hosted registry; superseded in part 2026-09-23/24 (the core is a kernel default under workspace model v2; the setup expert became the operator expert and owns a node).
* [Second-operator acceptance](lessons/second-operator-acceptance.md) - An independent operator holding none of the authoring state is the acceptance gate for published definitions; its value is the absence of that state, its exit criterion is "every remaining item is named and owned", its failures fall into four owner-distinct classes, and its recurring finding — a contract adopted by one provider but not its siblings — is prevented by a same-release adoption rule.
* [How the OATS project ships and reviews](stewardship/review-protocol.md) - Contributed work reaches main only through PRs judged by the maintainer's four gates against exact heads; reviewers are fresh and ephemeral, tests must agree with the requirement rather than the code, and knowledge PRs get a semantic read.

## Sections

* [Decisions](decisions/index.md) - Accepted direction, rationale and rejected alternatives.
* [Lessons](lessons/index.md) - Cross-domain judgment learned the hard way.
* [Stewardship](stewardship/index.md) - How the project ships: review protocol, release traps, cross-workstream delivery.
* [Roadmap](roadmap/index.md) - Owned, dated direction snapshots.
* [References](references/index.md) - Genealogy and external sources.
