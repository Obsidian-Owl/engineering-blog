---
title: "Why Not a Plugin?"
date: 2026-02-06 10:00:00 +1100
categories: [AI, Strategy]
tags: [ai-agents, skills-md, plugins, enterprise, software-architecture]
---

*On February 3rd, a legal plugin triggered a $285 billion stock selloff. It wasn't a technological breakthrough. It was markdown files and lightweight tooling. What does that mean for how we build software?*

## The Signal

Thomson Reuters fell 16%. LexisNexis parent RELX dropped 14%. Indian IT giants, financial services firms, and asset managers all took hits. In four days, markets repriced an entire industry.

The cause? Anthropic released eleven open-source plugins for Claude Cowork on January 30th. Among them was a legal plugin—markdown files describing how to automate contract review, NDA triage, compliance workflows, and legal briefings. Not a new model. Not superior engineering. Just domain expertise encoded in text, surfaced to a general-purpose AI.

This wasn't an isolated event. Twelve months earlier, DeepSeek triggered a $600 billion single-day loss at Nvidia by demonstrating that competitive AI models could be trained for $5.6 million in compute instead of hundreds of millions. OpenClaw—an open-source agent powered by Mario Zechner's [pi](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) that gives AI models "hands" to operate computers—reached 100,000 GitHub stars in two months.

The pattern is consistent: **simplicity is winning**.

## The Uncomfortable Question

If Thomson Reuters—with decades of legal expertise, proprietary datasets, and billions in market cap—can be materially threatened by markdown files and a general-purpose AI, what does that mean for how we build software?

More specifically: what does it mean for those of us building platforms for data analysts, scientists, stewards, and business users? People who spend more time finding and understanding data than actually analysing it?

## The Old Model vs The New

The software industry we grew up with had a clear playbook:

**Years of development.** Engineering teams, product managers, QA, security reviews, compliance certifications.

**Hundreds of millions in investment.** Infrastructure, talent, go-to-market, customer success.

**Defensible moats.** Proprietary datasets, deep integrations, high switching costs.

**Recurring revenue.** Subscription fees that compound over time.

This model built Thomson Reuters, LexisNexis, Bloomberg, Salesforce—and justified their valuations.

The new model looks different:

**Weeks of development.** A domain expert and a markdown file. Maybe a lightweight CLI. Maybe a thin API wrapper.

**Minimal investment.** The model is someone else's. The infrastructure is someone else's. The distribution is someone else's.

**Questionable moats.** If your value is domain knowledge and the format is markdown, anyone with similar expertise can replicate it.

**Unclear monetisation.** The plugin is open source. The value accrues to the platform provider.

The market wasn't pricing in a technology change. It was pricing in a **business model change**. If 80% of the value can be delivered with markdown files and a general-purpose AI, what exactly are enterprises paying for?

## The Architecture Behind It

Understanding why this works requires understanding what a "skill" actually is.

A skill is a folder containing a markdown file. The file has YAML frontmatter (name, description, triggers) and content that tells the AI what it's good at and how to approach specific tasks. That's it. No code execution in the skill itself. No complex orchestration. Just structured text.

The key principle is **progressive disclosure**. Skills employ a three-stage loading system:

1. **Metadata (~100 tokens):** Name and description. Always loaded. The AI scans available skills to identify relevant matches.
2. **Full instructions (<5k tokens):** Loaded when the AI determines the skill applies.
3. **Bundled resources:** Scripts, documentation, templates. Loaded only as needed.

The result: 90% token reduction when skills are present but not used. You can include dozens of skills in a deployment, but only pay for the ones actually activated.

This is how the legal plugin can have deep expertise across contracts, NDAs, compliance, and briefings without bloating every interaction.

**No framework dependency.** Skills are text. No Pydantic, no LangGraph, no dependency hell.

**Model-agnostic.** The spec is open. Claude, GPT, Gemini, open-source models—all can consume the same skill definitions.

**Composable.** Skills combine naturally. A data catalogue skill + SQL skill + visualisation skill = an analyst workflow, without explicit orchestration.

**Maintainable.** Updating a skill means editing text. Review, version control, and deployment are trivial.

The common thread across Claude Code, OpenCode, and OpenClaw: *the complexity is in the model, not the harness*. Mario Zechner's [pi](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)—the agent at OpenClaw's core—proves this with radical minimalism: a system prompt under 1,000 tokens, four tools (read, write, edit, bash), no framework dependencies. It [benchmarks competitively](https://lucumr.pocoo.org/2026/1/31/pi/) against tools with ten times the scaffolding. The infrastructure stays thin. The value comes from what the AI can do, not from elaborate orchestration around it.

## Who This Matters For

I think about the people who use data platforms every day.

**Analysts** spend most of their time on discovery and preparation—finding tables, understanding columns, tracing why numbers don't match. One analytics leader noted that tracing a single data quality issue "often takes at least a couple of hours" before any actual analytical work can begin.

**Data Scientists** report that 57% say data cleaning and organisation is the least enjoyable part of their job. They spend more time consolidating data from disparate sources than building models.

**Data Stewards** are rarely in dedicated full-time roles. The work is continuous—data ecosystems constantly evolve. They're perpetually behind on documentation because documentation isn't their only job.

**Business Users**—only 21% feel confident working with data. The push for self-service analytics has a fundamental flaw: it requires users to become data experts, which takes sustained hands-on effort.

None of these personas are building production data pipelines.  They're all stuck at an earlier stage: discovery, understanding, and translation. The bottleneck isn't compute or tooling—it's the cognitive overhead of navigating complex data environments. 

*I deliberately don't focus on Data or Platform Engineering here (although the learnings can be applied there too).*

What users need from AI isn't complex. It's: *"What data do we have about X?"* and *"What does this column mean?"* and *"Help me write SQL for this question."*

All of this could be addressed by well-crafted skills. The domain knowledge exists—it's in catalogues, documentation, and the heads of experienced analysts. The challenge has always been making it accessible.

## The Counter-Arguments

The market signal may be overstated. There are reasonable objections.

**"This isn't production grade."** Fair concern. Markdown files and thin CLIs don't come with enterprise SLAs, compliance certifications, or support contracts. The legal plugin explicitly states it "does not provide legal advice."

Counter: Production grade means reliable, observable, maintainable. It doesn't necessarily mean complex. And the gap between "demo" and "production" is often smaller than engineering culture assumes.

**"Incumbents have proprietary data moats."** Thomson Reuters has decades of legal content no plugin can replicate.

Counter: True for legal. Less true for internal enterprise data, where organisations already own the catalogue, the schemas, the lineage. The domain knowledge that matters is often internal.

**"LLMs hallucinate."** Accurate. AI assistants make things up.

Counter: The plugin model is explicit about what it can and can't verify. Query results come from the database, not the model. The AI assists with discovery and formulation; the data is ground truth.

**"Security isn't solved."** OpenClaw's rapid adoption came with security concerns—broad permissions, malicious skills injecting malware, exposed instances leaking sensitive data.

Counter: Valid today. But security models do mature. If secure containers or certified deployments become available, this objection dissolves. The architecture doesn't preclude security—it just hasn't been fully hardened yet.

## Why Simplicity Makes Security Easier

Counter-intuitively, minimal agents are *easier* to secure than complex ones.

**Smaller attack surface.** Fewer components, fewer vulnerabilities.

**Auditable.** Skills are markdown. A security reviewer can read every instruction the agent receives. Try that with a LangGraph orchestration layer.

**Clear boundaries.** Scoped tools with explicit capabilities. The agent can query the catalogue—it cannot modify production tables.

**Dependency transparency.** Fewer dependencies means fewer supply chain risks.

The path to enterprise compliance isn't building a bigger system with more controls layered on top. It's building a smaller system where the controls are tractable.

The tooling is maturing fast. MicroVMs (Firecracker, Kata Containers) provide strong isolation. Google's Agent Sandbox—a new Kubernetes primitive built specifically for agent execution—delivers sub-second latency with pre-warmed pools. Eval frameworks (Promptfoo, LangSmith, Maxim AI) enable continuous testing of reasoning and action layers separately. CI/CD integration means skills can be validated and deployed through standard pipelines.

Minimal agents with scoped tools, governed integrations, and auditable skills can meet the same compliance bar as complex alternatives—often more easily.

## The Strategic Question

If the pattern holds—if simple architectures can deliver substantial value at radically lower cost and faster timelines—our default approach may be wrong.

We tend to assume that enterprise problems require enterprise engineering: complex frameworks, elaborate workflows, months of development.

The legal plugin went from concept to $285 billion market impact in days. Even accounting for market overreaction, the time-to-value is striking. Skills take days to write, hours to test, minutes to update. For internal tools—where you're not selling to external customers—a plugin doesn't need go-to-market, customer success, or sales cycles. It just needs to work for the people using it.

The cost structure is fundamentally different. A plugin could be built by a domain expert working with an AI assistant, not an engineering team with months of runway.

*Why not a plugin?* isn't really about plugins. It's about whether our instinct toward engineering complexity is serving our users—or just ourselves.

---

*What's your take? Are you seeing the same patterns in your domain? I'm curious whether this resonates—or if there are counter-examples I'm missing. Drop a comment or reach out directly.*
