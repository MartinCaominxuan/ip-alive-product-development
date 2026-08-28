# IP Alive Content Pack Contract

## Purpose

Content packs separate replaceable character material from the reusable IP Alive product engine. The current three original characters demonstrate a complete experience, but they are not assumed to survive an acquisition or licensed-IP deployment.

The engine owns accounts, entitlements, bond calculations, activity tracking, mail delivery, Memory, Match-3, wardrobe, Life tools, rewards, persistence, backup and safety gates. A content pack supplies the authored identity and stage-specific material those systems present.

## Content hierarchy

```text
Content pack
├── character identity and ownership metadata
├── main life path
│   └── ordered growth stages tied to bond levels
└── optional stage events
    ├── placement on one main-life stage
    ├── activity objectives
    ├── event letters
    └── local rewards
```

The main life path is the durable framework. An event is an optional episode occurring during one stage; it may reveal character, create mail and reward interaction, but it does not replace, branch or rewrite the life path.

## Current demo pack

- Pack ID: `ip-alive.original-demo`
- Version: `1.0.0`
- Ownership: original demo material
- Replaceable: yes
- Characters: Yunzhou, Mia and Nova
- Mainlines: three
- Stage events: six

The pack is registered in `data/content-packs/active.ts`. Replacing that one registration with another validated pack changes the authored content source without changing product-state hooks or screens.

## Required contract

Every pack must provide:

- stable pack ID and semantic version;
- ownership classification;
- unique character IDs;
- one bilingual main life path for every packed character;
- ordered bond-level growth stages;
- zero or more bilingual stage events;
- an explicit required bond level for every event;
- event objectives, one corresponding mail per objective, and positive rewards;
- same-character prerequisite links where events are sequential.

## Validation and release gate

The local validator rejects a pack when it contains:

- missing pack metadata;
- duplicate character or event IDs;
- an event referring to a character outside the pack;
- a character without a main life path;
- unordered, empty or non-bilingual growth stages;
- an event without a valid life-stage placement;
- incomplete bilingual event or mail copy;
- mismatched objective and mail counts;
- missing, self-referencing or cross-character prerequisites;
- non-positive rewards or invalid targets.

Validation runs during application startup and appears in Character Quality Center. An invalid pack fails closed instead of silently showing incomplete content.

## Licensed-IP replacement workflow

1. Create a new pack with a distinct ID and version.
2. Provide rights and provenance records outside the runtime payload.
3. Convert approved canon and character growth into the mainline contract.
4. Add only licensor-approved optional events and mail.
5. Run structural validation and character regression evaluation.
6. Obtain multilingual and licensor approval.
7. Switch the active-pack registration for the candidate build.
8. Preserve the old pack for rollback; never mutate a released version in place.

## Deliberate boundary

The current prototype registers one local pack. It does not yet download packs, verify signatures, resolve remote versions, enforce commercial licenses, migrate cloud saves between packs, or provide a CMS. Those are company-level extensions. The present contract demonstrates the replacement boundary without pretending the operational publishing system exists.
