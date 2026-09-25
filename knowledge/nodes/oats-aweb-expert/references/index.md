# References

How the package applies the protocol's identity and custody model at each release.

* [How oats.aweb attaches a grant home to the resident's custody service (1.13.1)](how-a-grant-home-is-attached-to-custody.md) - The spawn hook's attachment contract from oats.aweb 1.13.1: the concrete socket from the custody preflight goes to the mint, the grant record is read back from disk, attachment is proven by the custody status command run as the grant home (never by whoami), a failed proof revokes and removes the fresh grant, renewal keeps the old grant until the new one is proven, and readiness inspects the newest grant home.
