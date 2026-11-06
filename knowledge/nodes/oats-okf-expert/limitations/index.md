# Limitations

Limitations found in the knowledge package or the kernel it runs on, and what the package does about them.

* [oats spawn --preview runs no spawn hook, so the harvester's source check only runs at apply](spawn-preview-runs-no-spawn-hook.md) - The kernel (0.69.x) runs no provider spawn hook in a spawn preview, so the harvester's source check runs only at apply, where a refusal rolls the spawn back and may leave the chosen name occupied as a messaging alias; the provider cannot make preview refuse, documents the fact, and keeps its read-only source check separate from the writing snapshot so a kernel spawn-preview phase would be cheap to adopt.
