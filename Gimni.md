# CafeBot - Developer & AI Guidelines (Gimni.md)

This document outlines the core architecture, operational rules, security standards, and workflow practices for developing the **CafeBot** application.

---

## 1. Project Purpose

**CafeBot** is an interactive café web application that combines a clean digital ordering experience with an AI-powered conversational café assistant. 
Its primary objectives are:
- Enabling customers to browse drinks, pastries, and seasonal specials.
- Assisting customers with beverage recommendations tailored to flavor preferences, dietary restrictions, and caffeine levels.
- Facilitating drink customization (milk choices, syrups, espresso shots, ice/sweetness levels).
- Streamlining order placement and inquiry handling with minimal friction.

---

## 2. Architecture Overview

The system follows a lightweight, modular client-server architecture:

```text
CafeBot/
├── frontend/             # Client-side presentation layer
│   ├── index.html        # Semantic HTML structure
│   ├── styles.css        # Theme variables, responsive layouts, styling
│   └── app.js            # UI events, state handling, API calls
├── backend/              # Server-side layer
│   └── server.js         # REST endpoints, session handling, AI proxy
├── data/                 # Data storage & catalogs
│   └── menu.json         # Structured catalog (categories, items, pricing, tags)
├── prompts/              # Prompt engineering assets
│   └── system_prompt.txt # Base system prompt and persona definitions
├── Gimni.md              # Project guidelines & AI operational handbook
└── README.md             # Project documentation & setup instructions
```

- **Frontend**: Lightweight client handling rendering, UI interactions, and responsive design.
- **Backend**: Express/Node server acting as a secure proxy between client requests and AI/data services.
- **Data**: Static JSON schemas and catalogs serving as the authoritative menu state.
- **Prompts**: Versioned prompt templates and context snippets consumed by the backend.

---

## 3. Coding Rules

- **Modularity & Separation of Concerns**: Keep presentation, business logic, and data handling isolated.
- **DRY & Readability**: Write concise, self-documenting code with clear variable and function names.
- **Defensive Programming**: Validate inputs, verify API responses, and provide graceful fallback states for network or model errors.
- **Standardized Formats**: Use strict JSON formatting for API payloads and data schemas.
- **No Extraneous Dependencies**: Prefer native web APIs and minimal libraries over heavy packages unless strictly necessary.

---

## 4. Security Rules

- **Zero Secrets in Frontend**: Never place API keys, private tokens, or secrets in client-side files (`frontend/` or public assets).
- **Environment Variables**: Store all credentials and environment-specific settings in `.env` files; never commit active secrets to version control.
- **Input Sanitization**: Sanitize and validate all user inputs on both frontend and backend before persisting or forwarding to downstream APIs.
- **Prompt Injection Defense**: Treat all user-supplied text as untrusted. Enforce strict guardrails and delimited prompt formatting to prevent prompt injection and system override.
- **CORS & Rate Limiting**: Restrict cross-origin access and implement basic request throttling on backend endpoints.

---

## 5. Token-Saving Rules

- **Concise System Prompts**: Keep system instructions sharp, focused, and free of conversational fluff.
- **Context Window Management**: Limit multi-turn chat history to the most recent relevant interactions (e.g., last 4–6 messages) rather than unbounded history.
- **Structured Data Over Natural Language**: Pass menu selections and state using compact JSON rather than verbose prose.
- **Selective Retrieval**: Inject only relevant menu sections or items into the prompt context rather than streaming the full menu on every interaction.
- **Deterministic Tasks via Code**: Use deterministic code for math, pricing calculations, and cart updates rather than asking the LLM to compute totals.

---

## 6. Scope Discipline (Task Boundary Instruction)

- **Only Modify Required Files**: Always restrict file creation and edits strictly to the files necessary for the immediate assigned task.
- **No Unsolicited Refactoring**: Do not touch, reorganize, or rewrite working, unrelated files.
- **Minimal Diffs**: Make targeted, surgical changes rather than broad whole-file overwrites whenever editing existing modules.
