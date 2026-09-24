---
type: Lesson
title: A soul served through a shared checkout is only as current as that tree — validity is not currency, and repair belongs to the tree's owner
description: A repository-resident soul read through a shared checkout gives every instance a coherent but possibly weeks-old knowledge picture, and nothing in the bundle signals it. Verify the tree's position against the remote before trusting what you read, read canonical concepts from the remote ref when behind, and leave repair of a shared tree to its owner.
tags: [lesson, operator, placement, orientation, knowledge, shared-checkout, custody, verification, currency]
timestamp: 2026-09-19
---

Judgement formed 2026-09-19 by an expert instance orienting in checkout mode;
adopted as operator placement guidance in the 2026-09-24 seeding.

# Rule

When a soul lives inside a repository and an instance reads it through a
shared checkout, the soul is exactly as current as that tree — no more. In a
shared tree nobody owns keeping it current unless the operator names someone,
so placing a soul inside the repository is a placement trade-off the operator
decides: either assign an owner for the tree's currency, or accept that
instances may orient on a stale picture. The framework does not detect the
condition; the operator has to design around it.

# Why

A shared checkout is moved only when somebody moves it. Instances that read a
soul through it follow their session protocol faithfully — index first, then
the linked concepts — and get a well-formed, internally consistent bundle that
may be many commits behind the canonical branch. The knowledge the stale tree
cannot show is precisely the freshest: concepts that other instances pushed to
the remote since the tree was last moved. So the gap is worst exactly when the
soul is most alive.

**Bundle validity is not bundle currency.** A stale copy parses, passes the
validator, and carries frontmatter timestamps indistinguishable from files
that simply have not needed changing. Nothing in the bundle format can
distinguish "unchanged because settled" from "unchanged because this copy is
old". Current-state (stewardship) concepts are the worst case: their whole job
is to describe the present, and an old copy reads as a confident statement
about now.

The dogfooding layout that reads souls through repository checkouts (see
[official development dogfoods the workspace](/nodes/oats-expert/decisions/official-development-dogfoods-the-workspace.md))
is exactly the layout that produces this exposure. It is a legitimate
placement; it just carries an ownership obligation the operator must discharge.

# What goes wrong

- An instance reasons from an old world and reports it as the present; the
  report is fluent and wrong, and nobody downstream has a signal to doubt it.
- A newly seeded or recently amended concept is invisible to every instance
  served through the stale tree, so decisions already recorded get re-derived.
- An instance notices the gap and "fixes" it by pulling — changing the working
  state of a tree that belongs to the human and possibly other agents, from
  inside a role that owns none of it.

# Verification before trust

Before trusting anything read from a repository-resident soul, establish the
tree's position against the remote:

1. Refresh the remote-tracking view with a read-only fetch. This is the one
   operation that changes no branch, no index and no file, so it is safe even
   under a strict no-destructive-git rule for a non-owner.
2. Count ahead and behind against the canonical branch. A non-zero behind count
   means the bundle under the soul link is not the canonical one.
3. If behind, read the concepts that matter — above all the current-state ones
   — from the remote ref rather than from the tree, without touching the tree.
4. State the gap in the orientation report as a one-line fact: how far behind,
   and which concepts were read from the remote instead.

This converts an invisible correctness problem into a visible, cheap
statement. The same posture — verify position before trusting content — is
the outsider stance described in
[outsider verification of a rebuild](/nodes/oats-operator-expert/playbooks/outsider-verification-of-a-rebuild.md).

# Custody of the repair

In a shared checkout, fixing a stale tree is not a private correction. The
tree belongs to the human and possibly to other agents whose working state
depends on where it sits. A non-owner therefore never pulls, fast-forwards or
resets it; it reports the gap and lets the owner decide whether and when to
move the tree. Only operations that change no branch, index or file are within
a non-owner's remit. This is the same custody discipline as
[resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md):
whoever owns the directory decides what changes in it.

# Consequences for placement

- When currency without a named owner matters — souls that many instances
  orient on, souls that carry current-state concepts — place them outside
  every shared work tree, so no tree's staleness can stand between an instance
  and its canonical knowledge. See
  [place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md).
- When a repository-resident soul is the right placement (dogfooding,
  reviewed soul edits on a branch), the placement decision must name who keeps
  the shared tree current and how often, and every instance served through it
  must run the verification above at session start.
- A validator pass is never evidence of currency. Operators verifying a
  deployment should ask "which tree served this bundle, and where is that tree
  relative to the remote?" before accepting any orientation report built on it.

# Citations

- Legacy lesson `lessons/stale-checkout-serves-stale-soul.md` in the
  oats-expert bundle (lesson formed 2026-09-19).
