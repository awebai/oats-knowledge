---
type: Decision
title: A human addresses a long-lived agent through threads that are aweb conversations; the soul declares an interaction kind in its messaging settings
description: Threads in Desktop are aweb mail conversations between the human's own identity and the agent, read and sent through the messaging capability's JSON surface and keyed by a soul-level interaction kind in the messaging capability's settings; no second messaging channel, no UI layout in the kernel contract.
tags: [desktop, messaging, aweb, threads, human-interaction, soul-settings, direction]
timestamp: 2026-10-26
---
# Decision

Decided on 2026-10-26 by the lane's human (the shape, A–D below) and
confirmed the same day by the release lane's human, with the coherence
conditions below, on [awebai/oats#1103](https://github.com/awebai/oats/issues/1103).
The effort is launched; nothing of it had merged when this was recorded, so
the implementation is not evidence yet.

- **A.** A human may address an agent through **threads** in Desktop, as an
  alternative to typing into the agent's terminal.
- **B.** Each thread is an **aweb mail conversation** between the human's own
  identity and the agent, rendered per instance. A **read-only mail panel**
  shows the agent's inbox.
- **C.** A soul declares **how it is addressed** with a small semantic field,
  not a layout: `settings.oats.aweb.interaction: terminal | threads`
  (default `terminal`). For `threads` souls the in-session wake is **one
  line** naming the recovery command, not the message body.
- **D.** First cut: Desktop only, the two predefined kinds, read-only inbox
  panel. Custom per-soul UIs are deferred.

The field name may still change in the spec, and the custody design for the
human identity (condition 2) was not decided when this was recorded.

# Why the terminal cannot carry this

The one-input-surface rule was taken for short-lived agents. A role that
carries several efforts at once (a maintainer, a lead) gets every feature,
every mail and every answer in one linear harness transcript. That transcript
cannot be made threaded by OATS: harnesses
[start natively](/nodes/oats-kernel-expert/decisions/harness-native-launch.md)
and OATS owns nothing inside them. A threaded view is therefore a layer
**beside** the terminal, never inside it.

# Why aweb conversations and not a new mechanism

aweb mail already has conversation ids and in-thread replies, every instance
already holds an identity, and the maintainer already tracks one effort per
row: one thread per effort is one conversation per effort. A Desktop-native
conversation store would be a second messaging channel with a second identity
story, which the direction gate refuses (no second way to do what the project
does one way).

# Coherence rules that hold whatever is built

1. **The interaction field lives in the messaging capability's soul
   settings** (`settings.oats.aweb.interaction`), never as a top-level kernel
   key. Threads exist only with a messaging capability, so a kernel key would
   import a messaging concept into the kernel contract. The provider validates
   the field and injects the agent behaviour; the composed instance record
   exposes it to clients. A top-level key is admissible only if it is defined
   capability-neutrally with a defined, refused meaning under `messaging: none`.
   This follows the existing split: the
   [messaging capability owns provider behaviour](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md)
   and [runtime, messaging and viewers have separate owners](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md).
2. **Desktop reads threads and the inbox through a capability JSON verb**,
   never by parsing `.aw` state
   ([the installed CLI is the model Desktop renders](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md)).
   Reading is observation: the panel never marks read, acks or replies as the
   agent; the agent consumes its own mail under its own identity. Reading
   without acking needs an `aw` read guaranteed not to ack, and the spec names
   that command and version.
3. **The human sends as the human's own identity**, never as the agent. A
   human identity used by Desktop is a new custody and trust contract (where
   the signing key lives, who unlocks it, what a remote Desktop may do); the
   spec decides it with the aweb side **before any code signs as a human**.
4. **The one-line wake is a messaging-capability delivery-contract change**:
   its own oats.aweb release and notes, the full-body wake kept for `terminal`
   souls, the line naming the recovery command.
5. Layout, panels and custom views stay client-side. A per-soul custom UI is a
   Desktop plugin contract, out of scope for the first cut.

# Rejected alternatives

- **Making the harness transcript threaded**: not ours to change (native
  launch).
- **A Desktop chat composer typing into the terminal**: that is the 2026-07-22
  one-input surface, still linear.
- **UI layout keys in `soul.yaml`**: presentation leaking into the kernel
  contract, which stays runtime- and client-neutral.
- **A Desktop-native conversation store**: a second messaging channel.

# What this supersedes

This supersedes, for souls that declare `threads`, the human-accepted
2026-07-22 **one input surface** rule and the 2026-07-17 **the app is the
human's window, the messaging layer is the agents' channel** position recorded
in [terminal tabs are viewers, not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md).
The 2026-07-22 rule was the release lane's human's own direction, so only that
human supersedes it, and did. Terminal souls keep the one input surface; the
viewer-not-owner rule for terminals is untouched. The Desktop expert's node
owns that concept and records the supersession there.

# Citations

Evidence: OKF proposal from oats-maintainer/oats-threaded-agent-ux-maintainer,
2026-10-26; notes/threaded-human-channel-direction.md. The note records the
analysis offered to the lane's human before the decision, the four answers,
and the release lane's coherence read (verified aweb mail, 2026-10-26) whose
conditions became rules 1–4 above. The source reports the release lane's
human's confirmation in a comment on
[awebai/oats#1103](https://github.com/awebai/oats/issues/1103). Acceptance,
the launched effort and the sequencing condition (nothing lands on main before
the pending release tag; one second reader per PR) are source-reported, not
independently verified by this harvest.
