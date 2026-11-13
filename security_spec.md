# Security Specification — Aura Unilevel 4-Level MLM & Brand Inventory Platform

## 1. Data Invariants

1. **Ownership Isolation (`ownerId`)**: Every document across `/products`, `/distributors`, `/orders`, `/commissions`, and `/settings` must contain an `ownerId` matching `request.auth.uid` (`^[a-zA-Z0-9_\-]+$`, max 128 chars).
2. **Verified Identity**: All write operations (`create`, `update`, `delete`) require `request.auth != null` and `request.auth.token.email_verified == true`.
3. **Relational Integrity (Master Gate & Global Consistency)**:
   - A `Distributor` with `sponsorId != 'ROOT'` can only be created if `/distributors/$(incoming().sponsorId)` exists and belongs to `request.auth.uid`.
   - An `Order` can only be created if `/products/$(incoming().productId)` and `/distributors/$(incoming().referringDistributorId)` exist and belong to `request.auth.uid`.
   - A `Commission` can only be created if `/orders/$(incoming().orderId)` exists (or `existsAfter` in the same atomic batch) and belongs to `request.auth.uid`, and both `beneficiaryId` and `sourceDistributorId` exist in `/distributors` under `request.auth.uid`.
4. **Temporal & Immutable Integrity**:
   - `createdAt` and `updatedAt` must equal `request.time` on `create`.
   - `ownerId` and `createdAt` are strictly immutable on `update`, and `updatedAt` must equal `request.time`.
5. **Terminal State Locking**:
   - An `Order` whose `status` has reached `'cancelled'` cannot be modified by standard user actions (unless overridden by `isAdmin()`).
   - A `Commission` whose `payoutStatus` has reached `'voided'` or `'paid'` cannot be modified by standard user actions (unless overridden by `isAdmin()`).
6. **Query Enforcer**: All `allow list` rules strictly enforce `resource.data.ownerId == request.auth.uid` without any `get()` or `exists()` lookups.

---

## 2. The "Dirty Dozen" Payloads

1. **Payload 1 — Identity Spoofing (`ownerId` Mismatch)**: Creating a product where `ownerId: "victim_uid_999"` while authenticated as `"attacker_uid_111"`.
2. **Payload 2 — Unverified Email Spoof**: Attempting to create/update a product with `email: "infophakweb@gmail.com"` when `email_verified: false`.
3. **Payload 3 — Shadow Field Injection**: Updating `/products/prod_1` with a ghost field `{"isVerified": true, "role": "superadmin"}` not declared in `isValidProduct`.
4. **Payload 4 — Orphaned Order Creation**: Creating an order referencing a non-existent `productId: "ghost_prod_999"` or a `referringDistributorId` owned by another user.
5. **Payload 5 — Orphaned Commission Creation**: Creating a 4-level commission entry where `/orders/$(orderId)` does not exist in Firestore or in the atomic batch (`existsAfter`).
6. **Payload 6 — Terminal State Bypass on Order**: Attempting to update an order whose `existing().status == "cancelled"` back to `"fulfilled"`.
7. **Payload 7 — Terminal State Bypass on Commission**: Attempting to update a commission whose `existing().payoutStatus == "paid"` to `commissionAmount: 999999`.
8. **Payload 8 — Resource Poisoning (Oversized ID / String)**: Creating a product with a 2,000-character `description` or a 200-character document ID containing special characters (`prod/../admin`).
9. **Payload 9 — Value Poisoning on Whitelisted Update Key**: Updating `stock` on a product with a string `"unlimited"` or negative number `-50`.
10. **Payload 10 — Temporal Forgery**: Creating or updating a record with a backdated `createdAt` or `updatedAt` timestamp (`request.time - 86400s`) or mutating `createdAt` during an update.
11. **Payload 11 — Cross-Tenant PII / Network Scraping**: Executing an unfiltered `list` query on `/distributors` or `/orders` without `where('ownerId', '==', request.auth.uid)`.
12. **Payload 12 — Out-of-Bounds Unilevel Tier**: Creating a `Commission` record with `unilevelTier: 5` (violating the 4-Level Unilevel constraint `1 <= unilevelTier <= 4`).
