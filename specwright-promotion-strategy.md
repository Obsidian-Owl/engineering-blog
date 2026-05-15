# Specwright — GitHub Stars & Promotion Strategy

## 1. GitHub Repository Optimisation (SEO & Discoverability)

### Repository metadata — do these immediately
- **Description:** "Claude Code plugin for spec-driven development with quality gates. Adversarial TDD, wiring verification, evidence-based PRs." (Keep it under 350 chars, keyword-rich)
- **Topics/Tags:** Add all of these: `claude-code`, `claude-code-plugin`, `ai-development`, `spec-driven-development`, `tdd`, `quality-gates`, `developer-tools`, `ai-agents`, `code-quality`, `software-engineering`, `cli-plugin`, `devtools`
- **Website URL:** Set to your blog post URL
- **"About" section:** Fill in if not already done

### README improvements
- Add badges: MIT license, version, "Made for Claude Code"
- Add a clear **Quick Start** section (3 commands to get running)
- Add a GIF or screenshot showing the workflow in action (this massively boosts engagement — repos with visual demos get 2–3x more stars)
- Add a "Why Specwright?" section that addresses the pain point in 3 sentences
- Add a comparison table: Specwright vs Spec Kit vs Oh-My-ClaudeCode vs manual workflows (be respectful — highlight what each does well, then show where Specwright fills the gap)

### GitHub-specific boosts
- Create a `CONTRIBUTING.md` — signals the project is serious and welcomes community
- Add issue templates (bug report, feature request) — lowers the barrier for engagement
- Pin the repo on your Obsidian-Owl GitHub org profile
- Create 2–3 "good first issue" issues for contributors to pick up

## 2. Search Engine Optimisation

### Google indexes GitHub repos, but blog content ranks faster
- Your blog post is the primary SEO asset — it has longer-form content Google prefers
- Target keywords: "claude code plugin quality gates", "spec-driven development AI", "AI code verification", "adversarial TDD claude"
- The blog post title is good for search — "Specwright: Spec-Driven Development That Closes the Loop" hits key terms

### Backlinks are the biggest ranking factor
- Every place you share the blog creates a backlink
- Cross-post the blog content to Medium and dev.to (with canonical URL pointing to your blog) — this creates high-authority backlinks AND reaches those platforms' audiences
- Answer relevant questions on Stack Overflow and link to the repo where genuinely helpful

## 3. Community Promotion — Where to Share

### High-impact channels (do these in the first week)

| Channel | What to post | Why it works |
|---------|-------------|-------------|
| **Hacker News** (Show HN) | "Show HN: Specwright – Spec-driven dev with quality gates for Claude Code" + 3-paragraph summary | HN loves open-source dev tools. A front-page hit can drive 5k+ stars in a day. Post Tuesday–Thursday, 9–11am US Eastern. |
| **Reddit r/ClaudeAI** | Blog link + personal story about what prompted you to build it | Active community of Claude users, your exact target audience |
| **Reddit r/programming** | Focus on the adversarial TDD and verification concepts, not Claude-specific | Broader dev audience, they care about ideas not vendor loyalty |
| **Reddit r/ExperiencedDevs** | Frame as "how I solved the AI quality gap" | Senior devs who feel the same pain |
| **Claude Code Discord** | Share in #plugins or #showcase channel | Direct users who can install it right now |
| **X/Twitter** | Thread version of the LinkedIn post — one concept per tweet | Tag @AnthropicAI, @alexalbert__, relevant Claude Code community accounts |
| **Dev.to** | Cross-post the full blog (set canonical URL to your blog) | Dev.to articles rank well on Google and have built-in distribution |
| **Medium** | Cross-post the full blog (set canonical URL to your blog) | Same as dev.to — wider audience, good SEO |

### Secondary channels (week 2+)

| Channel | Approach |
|---------|----------|
| **LinkedIn groups** | AI Engineering, Software Architecture, DevOps groups — share the post |
| **Indie Hackers** | Frame as a developer tool launch story |
| **Lobste.rs** | Similar audience to HN, smaller but high-quality engagement |
| **Changelog News** | Submit to changelog.com/news — popular with dev tools audience |
| **Console.dev** | Submit to console.dev — curated newsletter featuring dev tools |
| **Product Hunt** | Launch as a dev tool — good for initial burst of attention, though audience is broader than your target |

## 4. Content Marketing (Ongoing)

### Create derivative content from the blog post
- **Short video (2–3 min):** Screen recording of running `/sw-init` through `/sw-ship` on a real project. Post to YouTube, LinkedIn, X. Dev tool demos perform extremely well.
- **Diagram/infographic:** The 7-stage workflow as a visual. Post standalone on LinkedIn and X — visual content gets 3x engagement.
- **"Before and after" post:** Show a real PR without Specwright (vague description, no evidence) vs with Specwright (criterion-mapped evidence). Concrete comparisons are shareable.

### Write follow-up blog posts
- "How Specwright's Adversarial TDD Catches What Normal Testing Misses" — deep dive on the tester/executor split
- "The Wiring Problem: Why AI-Generated Code Compiles But Doesn't Connect" — this is a pain point people don't have a name for yet. Naming it gives you SEO ownership.
- "Running Specwright on a Go Microservice from Scratch" — tutorial content ranks well and converts readers to users

## 5. Engagement Tactics

### Star-driving specific actions
- **Ask for stars explicitly** in your blog post footer and README — "If this helps, a star on GitHub helps others find it." People genuinely forget to star things they find useful.
- **Respond to every issue and PR quickly** in the early days — fast maintainer response is the #1 signal that a project is worth engaging with.
- **"Star if you use it" badge** — Some repos add a CTA in the README. It works.

### Community building
- Create a Discussions tab on the GitHub repo — lower barrier than issues for questions and ideas
- Consider a small Discord or use GitHub Discussions as your community hub
- Engage in Claude Code community channels regularly (not just promoting — answer questions, help people, build reputation)

## 6. Timing and Sequencing

### Week 1: Launch
1. Optimise GitHub repo (description, topics, README, badges, CONTRIBUTING.md)
2. Publish blog post
3. LinkedIn post (Tuesday–Thursday morning)
4. X/Twitter thread
5. Reddit posts (r/ClaudeAI first, then r/programming)
6. Show HN submission
7. Cross-post to dev.to and Medium

### Week 2: Amplify
1. Follow up on any HN/Reddit traction with engagement in comments
2. Share the video demo if you've made one
3. Submit to Console.dev, Changelog News
4. Post in LinkedIn groups
5. Engage in Claude Code Discord

### Week 3+: Sustain
1. Publish first follow-up blog post
2. Respond to all issues/discussions
3. Share interesting findings from community usage
4. Start working on the next derivative content piece

## 7. Metrics to Track

- **GitHub stars** (primary vanity metric, but signals traction)
- **GitHub clones/unique visitors** (Settings → Traffic — actual adoption signal)
- **Blog post views** (if you have analytics on the Jekyll site)
- **Referral sources** (which channels drive the most traffic/stars)
- **Issues opened** (engagement signal — people using it enough to find problems)

The single highest-leverage action is getting on the Hacker News front page. A well-timed "Show HN" with a compelling one-line pitch and your blog post as the URL can drive thousands of stars in 24 hours. Everything else compounds from there.
