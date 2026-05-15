# Brand Voice Guidelines — Daniel McCarthy's Engineering Blog

*Generated 2026-05-14 from analysis of four posts in `_posts/` (~9,500 words):*
- *2025-07-08 — AI Agentic Development Workflows*
- *2025-12-19 — Last Six Months of AI-Powered Engineering*
- *2026-02-06 — Why Not a Plugin?*
- *2026-02-16 — Specwright: Spec-Driven Development*

These guidelines are for an LLM (or human) drafting future blog posts in Daniel's voice. Apply them when generating, rewriting, or editing posts in this repository.

---

## 1. Author identity and stance

Daniel McCarthy is a Sydney-based Data & AI engineering leader with 15+ years in engineering management. He writes as a **reflective practitioner**, not a guru. Posts are field notes from someone actively building (Memory Cascade, FinancialFusion, floe-runtime, Specwright) and actively leading engineering teams. The voice is that of a senior engineer thinking out loud in front of peers — not pitching, not teaching, not preaching.

Default reader: a fellow experienced engineer or engineering leader who already knows what TDD, CI/CD, MCP, and dependency graphs are. Don't over-explain fundamentals. Do explain new tools, named projects, and specific numbers.

Default tense and POV: first person, present-perfect for lessons (*"I've learned"*, *"I've been running"*), present for opinions (*"I think"*, *"I find"*).

---

## 2. We Are / We Are Not

| We Are | We Are Not |
|---|---|
| A reflective practitioner sharing field notes | A guru pronouncing truths |
| Specific — named tools, real numbers, repo links | Abstract, generic, or theoretical |
| Honest about limitations and failures ("warts and all") | Polished case-study perfect |
| Anti-hype, pro-evidence | Hyped, salesy, "10x", "revolutionary" |
| Pragmatic — focused on what shipped and what broke | Aspirational or academic |
| Conversational — em dashes, asides, rhetorical questions | Corporate, formal, or LinkedIn-influencer |
| Confident in opinion, humble in certainty | Timid or absolute |
| Australian English | American spelling |
| Reader-as-peer (engineering literate) | Explainer-to-novice |
| Story-led openings (claim, scene, number) | "In this post I'll cover..." openings |
| Steelmans counter-arguments before responding | One-sided or dismissive |
| Names tools, projects, people, links generously | Vague references ("some tools", "many people") |

---

## 3. Tone-by-context matrix

| Context | Tone | Pattern |
|---|---|---|
| **Opening hook** | Punchy, specific, slightly provocative | Lead with a story, a claim, or a number. *"I built floe-runtime in two weeks."* / *"On February 3rd, a legal plugin triggered a $285 billion stock selloff."* |
| **Italicised subtitle** under H1 | One-line thesis statement | *"Lessons from 18 months of experimenting with AI-assisted coding"* — sets the frame in italics, immediately under the title, before the body. |
| **Technical explanation** | Direct; jargon is fine; name the tools | Assume the reader knows what an MCP server, a dependency graph, or shift-left testing is. Link out for novel things, not foundational ones. |
| **Personal anecdote** | Self-aware, sometimes self-deprecating | *"My Claude & Cursor bills have been... significant."* Show the messy reality, including frustrations and "arguments" with the AI. |
| **Limitations and caveats** | Frank, named risks | Don't hide failures. *"There are still 101 security concerns, rough edges, and work to do."* Quantify when you can. |
| **Counter-arguments** | Steelman, then respond | Use the explicit **"X." Counter: Y.** structure. Name the strongest objection before answering it. |
| **Strong opinions** | Held confidently, qualified honestly | *"I don't have a crystal ball, and anyone who claims to know where AI development is heading in 2-3 years is either lying or deluded."* Opinion + acknowledgement of uncertainty. |
| **Closing** | Inviting, slightly provocative | End with a question to the reader and an invitation to share back. *"What's your take?"* / *"I'm always curious to hear how others are navigating this new landscape."* |
| **Author bio** (optional, post-dependent) | Brief, factual, with links | Italicised paragraph: who, where, what they're currently building, GitHub + LinkedIn. |

---

## 4. Structural conventions

### Front matter

```yaml
---
title: "Sentence Case Title: Sometimes With a Subtitle"
date: YYYY-MM-DD HH:MM:SS +1100   # AEDT; use +1000 for AEST (Apr–Oct)
categories: [Category1, Category2]  # Two categories, e.g. [AI, Development]
tags: [tag-with-hyphens, another-tag, claude-code]   # 5–8 tags, lowercase, hyphenated
---
```

Categories used so far: `AI`, `Development`, `Strategy`. Reuse where possible; introduce sparingly.

### Body skeleton

1. **Italicised subtitle** in `*asterisks*` immediately after the front matter — one or two sentences that frame the thesis.
2. **Opening paragraph(s)** — story, claim, or scene. No "in this post I'll discuss" preambles.
3. **H2 sections** with sentence-case headings. H3 only when an H2 has clear sub-parts (Specwright post is the exemplar for nested structure).
4. **Closing section** — typically titled *"What I've learned"*, *"Where I think we're heading"*, *"Closing thoughts"*, or *"The strategic question"*. Pulls back to the larger lesson.
5. **Horizontal rule** (`---`) before the closing CTA.
6. **CTA paragraph** in italics inviting reader engagement.
7. **Optional**: author bio in italics, with GitHub / LinkedIn links.

### Length

Range observed: **1,200 to 3,400 words**. Aim for the length the topic demands — strategic/opinion pieces sit higher (2,500–3,400), tool announcements and tighter deep-dives sit lower (1,200–2,500). Don't pad.

### Formatting habits

- **Bold** for emphasis on key concepts within sentences ("**context management is everything**") and for definitional lead-ins ("**Spec Kit** introduced...").
- *Italics* for asides, paper-thin emphasis, and the subtitle/CTA/bio paragraphs.
- Em dashes — used heavily — for parenthetical asides and rhythm shifts. Prefer them over commas or parens when the aside has its own beat.
- Parenthetical asides (sparingly, where italics or em dashes don't fit).
- Bullet lists used **strategically, not by default**. Reserve them for:
  - genuinely enumerable lists (tools, principles, gates),
  - when prose would become a comma soup,
  - the four-to-five-item "key principles" round-up at the end of a section.
- Numbered lists for ordered processes (the seven Specwright stages, the four-step floe-runtime cycle).
- Code blocks for filenames, CLI commands, YAML, and short snippets. Avoid long code dumps in body posts.
- Footnotes (`[^1]`) sparingly, for acknowledgements and tangents that would break the flow inline.
- Links: generous but purposeful. Always link to repos, papers, and named tools the first time they appear. Use bare descriptive link text — *"[Spec Kit](...)"*, not *"click here"*.
- **No emojis** anywhere in body copy. (None appear across all four posts.)

---

## 5. Lexicon — Australian English

**Always use Australian spellings:**

| Use | Don't use |
|---|---|
| analyse, analysed, analysing | analyze, analyzed, analyzing |
| optimise, optimised, optimising | optimize, optimized, optimizing |
| organisation, organisational | organization, organizational |
| minimise, maximise, recognise | minimize, maximize, recognize |
| behaviour, behavioural | behavior, behavioral |
| catalogue | catalog |
| centre | center |
| favour, favourite | favor, favorite |
| colour | color |

US-style spellings are acceptable in **proper nouns and tool names** when that's how the tool is officially spelled (e.g. *GitHub Actions*, *the catalog API*, *behavior-driven development* if it's a library name).

### Recurring words and phrases (preserve where natural)

- *"genuinely"* — used as an honest-amplifier (*"genuinely useful"*, *"genuinely concerning"*, *"genuinely capable"*). Don't overdo it; it's a signature, not a tic.
- *"honestly?"* — sentence-opener for a candid pivot.
- *"And yes,"* — concedes a likely objection before continuing.
- *"Here's what..."* / *"Here's the thing"* — pivot phrases that signal "now the real point".
- *"the key insight"* / *"the magic happens when"* — flagging the takeaway in a section.
- *"Sound familiar?"* / *"What's your take?"* — direct address to the reader.
- Trailing *"..."* — for thoughts that drift off, often before a comeback line.

### Phrases to avoid (none of these appear in the corpus, and they'd jar)

- "Game-changer", "revolutionary", "next-gen", "cutting-edge", "10x", "synergy"
- "In this post, I will discuss..." / "Without further ado..."
- "Spoiler alert" / "TL;DR" (Daniel doesn't use these)
- "Buckle up" / "Let's dive in" / "Let's unpack"
- LinkedIn-style hooks: "Here's the thing nobody tells you 👇"
- Excessive "honestly", "literally", "actually" — use only when adding meaning.

---

## 6. Signature moves

These are recurring patterns that, taken together, make a post sound like Daniel's:

1. **Concrete numbers as proof.** *"$285 billion"*, *"two weeks"*, *"18 months"*, *"40–60%"*, *"600 billion"*. Use real, sourced numbers — vague magnitudes ("a lot", "many") feel out of voice.
2. **Named tools and people.** Always name the tool, link the repo, credit the person. Spec Kit, Beads, Steve Yegge, Mario Zechner, SpecBeads, Claude Code, Encore, Cursor — all surfaced explicitly.
3. **Personal context as credibility.** Side projects, two kids, full-time exec role, "stolen hours". Use sparingly — once per post is plenty — but it grounds the writing.
4. **The "Counter:" structure.** When raising objections to your own argument, write the objection as bold lead-in, then a single line starting *"Counter:"*. (See *"Why Not a Plugin?"* — it's the cleanest example.)
5. **Steelman before disagreeing.** Acknowledge what's true about the opposing view before pushing back. Daniel does this with vibe coding, with hype, with security concerns, with the "production grade" objection.
6. **Self-deprecating asides.** *"I'm fallible too"*, *"my Claude bills have been... significant"*, *"who knows when it comes to performance"*. Keep them brief; they earn the strong opinions.
7. **Bold-as-pull-quote inside paragraphs.** *"**software architecture knowledge is now your superpower**"*. One bold pull-quote per major section is the cap.
8. **Closing question to the reader.** Always invite the reader to share back, push back, or compare notes.

---

## 7. Topic and scope

**In scope (high confidence — all four posts sit here):**
- AI-assisted engineering workflows
- Spec-driven development, quality gates, verification
- Engineering leadership in the AI era
- DevSecOps, shift-left, CI/CD
- Software architecture and modular design
- Tools and plugins (Claude Code, MCP, Spec Kit, Beads, Specwright)
- Strategic / business analysis of the AI engineering landscape
- Personal projects as learning labs

**Adjacent (likely fits the voice, untested):**
- Data engineering and platform architecture
- Team practices and engineering culture
- Hiring and the changing junior/senior dynamic
- Specific deep-dives into FinancialFusion, floe-runtime, Memory Cascade

**Out of scope by default** — flag for confirmation before drafting:
- Pure tutorial / "how to install X" content (Daniel's posts are reflective, not instructional)
- Listicles or "top 10" formats
- Personal-life posts unrelated to engineering
- Vendor comparisons without a strong personal stake

---

## 8. Drafting checklist (use this before submitting any draft)

- [ ] Title is sentence case, optionally with a subtitle after a colon.
- [ ] Italicised one-line subtitle sits immediately under the front matter.
- [ ] Opening paragraph leads with a claim, story, or number — not a preamble.
- [ ] First-person throughout; assumes a peer reader.
- [ ] All spellings are Australian English (analyse, optimise, organisation, behaviour, etc.).
- [ ] At least one named tool, project, or person with a link.
- [ ] At least one concrete, verifiable number (not "lots", "many", "a huge percentage").
- [ ] At least one acknowledged limitation or caveat — no glossy perfection.
- [ ] Em dashes used for asides; bullet lists used only where they earn their place.
- [ ] Bold used sparingly for emphasis and definitional lead-ins; no shouty all-caps.
- [ ] No emojis in the body.
- [ ] No hype words ("game-changer", "revolutionary", "10x", "let's dive in", "buckle up").
- [ ] Closing section titled with a thinking-out-loud heading (*"What I've learned"*, *"Where I think we're heading"*, *"Closing thoughts"*).
- [ ] Horizontal rule, then italicised CTA inviting the reader to share back.
- [ ] Optional italicised author bio with GitHub + LinkedIn links if the post warrants it.
- [ ] Front matter date includes the correct timezone offset (`+1100` AEDT in Oct–Apr, `+1000` AEST in Apr–Oct).
- [ ] Categories use existing values where possible (`AI`, `Development`, `Strategy`).

---

## 9. Confidence scores

| Area | Confidence | Notes |
|---|---|---|
| Voice attributes (reflective, anti-hype, specific, honest) | **High** | Consistent across all four posts. |
| Australian English lexicon | **High** | Consistent throughout the corpus. |
| Front matter structure | **High** | Identical pattern in all four posts. |
| Italicised subtitle pattern | **High** | Present in all four posts. |
| Em-dash and aside-heavy prose | **High** | Universal across posts. |
| Closing CTA inviting engagement | **Medium-High** | Present in 3 of 4 posts (Specwright closes with a feedback ask but no italicised CTA paragraph). |
| Author bio at end | **Low-Medium** | Only the December 2025 post uses it explicitly. Treat as discretionary. |
| Footnotes | **Low-Medium** | Used in one post only. Available, not required. |
| Topic scope beyond AI engineering | **Low** | Untested — the corpus is single-domain so far. |
| Length norms | **Medium** | Range observed (1.2k–3.4k words) is wide. Match length to topic depth. |

---

## 10. Open questions for Daniel

These are gaps the corpus doesn't fully resolve. Worth confirming so future drafts don't drift:

1. **Author bio** — should it appear on every post, only on opinion/strategy posts, or only when introducing a project? (Currently 1 of 4.)
2. **Italicised CTA closing paragraph** — is this expected on every post, or only ones where you actively want discussion? (Currently 3 of 4.)
3. **Categories vocabulary** — happy to keep `AI`, `Development`, `Strategy` as the core set, or do you want a wider taxonomy as you write more?
4. **Link policy** — happy with the current "always link tools/repos on first mention" rule, or do you want a tighter / looser bar?
5. **Topics outside AI engineering** — if you want to write about data engineering, leadership without an AI angle, or anything else, confirm whether the same voice applies or whether it should adapt.
6. **Footnotes** — keep available as a discretionary aside-tool, or actively encourage / discourage?
7. **First-draft length target** — should the LLM aim short (1,500-ish) and let you expand, or aim long (2,800-ish) and let you cut?

If you answer any of these, I can fold the answers back into this file and bump the confidence scores accordingly.
