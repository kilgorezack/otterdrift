# OtterDrift

**Internet that drifts with you.**

OtterDrift is a demonstration broadband experience brand that positions internet service as a lifestyle product rather than a utility. The website guides users through a personalized, Apple-inspired buying flow — no technical jargon, no speed tiers, no confusing comparisons. Users describe how they live, and OtterDrift shapes a named plan around them.

## Project Overview

This is a static website (HTML, CSS, vanilla JS) with two main pages:

- **Homepage** (`index.html`) — Brand introduction with animated hero, philosophy section, "How It Works" steps, personalization preview, and reassurance elements.
- **Buyer Flow** (`build.html`) — A 4-step guided experience where users build their personalized plan.

## Buyer Flow

The buyer flow follows a guided configurator model:

1. **Your Foundation** — Introduces the single OtterDrift One that every plan starts from.
2. **Your Lifestyle** — Users select one or more lifestyle profiles (Busy Household, Home Office, Streaming, Gaming, Smart Home). This determines the plan's name and core narrative.
3. **Your Enhancers** — Optional add-ons: Intelligent Flow Management, Digital Safety, Guest Access, Outdoor & Extended Reach, Quiet & Focus Modes.
4. **Your Experience** — Summary page with a dynamically named plan (e.g., "OtterDrift Family", "OtterDrift Gamer"), problem-solving narrative, consolidated monthly price, and checkout.

### Dynamic Plan Naming

Plans are named based on lifestyle selections with a priority system:

| Lifestyle | Plan Name |
|---|---|
| Busy Household | OtterDrift Family |
| Home Office | OtterDrift Pro |
| Streaming | OtterDrift Stream |
| Gaming | OtterDrift Gamer |
| Smart Home | OtterDrift Connected |

The plan is named after the first lifestyle the user selects. Additional lifestyle selections enhance the plan's features and price but keep the single plan name. Selecting all 5 lifestyles upgrades to **OtterDrift Connected** — the complete home experience.

### Pricing

Individual addon prices are never shown to the user. A single consolidated monthly price is calculated behind the scenes and displayed at checkout.

## File Structure

```
otterdrift/
  index.html          Homepage
  build.html          Buyer flow (4-step configurator)
  css/
    style.css         Complete design system (~1,870 lines)
  js/
    main.js           Homepage interactions (nav, scroll animations, parallax)
    build.js          Buyer flow logic (state, plan naming, narratives, pricing)
```

## Design System

Built with CSS custom properties for a consistent ocean-inspired palette:

- **Primary**: `#0B1D35` (deep navy)
- **Secondary**: `#1B4965` (ocean blue)
- **Accent**: `#5FA8D3` (calm blue)
- **Typography**: Inter (with system font fallbacks)
- **Animations**: Gradient shifts, wave floats, glow bars, scroll-triggered fade-ups via `IntersectionObserver`

Responsive breakpoints at 1024px, 768px, and 480px.

## Brand Guidelines

- **Tone**: Calm, fluid, friendly, modern, confident, premium
- **Language**: No technical jargon (no speeds, Mbps, latency, bandwidth, etc.)
- **Framing**: Internet as a seamless experience, not a utility product
- **Narratives**: Problem-solving descriptions specific to each household type (e.g., "No more arguing over who gets the connection" for Family)

## Running Locally

Open `index.html` in a browser. No build tools, dependencies, or server required.

