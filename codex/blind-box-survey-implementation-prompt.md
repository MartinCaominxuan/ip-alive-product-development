# Codex Prompt: Implement the IP Alive Blind-Box Connection Survey

Use the following prompt as the complete task instruction for Codex.

---

You are working in the private repository `MartinCaominxuan/ip-alive-product-development`.

## Objective

Implement a production-ready bilingual Chinese-English product-discovery survey based on:

`research/blind-box-connection-survey-bilingual.md`

The survey targets adults who have purchased blind boxes or similar mystery character collectibles. Its primary research goal is to estimate when emotional connection to a collectible begins to weaken after unboxing and identify factors associated with faster or slower connection decay.

## Non-negotiable requirements

1. Preserve the meaning and response options of every approved question in the source Markdown file.
2. Present Chinese and English together for every title, instruction, question, option, validation message, button, and completion message.
3. Do not add unsupported market claims, psychological claims, or statements implying that IP Alive has already been validated.
4. Do not describe the concept as therapy, mental-health treatment, or a guaranteed solution to loneliness.
5. The questionnaire must be anonymous by default. Do not request names, phone numbers, email addresses, social-media handles, precise addresses, IP addresses, device fingerprints, or other directly identifying information.
6. Do not send survey data to any external analytics or third-party service unless an integration is already explicitly documented in the repository.
7. Keep the repository private-project disclaimer and exploratory-product status intact.
8. Implement accessibility: keyboard navigation, visible focus states, semantic labels, sufficient contrast, screen-reader-friendly error messages, and no information conveyed by color alone.
9. Make the survey usable on mobile and desktop.
10. Do not alter unrelated repository files.

## Survey flow and logic

Implement these required branches:

- Q0: If the respondent does not consent, end the survey without storing questionnaire answers.
- Q1: If the respondent has never purchased a blind box or similar mystery collectible for themselves, end or route them to a short ineligible completion screen.
- Q11:
  - If `Yes`, show Q12.
  - If `I never felt connected to it`, show Q13.
  - Otherwise hide Q12 and Q13.
- Keep the anchor instruction before Q5 prominent: all Q5–Q20 responses refer only to the respondent's most recently purchased and opened blind box.
- Multi-select limits:
  - Q4: maximum 3 selections.
  - Q14: maximum 3 selections.
  - Q22: maximum 3 selections.
  - Q23: unlimited selections.
- Enforce required questions only where necessary for the core analysis. Open-ended questions Q26–Q28 must remain optional.
- Include `Prefer not to say` where provided.

## Recommended technical implementation

First inspect the repository and use its existing framework, package manager, formatting rules, and testing conventions. Do not introduce a new framework if one already exists.

If the repository does not yet contain an application framework, create the smallest maintainable implementation possible and document how to run it locally. Prefer a static, privacy-preserving client-side survey prototype unless repository context clearly requires a backend.

Use a structured survey schema rather than hard-coding every page. Recommended fields include:

- `id`
- `section`
- `type`
- `prompt.en`
- `prompt.zh`
- `description.en`
- `description.zh`
- `options`
- `required`
- `displayCondition`
- `selectionLimit`
- `validation`

Keep question IDs Q0–Q31 unchanged so research exports match the approved questionnaire.

## Data model and export

Implement an export format suitable for later analysis.

Each completed response should include:

- Anonymous response ID generated locally
- Survey version
- Start timestamp
- Completion timestamp
- Locale preference, if a display-language toggle is offered
- Q0–Q31 values using stable question IDs
- Derived fields only when deterministic and clearly documented

Do not silently convert categorical time ranges into exact numbers of days. Preserve category labels or stable category codes.

Recommended derived fields:

- `initial_connection_q8`
- `current_connection_q9`
- `connection_change_q9_minus_q8`
- `connection_decay_onset_q12`
- `behavioral_disengagement_q15`
- `interaction_frequency_q16`
- `retention_intention_q18`
- `repurchase_intention_q19`
- `concept_interest_q21`

Provide CSV and JSON export for authorized local research use. Ensure bilingual labels are not used as unstable column names; use question IDs and stable English variable keys.

## UX requirements

- Show a progress indicator that accounts for conditional questions.
- Save progress locally during the session, but provide a clear `Delete my current responses / 删除当前回答` control.
- Do not retain data after completion unless the repository already specifies an approved storage mechanism.
- Use neutral language and avoid suggesting that losing interest is abnormal.
- Display the emotional-connection definition directly below Q8.
- Clearly distinguish the neutral IP Alive concept description from existing product functionality.
- Show the local-market pricing implementation note for Q25 in the research/admin configuration, not necessarily as respondent-facing copy unless configured.
- Completion screen should thank respondents and reiterate that the study is exploratory.

## Validation and quality checks

Add tests or validation coverage for:

1. Consent rejection ends the survey and does not retain answers.
2. Ineligible respondents are routed correctly after Q1.
3. Q12 and Q13 display logic is mutually correct.
4. Selection limits for Q4, Q14, and Q22.
5. Required-question validation in both languages.
6. Q8 and Q9 accept only integer values from 0 through 10.
7. Q6 and Q7 accept only values from 1 through 7.
8. Q18, Q19, and Q21 accept only values from 0 through 10.
9. Export preserves stable question IDs and categorical time ranges.
10. Keyboard-only completion of the survey.
11. Responsive layout at common mobile widths.
12. No outbound network requests during normal survey completion unless explicitly documented.

## Documentation deliverables

Create or update documentation that includes:

- How to install and run the survey locally
- How to run tests
- Survey architecture and schema
- Branching logic
- Data dictionary for Q0–Q31
- Privacy assumptions and known limitations
- How to replace Q25 price bands for a particular market
- Reminder that retrospective survey findings do not establish a precise longitudinal decay curve

## Completion criteria

The work is complete only when:

- The entire bilingual survey is implemented from Q0 through Q31.
- All branching and selection limits work.
- The interface is accessible and responsive.
- Tests pass.
- Exported data are analysis-ready and privacy-preserving.
- Documentation is complete.
- No unrelated code or content has been changed.

Before coding, inspect the repository and summarize the implementation plan. Then implement the work, run all available tests and linters, report the exact commands and results, and list every changed file.

---
