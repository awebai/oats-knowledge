# Decisions

Accepted positions on how integrations are packaged.

* [Official package repositories separate the distributed payload root from repository tooling — and the owner soul never ships in the payload](official-package-repositories-separate-the-payload-root-from-tooling.md) - One payload root carries what the kernel copies and hashes; schemas, scripts, tests, workflows and the package expert's soul stay outside it; the repository root is not a package root.
* [Personal workspace teams and token-free admission ride one human login and the existing invite path](personal-workspace-teams-and-token-free-admission.md) - Design of record agreed with the messaging service for a zero-step personal team per (person, workspace) and for an entitled human joining a mapped team without a hand-carried token; implementation requirements, not released commands, and the integration composes them without changing its per-spawn path.
