---
type: Decision
title: Consult explores accepted knowledge remotely; instances get no knowledge copy by default
description: Decided 2026-09-26 on the human's direction: oats.okf 3.0.0 adds read-only consult commands (bases, index, cat, ls, search, links) that serve a base's accepted commit from a host-wide bare partial-clone cache with reproducible receipts, no instance holds any knowledge copy (no spawn snapshot, no per-call views; refresh removed, read kept as cat on one file), the okf skill gains a consulting section that teaches consulting at task start and throughout, and every answer is confined to its base and to the accepted commit.
tags: [decision, okf, knowledge, consult, materialize, skill]
timestamp: 2026-09-26
---

Decided 2026-09-26 on the human's direction (the human chose the shape and the implementer; the okf lane owns review and tag): instances
must explore their soul's knowledge exactly as they would a local copy (index
→ links → full files) but against the accepted remote state, with nothing
copied into the instance home. Until 2.1.5 every okf instance received a full
`./knowledge/` snapshot at spawn, and `read`/`refresh` wrote a new view
directory per call; for large knowledge bases that costs disk, spawn time and
staleness.

**Decision.**

1. **Consult commands** ship in oats.okf 3.0.0 as the capability's own CLI
   (`oats okf bases | index | cat | ls | search | links`), read-only, in a
   dedicated module. Each resolves the base's **accepted** commit, serves
   blobs from a host-wide bare partial-clone cache per Git base (one per
   host, shared, never per instance; directory bases are read in place),
   fetches missing blobs lazily under a per-base lock, and answers with a
   receipt `{ base, kind, commit, fetchedAt, stale }` so a citation reads
   `alias/node/concept.md@<short-oid>`. Freshness is a setting
   (`consult-max-age`) plus `--fresh`; a failed fetch serves the cached
   commit and says `stale`; offline with no cache is a typed error.
2. **Confinement.** Every path resolves inside its base: absolute
   `/node/concept.md` paths and `--from`-relative links refuse anything that
   leaves the base root; only Markdown is served; symlink and submodule
   entries are refused. There is no ref override: nothing widens acceptance.
3. **No per-instance copy, no compatibility shim.** A spawn writes no
   `./knowledge/` and no view directory. `read` stays because it is `cat` on
   one file with the same output; `refresh` is removed (`E_REMOVED` naming
   `index`/`cat`) because its meaning, rebuilding a local view, no longer
   exists and a verb that silently does something else misleads. A leftover
   `./knowledge/` from 2.x is reported as a legacy local view and ignored.
   The version is 3.0.0 because this breaks every consumer of the local
   copy; a 2.x home keeps its frozen module copy and its own instructions,
   so nothing is emulated.
4. **One skill.** The `okf` skill, loaded by every okf soul at session start,
   gains a "Consulting your knowledge" section that teaches the instance: bases and nodes, the accepted commit and the host
   cache, the start-of-task checklist (index the owned and read nodes, then
   the relevant concepts), the consult-while-working triggers (before a
   decision, before re-deriving, when a question touches the domain, after a
   compaction), navigation index → concept → links without bulk-loading,
   citing, freshness, and the gotchas, beside the bundle craft it already
   holds. The inject states the rule in a few lines and points at the skill
   and the CLI.
5. **Sequencing.** 3.0.0 branches from the released 2.1.5 and carries the
   feature-gated `--harness` worker flag; the captured-code deletion, parked
   as a pushed work-in-progress branch, resumes as 3.1.0 rebased on 3.0.0.
   One implementer at a time in the package (the human's Claude child),
   cross-reviewed by the framework lead; the okf lane reviews and tags; the
   kernel needs nothing (a capability's `commands:` are its CLI). A Desktop
   knowledge browser over the same commands is a later phase.

**Gate.** A scratch 0.27.x deployment bound to the real central knowledge
base (`github.com/awebai/oats-knowledge`): from the instance home the consult
commands answer from the remote accepted commit with receipts, the home holds
no knowledge copy, and the host cache exists once under the state directory.

Related: [workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md)
(package repositories carry their expert soul), and the integrations lesson
[a provider's wire answer must pass the kernel's validator on the provider's own stage](/nodes/integrations-expert/lessons/a-provider-answer-is-validated-by-the-kernel-not-by-the-reviewer.md)
(the consult surface is a capability command, not a kernel wire).
