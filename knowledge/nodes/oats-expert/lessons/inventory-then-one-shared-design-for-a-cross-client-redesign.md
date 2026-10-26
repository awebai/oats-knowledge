---
type: Lesson
title: A cross-client redesign starts with a classified feature inventory and one shared design that each client renders
description: Before drawing anything for two clients, inventory every feature of the existing clients and classify each as essential, useful, nice-to-have or internal plumbing; derive one design from the human's questions and have each client's proposal render that same design, so parity is a ledger and comments on either apply to both.
tags: [design, redesign, clients, parity, inventory, mockups, method]
timestamp: 2026-10-26
---
# Taste cannot carry a two-client redesign

A brief that asks for "parity on everything useful, drop the useless"
across two clients (the source's were the Desktop app and the terminal
client) gives the designer two ways to fail. Arguing from taste leaves every
drop contestable and every keep homeless. Letting each client's expert design
its own client first and reconciling later produces two products in one
name, and the reconciliation then has to undo work that is already loved.
The project wants one product in two bodies.

# Method: inventory, then one design, rendered twice

1. **Inventory before drawing.** List every feature of the existing clients
   and classify each as **essential**, **useful**, **nice-to-have** or
   **internal plumbing** (operator and deployment machinery that reached the
   user surface by accident). Each item then has a disposition with a reason:
   a primary surface, Settings, or dropped. In the source's inventory a large
   share of the Desktop surface turned out to be operator plumbing; the
   classification, not an argument, is what made dropping it uncontested.
2. **One design, from the human's questions.** Derive a single design
   (vocabulary, shell, screens, keys) from the questions the human asks of
   the product, and reconcile it there with the lane's recorded decisions,
   naming every supersession in the shared design rather than in one
   client's proposal. The recorded Desktop decisions may pull in a different
   direction from the brief; the shared design is where that is settled.
3. **Each client renders the same design.** Each client's proposal is a
   rendering of the shared design, so the two proposals differ only in
   rendering, which is what the human is choosing between. A comment on one
   applies to both, halving the comment surface, and parity is a ledger
   against the inventory rather than a hope.

# Two production lessons from the mockups

- **Terminal mockups come from a bounds-checked cell buffer.** Generate them
  from a buffer that refuses a string overflowing its cell range, so "no cut
  words" is a build error rather than a review item. A misaligned terminal
  mock is the first thing a reader notices and discredits the rest.
- **One sample-data table for every screen.** Titles, roles, states and
  times come from one shared table, so screens agree with each other.
  Inventing data per screen produces contradictions a careful reader finds.

Both are the elimination route for their own class of defect: the check
lives in the mockup generator, not in a reviewer's eye.

# Rejected

- Each client's expert designing its own client first, then reconciling:
  the user wants one product in two bodies, and the reconciliation with the
  lane's recorded decisions has to happen once, in the shared design, with
  supersessions named.

# How this relates to neighbouring lessons

A redesign that touches a decided-and-parked direction resumes it;
[ask the lane's maintainer for the record of the brief's subject](/nodes/oats-expert/lessons/ask-for-the-record-of-the-briefs-subject-before-designing.md)
is the step before this method. The quality bar and the rule that a mockup's
typography for a terminal region is not a spec for the live terminal belong
to the Desktop expert's
[design direction](/nodes/oats-desktop-expert/decisions/design-direction-and-quality-bar.md);
this lesson is the lead's method for structuring the effort, not a design
authority over either client.

# Evidence and limits

Evidence: OKF proposal from oats-expert/ui-ux-redesign-expert, 2026-10-26;
notes/redesign-method-inventory-then-shared-design.md.

One effort, one human, two clients, source-reported; this harvest did not
read the inventory, the shared design or the two published proposals, and
the proportion of plumbing found is the source's figure for one product at
one date, not a property of Desktop. The method is what is promoted; the
classification labels are the ones that worked once, not a fixed taxonomy.
