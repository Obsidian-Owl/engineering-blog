---
title: "AI Agentic Development Workflows: A Personal Journey"
date: 2025-07-08
categories: [AI, Development]
tags: [claude-code, ai-development, software-architecture, tdd, workflows]
---

*Lessons from 18 months of experimenting with AI-assisted coding*

I've spent the last year and a half tinkering with AI coding tools on my personal projects. Not for work, not for any grand purpose - just pure curiosity about what's possible when you push these tools to their limits.

This post shares what I've learned about building an effective AI-assisted development workflow. It's not a sales pitch or a "10x engineer" fantasy. It's just my experience, warts and all.

## My Learning Labs

I should clarify upfront - these insights come from personal projects with zero real users. But I've tried to maintain professional standards because, well, that's how you learn properly.

**Memory Cascade** is my gaming passion project - an isometric adventure game with AI-powered NPCs. Built with Unity 6000.1.9f1 and a TypeScript backend on Railway.

**FinancialFusion** is where I experiment with enterprise patterns - a financial data platform built with Go and Encore. 

Both are deployed to real cloud infrastructure (AWS and Railway) because I wanted to understand the full development lifecycle, not just the coding bits.

## Finding the Right Tools

I've tried most of the AI coding assistants out there - Cursor, Windsurf, Devon, Roo Code, Cline, Copilot, and Claude Code. 

For my workflow, Claude Code has been the most effective. Its approach to agent-based development, combined with thoughtful prompt engineering and context awareness, creates something that feels genuinely collaborative rather than just predictive text on steroids.

That said, it's not without its challenges. My Claude Code bills are... significant. And the cognitive load of orchestrating it properly is real.

## How I Actually Work

### The Flow from Idea to Implementation

My process has evolved into something like this:

1. **Research and Ideation** - I use Claude Desktop's Research Mode to explore ideas and understand the problem space
2. **Structured Planning** - ChatPRD helps me transform scattered thoughts into miniPRDs that go into Linear
3. **Architecture Refinement** - I iterate on design docs until they're consistent enough to guide implementation
4. **Execution with Claude Code** - Using slash commands and Planning Mode to maintain structure

The critical insight? I'm always driving. The AI doesn't run autonomously - I'm constantly course-correcting, catching mistakes, and refining the approach.

### Documentation: The Real Story

Everyone talks about CLAUDE.md as if it's magic. For me, it's just a lightweight file with terminal commands, high-level architecture notes, and coding preferences. Helpful? Sure. Critical? Not really.

The real value is in my detailed architecture document in `/docs/technical/`. This is where I invest serious time - creating comprehensive design documents that I continuously inject into prompts and slash commands to keep the AI aligned.

Here's what I think the future looks like: engineers will spend much more time on design, especially **interface specification design**. This is my weakest area - I still let AI design interfaces, and frankly, neither of us are good at it. 

Ideally, I'd design all interfaces myself, use contract tests on top of TDD practices, and let AI fill in what's "inside the box." With proper quality controls, AI can build workable software - but only when the boundaries are crystal clear.

### Quality Gates That Actually Work

My pre-commit and CI/CD pipeline has evolved into a comprehensive safety net. Every time Claude Code commits code, automated checks run to catch common issues - trailing whitespace, malformed JSON/YAML files, accidentally committed private keys, and more.

For Unity projects, I validate that all assets have their required meta files (a common source of project corruption when AI forgets to track them). For backend code, I run ESLint and TypeScript compilation checks - but here's the crucial bit: **everything runs in Docker containers that match my CI environment exactly**.

This Docker-based approach catches environment-specific issues before they hit production. I've actually had "arguments" with Claude Code about bugs because "it works on my machine" - the AI was right, it did work in its environment, but failed in CI due to subtle differences. Sound familiar?

My `local-ci.sh` script takes this further by mirroring my entire GitHub Actions workflow. Before Claude pushes any code, it can run the exact same validation suite that CI will run. This dramatically reduces failed builds and, crucially, means I don't have to keep prompting Claude to check GitHub Actions logs - the feedback is right there in the agent session.

The pre-push hooks are even more comprehensive - running the full test suite, security audits, and checking for any large files that should be in Git LFS. It's saved me from countless embarrassing force-pushes that would have broken the build.

### Claude Code: The Secret Sauce

But quality gates only work if your AI agent can actually use them effectively. This is where Claude Code's features become essential:

**Planning Mode** forces Claude to think before acting. Instead of immediately writing code, it researches the feature, analyses the current codebase, and determines the right approach. This catches architectural issues before they become code.

**Slash Commands** provide structured workflows that ensure consistency. My custom commands like `/develop`, `/fix`, and `/validate` aren't just shortcuts - they inject the right context, standards, and checks at each stage.

**Unix-style usage** means Claude Code can be part of your CI pipeline itself. I can pipe test results through Claude for analysis, use it to generate test cases based on coverage reports, or have it analyse build failures. This creates a feedback loop where AI helps improve the very systems that validate its work.

But here's what really matters: **context management is everything**.

As the AI controller, you must ensure all the right information is in the context window at the right time. Too much context creates confusion. Too little leads to mistakes. The directions must be clear, specific, and have exactly the right level of depth.

This is why I continuously inject my architecture documents into prompts. Why I use targeted slash commands instead of open-ended requests. Why Planning Mode is so crucial - it lets Claude build its own context understanding before acting.

Managing context is exhausting but essential. It's the difference between AI that builds robust systems and AI that creates technical debt.

### Test-Driven Development: Where AI Shines

The robots love TDD. When you have AI write tests first, then implement to pass those tests, the quality improvement is dramatic. 

My `/test-review` slash command for Claude Code ensures the AI validates:

- Single responsibility per test
- Clear test naming conventions
- Proper Unity lifecycle handling
- Security and performance test coverage
- Edge cases and boundary conditions

The magic happens when you combine TDD with AI's ability to generate comprehensive test suites. It catches edge cases I wouldn't think of, but you need to review carefully - AI sometimes writes tests that always pass or test the wrong things.

### Framework Accelerators

One of my biggest discoveries: lean heavily on frameworks and platform accelerators.

In FinancialFusion, Encore + Go creates an incredibly tight feedback loop:

- Type safety catches errors immediately
- Compiler checks provide instant AI feedback
- Built-in observability reduces debugging time
- Infrastructure-as-code eliminates deployment complexity

This rapid feedback is invaluable. When AI makes mistakes (and it will), you know immediately.

## The Reality of AI Development

Some days, the flow is incredible. The code feels like an extension of my imagination - ideas becoming reality at the speed of thought. We truly "vibe" together, and it's intoxicating.

Then there are the other days.

Days when the AI builds an entire custom solution despite my request to use an existing framework. My intent was to minimise maintenance burden, but I didn't express it clearly enough. By the time I notice, we're too far down the wrong path, and I have to scrap hours of work.

The exhausting part? I'm fallible too. My attention slips. I miss deviations. Then I beat myself up for not watching closely enough, even though I'm already stretching my brain to keep up with the pace of AI-generated code.

Some days I feel more like an air traffic controller than a developer - orchestrating multiple AI agents, catching hallucinations, maintaining quality standards, all while reviewing code at superhuman speeds.

The AI doesn't get tired, but you will.

## My Toolkit

Beyond Claude Code, here's what actually makes a difference:

**MCP Servers** for context persistence:

- Linear MCP for project management
- Context7 for documentation reference
- Playwright for testing automation
- Encore MCP for backend integration

But honestly? **High-quality CLI tools often beat everything else**:

- `gh` (GitHub CLI) - Essential for repository management
- `railway` - Deployment without the pain
- `encore` - Backend service orchestration

The key is immediate, parseable feedback that AI agents can work with effectively.

## What I've Learned

After all this experimentation, the core lesson is clear: **software architecture knowledge is now your superpower**.

I'm not talking about enterprise architecture diagrams. I mean understanding software patterns, interface design, language strengths, and framework capabilities. The ability to recognize when AI is building something flimsy versus something solid.

Key principles that matter more than ever:

1. **Interface design is everything** - Clear contracts between modules prevent AI from creating tangled messes
2. **Shift left testing saves your sanity** - Early detection considerably results in increased efficiency and reduced technical debt
3. **Modular design ≠ microservices** - Each module focuses on tasks like handling user input, processing data, taking orders, or rendering graphics
4. **Continuous integration catches AI drift** - Immediate feedback when AI violates patterns
5. **Framework knowledge guides AI choices** - Understanding when to use Rust vs Go vs TypeScript shapes better prompts

The productivity gains are real, but they come from knowing HOW to build good software, not just letting AI build it.

## Moving Forward

The future of software development isn't about writing code - it's about knowing how code should be written.

My advice? **Learn languages like Rust and Go**. Not because you'll write much code in them, but because understanding their design philosophies - Rust's ownership model, Go's simplicity and concurrency - helps you spot when AI is building something brittle.

Focus on mastering:

- **Design patterns** that have stood the test of time (SOLID principles, Factory, Observer)
- **Modular architecture** with clear boundaries and single responsibilities
- **Shift left practices** where testing and security start from day one
- **Interface-first design** that creates clear contracts before implementation

Your job is becoming the quality gatekeeper. You'll spend less time writing code and more time:

- Catching when AI builds custom solutions instead of using proven libraries
- Identifying architectural drift before it compounds
- Ensuring modules stay loosely coupled and highly cohesive
- Maintaining the bigger picture while AI handles the details

This isn't about resisting AI - it's about becoming the architect who ensures AI builds cathedrals, not card houses. The tools will keep evolving, but understanding software fundamentals will only become more valuable.

If you're starting this journey: invest in understanding software design principles, use frameworks that enforce good patterns, adopt shift left practices religiously, and never forget - you're the architect. The AI is just your very fast but occasionally misguided construction crew.

---

*What's been your experience with AI coding tools? I'm always curious to hear how others are navigating this new landscape - feel free to reach out and share your story.*

