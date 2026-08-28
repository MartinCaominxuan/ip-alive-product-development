# IP Alive — Acquisition and Product Handoff

## Purpose

This document identifies what a buyer or development partner can inherit, which interfaces are intentionally replaceable, and where company-level investment is required. It is not a valuation, legal warranty, production-readiness claim, or promise of third-party approval.

## Transferable prototype assets

- Expo / React Native / TypeScript mobile application and feature-oriented structure.
- Local character, bond, mail, event, economy, Match-3, wardrobe, Life, profile, annual-summary, and backup flows.
- Persistent local activity, chat, unlock, inventory, progression, and event-state models.
- Three original character canon and progression systems.
- Provider-neutral types for unlock, art, administration, mail, rewards, travel, and persistence.
- AI content constitution, guarded gateway, output review, privacy-safe audit format, and regression suite.
- Research plans, ethics documentation, product rationale, and portfolio materials.

## Replacement interfaces and company intervention

| Area | Prototype currently does | Replacement point | Acquiring company must provide |
|---|---|---|---|
| Authentication | Local demo profile | Profile/account models | Identity provider, sessions, recovery, deletion, age handling |
| Database and sync | AsyncStorage and portable backup | Persistence repositories and versioned keys | Backend, database, sync, migration, conflicts, monitoring |
| QR/NFC unlock | Offline registry and same-device duplicate prevention | `UnlockGateway` and grant ledger | Camera/NFC, signed tokens, server one-time redemption, fraud/support |
| AI conversation | Local scripted replies | Guarded request and AI transport gateway | Model/provider, retrieval, rate/cost controls, moderation, incident response |
| Character canon | Original demo canon | Versioned voice/canon contracts and evaluations | Licensed corpus, approved quotations, licensor and multilingual review |
| Semantic memory | Stored conversations and authored memories | Chat/memory repository boundaries | Summarization, retrieval, consent, retention/deletion, safety evaluation |
| Payments | Local Bubble economy | Shop, wallet, reward and entitlement types | Store/payment provider, receipts, refunds, tax, minors and fraud controls |
| Art and animation | Placeholder art and simplified wardrobe | Asset IDs, preview keys and art types | Final models, layered outfits, expressions, animation, asset pipeline |
| Content operations | Hard-coded local content | Admin/content types and feature schemas | CMS, drafts, approvals, scheduling, rollback, role access, licensor workflow |
| Analytics | Local counters | Activity event schema | Consent-aware analytics, crash reporting, experiments and dashboards |
| Notifications | Local reminders | Notification routes and character lines | Push service, server schedules, preferences and delivery monitoring |
| Nutrition/health | Manual records and basic formulas | Life and health models | Licensed data source, health integrations, safety and regional review |
| Legal/compliance | Prototype principles | Content authority and audit metadata | IP, privacy, consumer, payment, minors, AI and health counsel |
| Accessibility | Limited platform defaults | React Native component layer | Audit, semantics, focus, contrast, dynamic type and disabled-user testing |

## Architecture principle

External services should replace gateways rather than rewrite features.

```text
Current: redemption screen → offline validator → local asset grant
Future:  redemption screen → server UnlockGateway → cloud grant → local cache

Current: chat screen → local scripted reply
Future:  chat screen → guarded request → AI transport → output review → approved reply
```

## Required diligence

- Confirm provenance and ownership of every code, audio, image, font, and written asset.
- Review third-party dependencies and licenses.
- Document authorship/assignment for the three original characters.
- Replace or approve all placeholder assets.
- Commission security, privacy, accessibility, and child-safety reviews.
- Validate the proposition with users and prospective enterprise buyers.
- Separate survey-supported claims from hypotheses.
- Establish licensed-IP approval, revision, suspension, and takedown workflows.
- Load-test infrastructure and estimate model/service unit economics.
- Complete app-store, consumer, payment, tax, and regional compliance work.

## Not represented as complete

The repository does not contain a production backend, real authentication, payment processing, server anti-counterfeit verification, production AI, final licensed art, operational admin console, or completed partner pilot. Folder names and TypeScript interfaces are not completed implementations.

## Suggested first 90 days after handoff

1. Weeks 1–2: technical, IP, privacy, dependency, and accessibility audit.
2. Weeks 2–4: select backend, identity, AI, analytics, and CMS providers.
3. Weeks 3–6: build server-authoritative account, entitlement, and sync foundations.
4. Weeks 4–8: connect one approved canon corpus to the guarded AI gateway and run evaluations.
5. Weeks 6–10: replace one full character art/wardrobe set and validate the asset pipeline.
6. Weeks 8–12: conduct a limited, consented pilot with predefined safety and success criteria.

## Handoff acceptance checklist

- Buyer can build and run the iOS/Android prototype.
- Tests, TypeScript, lint, and Expo export pass.
- Backup/restore is verified on a test device.
- Offline redemption is understood as a simulator, not production security.
- Completion claims match `docs/implementation-status.md`.
- Deferred infrastructure and safety work has named owners and budgets.
