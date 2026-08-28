# IP Alive implementation status

Status rules: **Implemented** means usable in the app, persisted where required, and covered by automated checks. **Prototype** means locally demonstrable but not production infrastructure. **Planned** means interfaces or designs may exist, but the capability is not counted as complete.

| Capability | Status | Evidence / limitation |
|---|---|---|
| Expo mobile navigation | Implemented | iOS export and TypeScript checks pass. |
| Character collection UI | Prototype | Series, persistent ownership, offline redemption, and locked access work; initial demo characters remain seeded grants. |
| QR/NFC redemption | Prototype | Offline payload validation, duplicate prevention and persistent grants work; no camera/NFC reader or server anti-counterfeit verification. |
| Character chat | Prototype | Scripted local replies and persistent history; no real AI. |
| AI safety pipeline | Prototype | Pre-request constitution, output guard and regression suite exist; no model or production moderation service. |
| Character memory | Prototype | Local conversation history and authored memories persist; no semantic long-term AI memory. |
| Bond and character events | Implemented locally | Real local actions update bond, mail and event objectives. No server authority. |
| Match-3 | Implemented locally | Gravity, specials, level/infinite modes and local rewards. Content depth remains limited. |
| Wardrobe and shop | Prototype | Local ownership and visual placeholders work; no payments or production art catalog. |
| Life tools | Prototype | Tasks, reminders, expenses, meals, weight records and goals work; nutrition database is absent. |
| Profile and annual summary | Prototype | Local demo profile and dated ledger work; no production registration or cloud identity. |
| Backup and restore | Implemented locally | Validated portable local backup with rollback; file is not encrypted. |
| Authentication | Planned | No production login, password reset, session or account recovery. |
| Backend/database/sync | Planned | No deployed backend or multi-device synchronization. |
| Payments | Planned | No store payments, receipt verification or refund flow. |
| Admin/content publishing | Planned | Types only; no operational console or approval workflow. |
| Analytics/observability | Planned | No production telemetry, crash reporting or service monitoring. |
| Accessibility | Deferred | Explicitly deferred by product owner; not counted as complete. |
| User testing | Planned | No completed external usability study or retained evidence. |

This file is the source of truth for completion reporting. Folder presence and interface definitions are not counted as completed features.
