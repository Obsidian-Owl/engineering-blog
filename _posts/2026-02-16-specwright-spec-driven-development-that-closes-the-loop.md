---
title: "Specwright: Spec-Driven Development That Closes the Loop"
date: 2026-02-16 09:00:00 +1100
categories: [AI, Development]
tags: [claude-code, specwright, ai-development, tdd, quality-gates, plugins, workflows, spec-driven-development]
---

*I've spent the past eighteen months building software with AI agents. The speed is extraordinary. The quality—without guardrails—is not. Specwright is my answer to the gap between "tests pass" and "it actually works."*

## The Problem I Kept Hitting

If you've been coding with AI agents for any length of time, you know the feeling. You describe what you want. The agent writes it. Tests pass. CI is green. You merge. And three days later, you discover the feature is half-wired—an export nobody imports, a handler that's never called, a validation rule that exists in the spec but not in the code.

The tests pass because the tests were written by the same agent that wrote the implementation, and that agent optimised for "done," not "correct." It's the AI equivalent of marking your own homework.

I've written about this before. My early experiments with AI-assisted development produced impressive velocity and inconsistent quality. Every project taught me something new about where the gaps were—not in the AI's ability to write code, but in the feedback loops around it.

## What I Tried First

I went through the usual progression. I tried [Spec Kit](https://github.com/spec-kit/spec-kit) and genuinely liked the structured approach—spec-first development is the right idea. But it focused heavily on the planning side and didn't have the verification muscle I needed. Specs would get written beautifully, then the implementation would drift, and nothing would catch it until a human reviewed the PR.

I experimented with [Oh-My-ClaudeCode](https://github.com/anthropics/oh-my-claudecode) and appreciated the configurability. But it felt a bit too hands-off for my taste. I generally prefer a model where I'm heavily involved at key points in the cycle—design decisions and verification—rather than delegating the whole thing end-to-end.

None of the tools I found really focused on the git ops and quality controls I wanted. So I ended up accumulating skills, rules, and constitution files scattered across projects. Every project had its own flavour. Nothing was consistent, nothing got updated systematically, and the lessons from one project never made it to the next.

I needed a central utility I could install once, improve continuously, and trust to enforce quality everywhere.

## What Specwright Is

[Specwright](https://github.com/Obsidian-Owl/specwright) is a Claude Code plugin that enforces spec-driven development with quality gates. It's not a planning tool. It's not a code generator. It's a verification loop closer.

The core premise is simple: every requirement should be traceable to implementation evidence *and* test evidence. If you can't show both, it hasn't shipped.

The workflow runs through seven stages:

**Init** → **Design** → **Plan** → **Build** → **Verify** → **Ship** → **Learn**

Each stage has strict boundaries. You can't write code during planning. You can't create PRs during building. You can't skip verification. The system defaults to FAIL—evidence must prove PASS, not the other way around.

This sounds rigid, and it is. Deliberately. The whole point is that the places where AI agents cut corners are the places where you need the most structure.

## How It Actually Works

### Init: Detect, Don't Interrogate

When you run `/sw-init`, Specwright scans your codebase and infers as much as it can—languages, frameworks, test runners, git strategy. It asks you about the things it can't detect: your project's vision (captured in a CHARTER.md), your development practices and standards (captured in a CONSTITUTION.md), and your quality expectations.

The constitution is the key artifact. It's where you encode the practices that matter to you—testing standards, naming conventions, error handling patterns, security requirements—indexed and versioned. This becomes the source of truth that the AI references throughout every subsequent stage.

### Design: Challenge Before You Commit

`/sw-design` is where the solution takes shape. Specwright researches your codebase, produces a design, and then—critically—delegates to an adversarial architect agent whose entire job is to poke holes. "What did you miss? What will break? What are you over-engineering?"

The design gets challenged before a single line of implementation is written. You review, discuss, and approve. Change requests are supported—run it again with modifications if the first pass isn't right.

This is one of the stages where I stay heavily involved. I want to see the design, argue with the critic's findings, and make the architectural calls myself. The AI does the legwork, but the decisions are mine.

### Plan: Specs With Teeth

`/sw-plan` decomposes the approved design into work units with testable acceptance criteria. Not vague descriptions—concrete, verifiable statements that the verification stage will check against actual code.

If the work is large enough, it gets broken into multiple units, each with its own spec and build-verify-ship cycle.

### Build: Adversarial TDD

This is where it gets interesting. `/sw-build` doesn't just write code and tests in one pass. It uses two separate agents with opposing objectives.

The **tester** agent writes tests first, designed to be *hard to pass*. Its mindset is: "How can I prove this is wrong?" It hunts for weak assertions (anything like `expect(x).toBeDefined()` is worthless), over-mocking (if you mock the thing you're testing, you're testing nothing), and missing edge cases.

Then the **executor** agent makes those tests pass. One task at a time. No architecture decisions—those came from the spec. If the spec is unclear, it stops and reports confusion rather than guessing.

This separation is critical. When the same agent writes both tests and implementation, it unconsciously writes tests that its implementation will pass. Splitting the roles forces genuine adversarial coverage.

### Verify: Five Gates, Evidence Required

`/sw-verify` is the heart of the system. It runs five quality gates in dependency order:

**Build gate** — Does it compile? Do the existing tests pass? This is table stakes, but you'd be surprised how often AI-generated code breaks the build in non-obvious ways.

**Test quality gate** — Are the tests actually good? This delegates to the tester agent for adversarial analysis: assertion strength, boundary coverage, mock discipline, error path coverage. Weak tests are flagged as blockers.

**Security gate** — Two phases. First, automated scanning for secrets, .env files in commits, missing .gitignore entries. Second, LLM analysis for injection patterns, data trust assumptions, and auth weakening. The second phase catches things no linter will find.

**Wiring gate** — This is the one I built because nothing else was catching it. Are there unused exports? Orphaned files that nothing imports? Layer violations where code crosses architectural boundaries? Circular dependencies? The wiring gate delegates to the architect agent to trace the actual dependency graph and flag anything that compiles but isn't connected.

**Spec compliance gate** — The final check. Every acceptance criterion from the spec is mapped to an implementation reference (file and line) *and* a test reference (specific test case). If a criterion has implementation but no test, that's a warning. If it has neither, that's a failure. No exceptions.

Gates show findings, not just badges. You see the problems, the evidence, and the recommendations—not a green tick and a prayer.

### Ship: PRs With Proof

`/sw-ship` creates pull requests with evidence baked in. Every acceptance criterion is mapped to its implementation reference and test reference in the PR body. Reviewers can see exactly what was built, how it was tested, and where the evidence lives.

This transforms code review from "does this look right?" to "does the evidence support the claims?" It's a fundamentally different conversation.

### Learn: Knowledge That Compounds

`/sw-learn` captures patterns worth remembering. Build breaks, security findings, architectural insights—anything useful gets surfaced and presented to you. You decide what to promote to the CONSTITUTION (so it applies to all future work), what goes into a patterns file for reference, and what to dismiss.

The learning system uses tiered memory: a hot index for quick lookup, warm theme files for grouped insights, and cold raw data that's never deleted. Knowledge compounds across sessions and across projects.

## The Design Philosophy

Seven principles guide Specwright's architecture. A few are worth calling out.

**Goals over procedures.** Skills state *what* to achieve, not step-by-step *how*. The AI has freedom in approach but not in outcomes.

**Freedom calibrated to fragility.** Creative work like design and code review gets high freedom. Fragile operations like state mutations and git commands get strict protocols with explicit rules. Git operations alone have a 134-line protocol covering four branching strategies, conventional commits, and explicit file staging (never `git add -A`).

**Progressive disclosure.** Every skill stays under 600 tokens. Detail lives in protocols loaded on demand. The system has ten shared protocols covering everything from state management to evidence freshness to compaction recovery, but they only load when needed—keeping context lean.

**Default FAIL.** Every gate, every review, every verification starts from the assumption that things are broken. Evidence must prove otherwise. The reviewer agent's instructions are explicit: "Give no benefit of the doubt. If a criterion is ambiguous, FAIL it and explain what evidence is needed."

## What This Has Given Me

I've been running Specwright across multiple projects for several months now. The difference isn't speed—though the structured workflow does eliminate a lot of back-and-forth. The difference is consistency.

Every project, regardless of language or framework, follows the same quality discipline. The constitution carries my standards. The gates enforce them. The learning system improves them over time.

I no longer find orphaned code in PRs. I no longer discover that a feature "works" but is never actually called from the UI. I no longer merge specs that sound comprehensive but have criteria that were never verified.

The biggest shift is cultural rather than technical. Specwright changes the relationship between me and the AI from "write this for me" to "prove to me this works." That framing—evidence over trust—turns out to be the thing that was missing.

## Why Open Source It Now

I built Specwright to solve my own problems. But the problems aren't unique to me. Anyone using AI agents for serious development work is hitting the same quality gaps—they're just papering over them with more manual review, or accepting more defects, or both.

The plugin is MIT-licensed and ready to try. Install it, run `/sw-init` on your project, and see what happens. The constitution and charter setup takes five minutes and gives the system everything it needs to enforce your standards, not mine.

If you're building with Claude Code and you've felt the gap between "tests pass" and "it actually works," I'd like to know if this helps close it.

**Repository:** [github.com/Obsidian-Owl/specwright](https://github.com/Obsidian-Owl/specwright)

Feedback welcome—issues, PRs, or just telling me what broke. The whole point of this tool is that quality improves through evidence, and the best evidence comes from people using it on real projects.
