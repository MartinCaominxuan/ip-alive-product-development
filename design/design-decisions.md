# Product and Design Decision Log

This file records provisional product decisions made during early product discovery. Each record documents what decision was made, why it was made, what alternatives were considered, what evidence currently supports it, what remains uncertain, and what would cause the decision to change.

These decisions are not user-validated conclusions. They are working product and design assumptions intended to guide current exploration, prototype scope, and future research.

## DD-001: Position the product as an enterprise IP-character platform

- Status: Provisional product decision
- Date: 2026-07-18
- Decision: Position the product as an enterprise IP-character platform rather than a single blind-box app.
- Rationale: A platform framing better supports multiple IP partners, multiple character lines, configurable brand rules, and long-term business-to-business adoption. It also avoids narrowing the concept too early around one collectible mechanic.
- Alternatives considered: Build a single consumer blind-box app; create a standalone digital collectible marketplace; focus only on one original character line; build a general fan community app without enterprise IP tooling.
- Current evidence: The concept depends on licensed character operations, physical-digital product connections, and partner-specific character experiences, all of which benefit from reusable platform capabilities. Enterprise positioning also aligns with the need for rights management, content controls, and brand-safe deployment.
- Risks: Enterprise positioning may slow consumer prototype clarity, increase complexity, and require longer sales cycles. The platform may feel too abstract before a compelling end-user experience is demonstrated.
- Open questions: Which enterprise buyer owns this problem? What minimum platform features are required for a credible partner pilot? How much consumer-facing experience must exist before enterprise conversations are useful?
- Conditions for reconsideration: Reconsider if discovery shows that partners only want a narrow campaign app, if consumer adoption depends on a single focused product, or if platform requirements prevent timely validation of the core character experience.

## DD-002: Use unique activation cards to connect physical products and digital characters

- Status: Provisional product decision
- Date: 2026-07-18
- Decision: Use unique activation cards to connect physical products and digital characters.
- Rationale: Unique activation cards create a concrete bridge between physical collectibles and digital character ownership or access. They make the activation moment intentional, trackable, and easier to explain than an entirely abstract digital entitlement.
- Alternatives considered: Use QR codes printed directly on packaging; use NFC tags embedded in products; unlock characters through receipt upload; distribute digital characters without any physical activation mechanism; use randomized app-only blind-box draws.
- Current evidence: The product concept centers on physical-digital continuity, and activation cards provide a low-friction mechanism for linking a purchased object to a digital character experience while preserving flexibility in packaging and fulfillment.
- Risks: Cards can be lost, copied, resold, damaged, or separated from the physical product. Fraud prevention, customer support, and manufacturing coordination may add operational complexity.
- Open questions: What form factor should the activation card take? What anti-fraud controls are necessary for the initial version? Should activation be one-time, recoverable, or reversible under support conditions?
- Conditions for reconsideration: Reconsider if cards create too much operational burden, if partners prefer embedded product identifiers, if fraud risk is unacceptable, or if users find card-based activation confusing.

## DD-003: Allow unactivated digital cards to be transferred independently of physical collectibles

- Status: Provisional product decision
- Date: 2026-07-18
- Decision: Allow unactivated digital cards to be transferred independently of physical collectibles.
- Rationale: Transferable unactivated cards support gifting, trading, secondary circulation, and flexible ownership before a character is bound to an account. This preserves some collectible market behavior without requiring the physical object to move at the same time.
- Alternatives considered: Prevent all transfers; require the physical collectible and digital card to transfer together; allow transfers only after activation; support a full marketplace from the initial version; make all cards account-bound at purchase.
- Current evidence: Collectible products often rely on gifting and trading behaviors. Keeping transfers limited to unactivated cards may support these behaviors while reducing complexity compared with transferring already-personalized character relationships.
- Risks: Independent transfer may confuse the relationship between the physical collectible and digital entitlement. It may also create support issues, speculative behavior, or disputes if physical and digital ownership diverge.
- Open questions: How should the product communicate the difference between physical ownership, unactivated card control, and activated character ownership? Should transfers be peer-to-peer, code-based, or platform-mediated? What safeguards are needed for minors and regulated markets?
- Conditions for reconsideration: Reconsider if independent transfer creates user confusion, partner discomfort, legal risk, fraud, or market dynamics that conflict with the intended character relationship experience.

## DD-004: Bind activated characters to accounts in the initial version

- Status: Provisional product decision
- Date: 2026-07-18
- Decision: Bind activated characters to accounts in the initial version.
- Rationale: Account binding simplifies the first version by making activated character ownership, relationship history, personalization, and support recovery easier to manage. It also protects the continuity of the character relationship once activation has occurred.
- Alternatives considered: Allow activated characters to be transferred; bind characters to devices instead of accounts; use wallet-based ownership; keep activation anonymous; allow temporary guest ownership before account binding.
- Current evidence: The initial product concept emphasizes ongoing character interaction and relationship progression, which requires persistent identity, saved state, and continuity across sessions.
- Risks: Account binding may reduce collector flexibility, limit resale behavior, and frustrate users who expect digital collectibles to remain transferable. It may also increase account recovery and privacy responsibilities.
- Open questions: Should account binding be permanent? Are family accounts, child accounts, or supervised transfers required? What recovery process is appropriate if an account is lost?
- Conditions for reconsideration: Reconsider if transferability of activated characters proves essential to partner goals, collector expectations, legal requirements, or user adoption.

## DD-005: Separate relationship progression from paid or collectible progression

- Status: Provisional product decision
- Date: 2026-07-18
- Decision: Separate relationship progression from paid or collectible progression.
- Rationale: Character relationship progression should reflect interaction, attention, and emotional continuity rather than spending or collection completion. This supports trust, reduces pay-to-win dynamics, and keeps the core character bond from feeling purely transactional.
- Alternatives considered: Tie relationship level to purchases; make rare collectibles increase character affection; gate relationship milestones behind paid upgrades; use collection completion as the main progression system; remove relationship progression entirely.
- Current evidence: The product concept depends on durable character-mediated engagement, and relationship mechanics are more likely to feel meaningful if they are not directly purchasable.
- Risks: Separating progression systems may reduce monetization opportunities or make paid collectibles feel less consequential. It may also require careful design to keep both systems rewarding without creating conflicts.
- Open questions: What actions should advance relationship progression? How should paid items express value without distorting the character bond? Should cosmetic purchases influence dialogue, memory, or utility access?
- Conditions for reconsideration: Reconsider if users do not understand the separation, if partners require collectible-driven progression, or if the model cannot support a sustainable business without some paid progression links.

## DD-006: Treat daily-life utilities as character-mediated interactions

- Status: Provisional product decision
- Date: 2026-07-18
- Decision: Treat daily-life utilities as character-mediated interactions rather than unrelated standalone tools.
- Rationale: Utilities such as reminders, routines, suggestions, or lightweight planning should strengthen the character relationship and product identity. Character mediation makes practical features feel connected to the IP experience instead of like generic productivity tools.
- Alternatives considered: Build standalone utility tools; exclude utility features and focus only on entertainment; provide utilities through a generic assistant; limit character interactions to chat and collectible display.
- Current evidence: The concept aims to make characters present in everyday life, and utility interactions provide repeated reasons to engage beyond collecting or novelty chat.
- Risks: Utility features may dilute the entertainment experience, overpromise assistant capability, or create privacy and reliability concerns. Poorly executed utilities could make characters feel intrusive or generic.
- Open questions: Which utilities are appropriate for character mediation? How should the product balance helpfulness with brand safety and character authenticity? What data should characters be allowed to remember or act on?
- Conditions for reconsideration: Reconsider if users prefer characters only for entertainment, if utility reliability expectations are too high, or if brand partners are uncomfortable with characters mediating daily-life tasks.

## DD-007: Keep the repository private during early product discovery

- Status: Provisional product decision
- Date: 2026-07-18
- Decision: Keep the repository private during early product discovery.
- Rationale: A private repository allows the team to explore positioning, IP-sensitive concepts, prototype assumptions, and partner-facing narratives before they are ready for public interpretation.
- Alternatives considered: Make the repository public immediately; publish only selected documentation; create a separate public demo repository; open source the project after the first prototype.
- Current evidence: The project is still exploratory and includes provisional decisions, uncertain assumptions, and IP-related strategy that could be misread if exposed too early.
- Risks: Private development may reduce external feedback, slow community-building, and make it harder to demonstrate progress publicly.
- Open questions: What materials should eventually become public? What criteria define readiness for public sharing? Should technical infrastructure remain private while selected product artifacts are published?
- Conditions for reconsideration: Reconsider if public collaboration becomes strategically important, if investor or partner conversations require public artifacts, or if the project reaches a stable prototype stage suitable for broader review.

## DD-008: Avoid unauthorized use of real IP characters in public-facing prototypes

- Status: Provisional product decision
- Date: 2026-07-18
- Decision: Avoid unauthorized use of real IP characters in public-facing prototypes.
- Rationale: Public prototypes should not imply rights, affiliation, endorsement, or permission that the project does not have. Using unauthorized real IP characters could create legal, brand, and trust risks.
- Alternatives considered: Use real IP characters as mock examples; use blurred or lightly altered recognizable characters; rely on disclaimers; keep all real-IP examples private; create original placeholder characters for public demos.
- Current evidence: The product concept is intended for licensed IP-character experiences, but no public-facing prototype should depend on assets or characters without authorization.
- Risks: Original placeholders may be less compelling than familiar characters and may make it harder to communicate partner potential. Overly generic examples could weaken demonstrations of the IP-character platform vision.
- Open questions: What style of original placeholder best communicates the concept? Can private partner-specific demos use approved materials under explicit permission? What review process is needed before public release?
- Conditions for reconsideration: Reconsider only if explicit rights, permissions, or partner approvals are secured for specific characters and use cases, or if public prototype scope changes to exclude character depictions entirely.
