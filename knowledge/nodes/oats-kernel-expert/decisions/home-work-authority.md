---
type: Decision
title: Separate operational home from granted work authority
description: Keeping lifecycle identity outside disposable work prevents work topology from silently becoming operational or knowledge authority.
---
# Rationale

A source worktree is disposable; the instance's operational identity and custody cannot follow whatever directory a command happens to run from. The accepted boundary therefore separates a canonical instance home from its explicit work view.

This prevents a secondary worktree's removal from erasing lifecycle state and prevents repository commands from accidentally resolving a different deployment. A readable soul link is not permission to edit the canonical source outside review.

Work modes grant different repository discipline, not additional task authority. An independent directory worker is a real non-Git execution case, not an implicit checkout fallback or an OS sandbox. Its configured context supplies policy without becoming a writable target. Knowledge files, capture and publication mechanics belong to the selected capability, not to inferred work-mode privileges.

# Related

[External knowledge needs source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md).

# Current contracts

- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)
- [Current instance-boundary.md](https://github.com/awebai/oats/blob/main/injects/instance-boundary.md)
- [Current work-directory.md](https://github.com/awebai/oats/blob/main/injects/work-directory.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/canonical-instance-home-and-work-boundary.md`; SHA-256 `91566d97cf02f8d98492a78d68f021a83847182d924d8191b32596f8c15ac287`.
