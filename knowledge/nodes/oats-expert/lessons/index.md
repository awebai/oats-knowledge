# Lessons

* [A passing composition does not prove every copied input is needed](prove-copied-inputs-are-needed.md) - Before requiring a second client to retain state copied from the first, compare its composition with and without each candidate input and establish which consumer path actually needs it.
* [Review shared code with its owner before estimating a second client](import-closure-needs-owner-review.md) - Before estimating a second client, have the owner review shared modules and their callers for client-specific language, composition, transaction rules and runtime assumptions; repeated gaps call for a broader audit.
* [Test feasibility before choosing between owners](test-feasibility-before-choosing-between-owners.md) - When owning experts disagree on a feasibility claim that CI can settle in one session, request a bounded draft-PR spike before recommending either side.
