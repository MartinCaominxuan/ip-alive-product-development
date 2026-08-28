# Changelog

## 2026-08-28 — Local experience v0.96

- Added real camera and photo-library meal capture through the Expo 54 image picker.
- Added a no-cost confirmation workflow: photo, meal type, food search, portion, nutrition preview and save.
- Persisted confirmed meal photos in the app document directory and displayed them beside daily nutrition entries.
- Deleting a meal now recalculates intake and removes its private local photo.
- Restored interrupted Android picker results where the operating system recreates the app activity.
- Explicitly labels the local workflow as user-confirmed estimation—not AI image recognition or a medical measurement.

## 2026-08-28 — Local experience v0.95

- Added a bilingual, searchable 12-food local reference catalog for common foods.
- Added gram-based calorie, protein, carbohydrate and fat calculations with automated fixtures.
- Added calculated portions and retained custom calorie entry for foods outside the local catalog.
- Added persistent meal-level nutrition details and daily macronutrient totals.
- Added explicit source and safety language: generic USDA FoodData Central references vary by preparation and are not medical advice.

## 2026-08-28 — Local experience v0.94

- Expanded Match-3 into six sequential levels with persistent unlocking, best scores and one-to-three-star results.
- Added real score, color-collection and ice-clearing goals, while retaining gravity, cascades, specials and endless mode.
- Made first-clear Bubble and bond rewards idempotent so replaying a level cannot duplicate rewards.
- Added active/paused local-profile lifecycle controls and a user-confirmed full local-data erase path with an emergency rollback snapshot.
- Upgraded portable backups to schema v2 with deterministic migration from older game-progress backups.
- Added automated fixtures for level completion, star thresholds, legacy migration and exact set/remove restore plans.

## 2026-08-28 — Replaceable character content packs

- Added a runtime content-pack registry and the `ip-alive.original-demo` pack.
- Separated stable main life paths from optional events placed at explicit bond stages.
- Reframed the character interface from numbered story chapters to current, upcoming and past stage events.
- Added bond-stage event locks without changing the underlying relationship or progression engine.
- Expanded the content release gate to validate pack metadata, mainlines, growth ordering and event placement.
- Added a buyer-facing content-pack replacement contract.

## 2026-08-28 — Sequential character stories and content release gate

- Expanded Yunzhou, Mia and Nova from one primary event to two sequential story chapters each.
- Made later chapters count only activity completed after the prerequisite reward is claimed.
- Added three new bilingual story premises and nine new event letters across the second chapters.
- Added a versioned local content manifest with validation for IDs, character links, bilingual copy, objectives, stage mail and rewards.
- Integrated authored-content validation into app startup, automated tests and the Character Quality Center.

## 2026-08-28 — Controlled memory v1

- Added per-character conversation-memory consent controls.
- Added deterministic conversation summaries with correct language-specific counts and last-activity dates.
- Added permanent deletion for the current language or every saved conversation belonging to one character.
- Made memory-off conversations session-only while keeping the local scripted chat usable.
- Added migration from the original chat-history format and core tests for summaries and deletion.

## 2026-08-28 — Research evidence documentation

- Added a de-identified preliminary summary of the 165-response blind-box connection survey.
- Replaced “results pending” language across the product, research, portfolio, limitations, and acquisition documents.
- Distinguished the 165 total respondents from the 150-purchaser analytical subset.
- Added claims boundaries, sample limitations, contradictory evidence, eligibility concerns, and next analysis requirements.
- Documented why original platform exports and automatically generated AI analysis should not be published before privacy and research-governance review.

## Purpose
This file tracks notable documentation and product-development changes for the IP Alive repository.

## Project Status Note
This project is private, exploratory, and not affiliated with any named IP company. Any references to real companies should be treated only as hypothetical examples or future case-study candidates, not clients or partners.

## Unreleased
- Created the initial documentation structure for product vision, research, AI character systems, business exploration, ethics and safety, design, and portfolio planning.

## Notes
Future entries should distinguish between validated decisions, assumptions, hypotheses, and open questions.
