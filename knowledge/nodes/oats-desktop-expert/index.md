# oats-desktop-expert

Desktop product and interaction rationale, accessibility, integration limitations and verification judgment. The kernel is the model; Desktop renders it and drives it through kernel JSON verbs. Implementation lives in the repository; this node records why Desktop is shaped as it is, what was rejected, and what was discovered the hard way.

## Sections

* [Decisions](decisions/index.md) - Product and security decisions with rationale, dates and rejected alternatives.
* [Lessons](lessons/index.md) - Discoveries, integration limitations and verification judgment.

## Start here

* [One standalone Desktop product, no hidden operational kernel](decisions/standalone-product-and-cli-authority.md) - The installed CLI is the model Desktop renders and the only way it changes a deployment.
* [The loopback interface is Desktop's trust boundary](decisions/loopback-trust-boundary-and-transport-simplicity.md) - Loopback-only bind with Host and Origin guards, because the backend types into agent terminals.
* [Verification judgment for Desktop's privileged surfaces](lessons/verification-judgment-for-privileged-surfaces.md) - Prove guards at the real boundary and never launch the packaged app on an operator's machine.

Cross-node reads: the process-boundary and bounded-lineage rationale live in [oats-kernel-expert](/nodes/oats-kernel-expert/index.md); cross-domain direction in [oats-expert](/nodes/oats-expert/index.md).
