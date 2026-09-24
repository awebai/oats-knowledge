---
type: Decision
title: Separate operational home from granted work authority
description: Keeping lifecycle identity outside disposable work prevents work topology from silently becoming operational or knowledge authority.
tags: [kernel, instances, work-modes, boundaries, custody]
timestamp: 2026-09-20
---
# Rationale

Accepted 2026-07-27 by the founder after a kernel hardening review. A source
worktree is disposable; the instance's operational identity and custody cannot
follow whatever directory a command happens to run from. The accepted boundary
therefore separates a canonical instance home from its explicit work view, and
distinguishes three things older code had conflated: the deployment root, the
invocation scope of a command, and the instance's work context.

This prevents a secondary worktree's removal from erasing lifecycle state and
prevents repository commands from accidentally resolving a different
deployment. A readable soul link is not permission to edit the canonical source
outside review.

A consequence discovered the hard way (2026-09-05): an instance home is
gitignored but still sits *inside* the operator's checkout. A bare
version-control command run from the home walks up into that checkout and can
move a shared branch. Being ignored does not put a directory outside the
repository; the work tree is reached only by being in it or naming it.

**Every repository-scoped tool walks up the same way** (kernel developer
lessons, 2026-07-29 and 2026-09-05). Version control is not the only tool
that resolves the enclosing tree from the working directory:
- A package manager run from a home walks up to the enclosing checkout's
  manifest and runs that project's gate. It prints the right package name
  and passes.
- A whitespace check of the diff reports clean because the enclosing checkout
  is clean.

Agent harnesses make this the default rather than an accident. A shell's
working directory persists between tool calls, so one command that visits
the home to run an operational command leaves every later gate there.
Parallel tool calls are not ordered, so no call can rely on a directory
change made in another.

A verification gate therefore names its tree in the command itself, using
the tool's own directory or prefix option, and prints the branch it tested
beside the result. A gate that does not say which tree it ran on is not
evidence. Under workspace model v2 a home sits under the deployment
directory the operator chose, which may or may not be inside a repository
([workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md),
decision 16). The rule applies wherever some enclosing repository exists.

Work modes grant different repository discipline, not additional task
authority. A read-all/edit-none workspace mode exists for cross-repository
coordinators (2026-07-17); its read-only discipline is instructional, like every
other mode's. Permission-based enforcement was rejected because OATS is not a
sandbox, and pointing the soul's repository provenance at the workspace was
rejected because the boundary comes from configuration, not from provenance.
Work-mode briefings are deliberately not overridable by configuration
(2026-07-17): they encode the safety discipline, and an override knob was rope.
An independent directory worker is a real non-Git execution case, not an
implicit checkout fallback or an OS sandbox. Its configured context supplies
policy without becoming a writable target. Knowledge files, capture and
publication mechanics belong to the selected capability, not to inferred
work-mode privileges.

**A cold bootstrap needs its own honestly proven entry** (accepted slice of the
portable-editions decision, 2026-09-20, with the human). A persistent
assistant that *requires* its knowledge provider is not an ownerless
first-install helper; inventing a fictitious persistent host, parent or
knowledge owner solely to reach a helper hides that distinction. The adopted
route — select a real source's exact helper edge and invoke its lifecycle with
that source relationship — remains useful but does not prove cold bootstrap;
a genuinely fresh entry is a distinct, separately proven path, and a dedicated
helper record alone is not root authority: a missing, forged or transplanted
marker must never turn a source-parented child into a root. The exact
helper-entry contract is undecided and is deliberately not recorded here as
pending direction.

# Related

[External knowledge needs source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md);
[Kernel-composed text is executable surface](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md);
[Identity and location belong to the resolved object](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md).

# Current contracts

- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)
- [Current instance-boundary.md](https://github.com/awebai/oats/blob/main/injects/instance-boundary.md)
- [Current work-directory.md](https://github.com/awebai/oats/blob/main/injects/work-directory.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/canonical-instance-home-and-work-boundary.md`; SHA-256 `91566d97cf02f8d98492a78d68f021a83847182d924d8191b32596f8c15ac287`.
2. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/workspace-work-mode.md` (2026-07-17; its PR-harvest special case is superseded by universal PR delivery, 2026-09-13); SHA-256 `9c9e1b31ed1b2994f328d15abb761e6356e2dbdc556bb95b7469e5d0c5ae4067`.
3. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/marketplace-workmodes-runtime.md` (2026-07-17, work-mode briefing rationale only); SHA-256 `0351c556a8b758e806eab3f5ff29578f128947c82a5c8786e207e7f0b40bf6a7`.
4. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/instance-home-bare-git-cwd.md` (2026-09-05); SHA-256 `f5e5d46a2ab659043c7a42cf368c425bbd62ffce64f1ccd57f4c307e8f2fcc85`.
5. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/portable-role-editions-and-bootstrap.md` (2026-09-20), accepted bootstrap clause only.
6. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/npm-prefix-in-worktree-instances.md` (2026-07-29), judgement only.
