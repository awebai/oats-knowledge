---
type: Decision
title: Consult explores accepted knowledge remotely; instances get no knowledge copy by default
description: Decided 2026-09-26 on the human's priority: oats.okf 2.2.0 adds read-only consult commands (bases, index, cat, ls, search, links) that serve a base's accepted commit from the host-wide blobless clone with reproducible receipts, materialize defaults to none for every deployment with full as the opt-in, one okf skill teaches consulting at task start and throughout, and every answer is confined to its base and to the accepted commit.
tags: [decision, okf, knowledge, consult, materialize, skill]
timestamp: 2026-09-26
---

Decided 2026-09-26 by the okf lane on the human's stated priority: instances
must explore their soul's knowledge exactly as they would a local copy (index
→ links → full files) but against the accepted remote state, with nothing
copied into the instance home. Until 2.1.5 every okf instance received a full
`./knowledge/` snapshot at spawn, and `read`/`refresh` wrote a new view
directory per call; for large knowledge bases that costs disk, spawn time and
staleness.

**Decision.**

1. **Consult commands** ship in oats.okf 2.2.0 as the capability's own CLI
   (`oats okf bases | index | cat | ls | search | links`), read-only, in a
   dedicated module. Each resolves the base's **accepted** commit, serves
   blobs from the host-wide blobless partial clone, fetches missing blobs
   lazily, and answers with a receipt `{ base, commit, fetchedAt }` so a
   citation reads `base/node/concept.md@<short-oid>`. `--fresh` refetches
   within the bounded freshness policy; nothing widens acceptance. Offline,
   the last-fetched accepted commit is served and the receipt says so.
2. **Confinement.** Every path resolves inside its base: absolute
   `/node/concept.md` paths and `--from`-relative links refuse anything that
   leaves the base root; directory bases likewise. There is no ref override.
3. **Materialization is opt-in.** The setting `materialize: none | full`
   defaults to `none` for every deployment. A spawn writes no `./knowledge/`;
   the brief points at the CLI. `full` keeps the local copy for small or
   offline setups. `read`/`refresh` become wrappers over `cat`/`index` and
   the per-call view directories go. No compatibility shim: homes that
   already hold a copy keep it.
4. **One skill.** The `okf` skill, loaded by every okf soul at session start,
   gains a consulting section: read the owned and read indexes at every task
   start, search or cat before a decision or before re-deriving, re-read the
   indexes after a compaction, navigate index → concept → links and never
   bulk-load, cite by base path and commit, never write accepted knowledge
   (harvest and PRs are the write path). The inject states the rule in a few
   lines and points at the skill and the CLI.
5. **Sequencing.** 2.2.0 branches from the released 2.1.5, carrying only the
   feature-gated `--harness` worker flag from the parked captured-code
   deletion; that deletion resumes as 2.3.0 rebased on 2.2.0. One implementer
   at a time in the package, cross-reviewed by the framework lead; the
   kernel needs nothing (a capability's `commands:` are its CLI). A Desktop
   knowledge browser over the same commands is a later phase via home
   operations.

**Gate.** A scratch 0.27.x deployment bound to a real central knowledge base
with `materialize: none`: from the instance home the consult commands answer
from the remote accepted commit with receipts, and the home holds no
knowledge copy.

Related: [workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md)
(package repositories carry their expert soul), and the integrations lesson
[a provider's wire answer must pass the kernel's validator on the provider's own stage](/nodes/integrations-expert/lessons/a-provider-answer-is-validated-by-the-kernel-not-by-the-reviewer.md)
(the consult surface is a capability command, not a kernel wire).
