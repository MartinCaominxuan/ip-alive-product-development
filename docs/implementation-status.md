# IP Alive implementation status

Status rules: **Implemented** means usable in the app, persisted where required, and covered by automated checks. **Prototype** means locally demonstrable but not production infrastructure. **Planned** means interfaces or designs may exist, but the capability is not counted as complete.

| Capability | Status | Evidence / limitation |
|---|---|---|
| Expo mobile navigation | Implemented | iOS export and TypeScript checks pass. |
| Character collection UI | Prototype | Series, persistent ownership, offline redemption, and locked access work; initial demo characters remain seeded grants. |
| QR/NFC redemption | Prototype | Offline payload validation, duplicate prevention and persistent grants work; no camera/NFC reader or server anti-counterfeit verification. |
| Character chat | Prototype | Scripted local replies and persistent history; no real AI. |
| AI safety pipeline | Prototype | Pre-request constitution, output guard and regression suite exist; no model or production moderation service. |
| Character memory | Prototype | Local conversation history, deterministic summaries, per-character saving controls, language-scoped deletion and authored memories persist; no semantic long-term AI memory. |
| Bond and character events | Implemented locally | Real local actions update bond, mail and two sequential events per original character; later chapters count only post-activation actions. No server authority. |
| Authored content validation | Implemented locally | A versioned local manifest blocks startup on duplicate IDs, invalid character links, incomplete bilingual copy, stage-mail mismatch, or invalid rewards. No operational CMS. |
| Character content packs | Implemented locally | Main life paths and optional stage events are exposed through one replaceable, validated original-demo pack. No remote delivery, signature verification or licensed pack exists. |
| Match-3 | Implemented locally | Six sequential levels, score/color/ice goals, gravity, cascades, specials, stars, persistent first-clear rewards, best scores, locking and infinite mode. Production balancing and live level delivery remain partner work. |
| Wardrobe and shop | Prototype | Local ownership and visual placeholders work; no payments or production art catalog. |
| Life tools | Implemented locally | Tasks, reminders, expenses, adaptive plans, meals, weight goals and achievements persist. Camera/library meal photos, user-confirmed portions and macronutrients work locally; there is no paid visual-AI recognition or clinical database. |
| Profile and annual summary | Implemented locally | Editable local identity, registration-day history, pause/resume lifecycle, confirmed erase and dated annual ledger work; no production cloud identity. |
| Backup and restore | Implemented locally | Validated portable local backup, deterministic legacy migration, set/remove restore planning and rollback; file is not encrypted. |
| Authentication | Planned | No production login, password reset, session or account recovery. |
| Backend/database/sync | Planned | No deployed backend or multi-device synchronization. |
| Payments | Planned | No store payments, receipt verification or refund flow. |
| Admin/content publishing | Planned | Types only; no operational console or approval workflow. |
| Analytics/observability | Planned | No production telemetry, crash reporting or service monitoring. |
| Accessibility | Deferred | Explicitly deferred by product owner; not counted as complete. |
| User testing | Planned | No completed external usability study or retained evidence. |

This file is the source of truth for completion reporting. Folder presence and interface definitions are not counted as completed features.

## Honest completion snapshot — local experience v0.96

- **Locally experienceable product: 96%** — scored against the intended zero-recurring-cost local demo: all primary tabs and core loops are operable, actions persist, and photo-assisted meal logging is now end to end. The remaining 4% is concentrated in automatic pixel recognition, broader food coverage, wider device QA, final balancing and external usability evidence.
- **Commercial production readiness: 55%** — production authentication, backend authority, device sync, payments, licensed content operations, telemetry, compliance, final art and partner infrastructure are deliberately absent and are not counted as locally completed merely because interfaces exist.
