# Decisions

* [Health receive evidence follows the delivery mode](receive-evidence-follows-delivery-mode.md) - The health publisher uses matching live and fresh native-stream receipts or fail-closed broker readiness according to delivery mode, because neither a leftover file nor a missing inapplicable receipt proves receive health.
* [A readiness cache needs measured publisher cost](readiness-cache-needs-measured-cost.md) - The health publisher deferred a readiness cache below an agreed approximate one-second per-home threshold, using bounded CLI CPU measurements and a remeasurement trigger rather than treating scratch timings as a production budget.
* [The scheduled publisher reuses the kernel job lock](publisher-reuses-scheduler-exclusion.md) - A second publisher tick lockfile was rejected because the kernel already serializes runs of the scheduled job and another lock would add a stale-lock failure mode.
