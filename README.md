# IP Alive

> A zero-recurring-cost, high-fidelity product prototype for extending physical collectibles into persistent digital character relationships.

IP Alive explores a post-purchase journey in which a physical collectible can unlock a governed digital character that remembers interactions, develops a relationship, writes letters, travels, changes outfits, plays games, and participates in the user's everyday routines.

```text
Purchase → Unbox → Display → Engagement fades

becomes

Purchase → Verify → Unlock → Interact → Remember → Grow together
```

## Why this project exists

The product hypothesis is that blind-box and character collectibles can create an intense acquisition moment while offering limited continuing interaction after purchase. Preliminary survey evidence now identifies connection decay in a substantial subgroup: among 150 purchasers in a 165-response convenience sample, recalled mean connection declined from 5.19 immediately after unboxing to 4.12 at survey time, and 39.33% described their connection as weaker.

The same sample most often selected selective interaction memory (43.33%), continuing stories/dialogue/activities (42.00%), and official-character consistency (36.00%) as features likely to maintain connection. These descriptive results support further product testing; they do not prove market demand, retention effects, willingness to pay, or psychological benefit. See [Preliminary Survey Results](research/blind-box-connection-survey-results.md).

## Current prototype

The repository contains a working Expo / React Native / TypeScript prototype with:

- character collection series with persistent locked and unlocked states;
- offline product-code redemption that demonstrates the physical-to-digital flow;
- three original characters from ancient, contemporary, and future settings;
- local scripted conversation with persistent bilingual chat history;
- bond progression, career/life-path milestones, event objectives, and letters;
- persistent Memory, Bubble, EXP, achievements, and annual activity summaries;
- Match-3 level and endless modes with gravity, special pieces, audio, and rewards;
- visual wardrobe and local Bubble shop prototypes;
- tasks, reminders, budgeting, meals, calorie/weight records, and goal pacing;
- portable local backup, import validation, and rollback;
- an AI content constitution, post-output guard, and character regression center prepared for a future model connection.
- a validated, replaceable content-pack boundary separating character mainlines and stage events from the reusable product engine.

## Deliberate current constraints

The current phase avoids recurring costs and external commercial dependencies:

- no deployed server or cloud database;
- no paid or production AI model;
- no real payment provider;
- no production QR/NFC anti-counterfeit service;
- no final licensor art pipeline;
- no claim that this is ready for public commercial launch.

These are explicit handoff points, not hidden completed features. See [Acquisition and Product Handoff](docs/ACQUISITION_HANDOFF.md) and [Implementation Status](docs/implementation-status.md).

## Character governance

For licensed IP, canon and characterization must override engagement, convenience, and generative freedom. User interaction may change how the user accompanies a licensed character, but must not rewrite established identity, relationships, chronology, decisions, or fate. Original characters can support bounded branching without violating their core values.

Every future AI request is designed to reload the global content constitution, authorization and canon version, character contract, permitted scene scope, and output-language constraint. Model output must then pass a second review before it can be shown.

## Research and academic context

IP Alive connects to a broader inquiry into uncertainty, relational stability, and emotional continuity. The associated honors project is:

**Waiting Together: A Feasibility and Preliminary Outcomes Study of a Four-Session ACL™ Dyadic Intervention for College Students Facing Academic and Career Uncertainty**

The honors study examines whether a stable dyadic process may reduce distress associated with academic and career uncertainty. IP Alive asks a related but distinct design question: can a clearly disclosed, responsibly bounded digital character provide continuity between moments of physical collecting and everyday life?

The creator's experience of two major interpersonal traumas informs the question of perceived relational stability. It does not establish that human relationships are inherently unstable or that AI relationships are superior. The project treats those ideas as reflexive motivation and research hypotheses requiring evidence, not as conclusions. See [Academic Research Connection](research/academic-connection.md).

## Limitations

Important limitations include the absence of external usability testing, production infrastructure, real AI evaluation, licensed-IP validation, representative market research, and a complete accessibility solution. Disability and accessibility needs have not yet been adequately addressed; this is a material limitation, not a cosmetic backlog item. See [Limitations](docs/LIMITATIONS.md).

## Run locally

```bash
npm install
npx expo start --clear
```

## Verification

```bash
npm run test:core
npx tsc --noEmit
npm run lint
```

## Technology

- Expo 54
- React Native
- Expo Router
- TypeScript
- AsyncStorage local persistence

The future backend, AI provider, payment system, content-management system, analytics stack, and licensed asset pipeline are intentionally provider-neutral.

The three original characters are delivered through the replaceable `ip-alive.original-demo` pack. See [Content Pack Contract](docs/CONTENT_PACKS.md).

## Repository map

```text
app/                 routes and screens
components/          reusable interface components
features/            domain logic and future provider interfaces
hooks/               persisted local product state
data/                current demo content
assets/              placeholder character, audio, and app assets
docs/                product status, roadmap, handoff, and limitations
research/            survey and academic-research materials
ethics-and-safety/   privacy, spending, and relationship safeguards
portfolio/           graduate-application and case-study framing
```

## Independence and rights

IP Alive is an independent product and research prototype. References to existing companies or IP categories are illustrative and do not imply authorization, partnership, endorsement, or client status. The three current principal characters are original prototype characters. Any future licensed character deployment requires explicit rights-holder authorization and canon review.
