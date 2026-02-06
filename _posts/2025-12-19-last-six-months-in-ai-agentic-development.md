---
title: "Last six Months of AI-Powered Engineering: What I've Learned"
date: 2025-12-19 12:00:00 +1100
categories: [AI, Development]
tags: [claude-code, ai-development, spec-kit, beads, floe-runtime, engineering-workflows]
---

I built [floe-runtime](https://github.com/Obsidian-Owl/floe-runtime) in two weeks.

If you'd told me that a year ago, I'd have laughed. floe-runtime is an open-source data platform — think of it as a way to define your entire data platform in a single `platform.yaml`, your pipeline in a 'floe.yaml' file and have the system handle all the infrastructure (Kubernetes), orchestration (Dagster), transformations (dbt), storage (Apache Iceberg), catalog management (Polaris), semantic layer (Cube), and observability (OpenTelemetry + OpenLineage). It's not a trivial thing. It's the kind of project I'd have scoped at 3-6 months with a team of skilled engineers.

Instead, I built it as a side project. With two kids (3 and 6), a full-time executive role that's been in "crazy mode," and minimal time to actually watch what Claude Code was writing — which matters to me, because I like to see every line of code it produces.

Two weeks. And yes, there are still 101 security concerns, rough edges, and work to do to get it stable (error handling isn't great, and who knows when it comes to performance and real world load). But the fact that it exists at all tells you something important about where we are right now.

This post is my attempt to make sense of what's changed in AI-powered engineering over the last six months. Not a comprehensive survey — more like notes from the field, backed by what I experienced building floe-runtime and what I've been learning at work and home.

## The LLMs got genuinely good at code

I'll be upfront: I've been using Claude almost exclusively, and I'm a bit of a fanboy. But let me try to be rational about this.

The jump in coding capability across *all* the major models this year has been remarkable. Claude's SWE-bench scores went from the low 70s to over 80% in about six months. But Google's Gemini models have been doing genuinely impressive things too — their code assistance and long-context capabilities are excellent, and they're iterating fast. And you can never count out OpenAI; they have resources, talent, and a habit of surprising people.

What's actually changed isn't just "the models are smarter." It's that they've become genuinely *agentic* at the file system level. A year ago, AI code assistance meant autocomplete and maybe generating a function. Now? Claude can operate autonomously for hours, reading files, running tests, fixing errors, committing code. It monitors its own output and self-corrects. That's a qualitative shift, not just a quantitative one.

The extended thinking capabilities matter more than I initially appreciated. When I give Claude a complex architectural problem and let it think through the implications (thanks planning mode!), the output quality is dramatically better than quick responses. There's a real trade-off between speed and depth that mirrors how humans work.

Tool calling has become reliable enough to build real workflows around. Early function calling was brittle — you'd get hallucinated parameters, incorrect invocations, loops that never terminated. Now it mostly just works. That "mostly" is doing a lot of work in that sentence, but it's enough to be genuinely useful rather than merely interesting.

## Codifying good engineering practice

Here's what actually excites me, and it's not the raw model capability.

I'm an engineering manager who loves DevSecOps. Great engineering practices: CI/CD, repeatable reliable processes, shift left, automate everything, version control, build in quality, do the hardest parts first, everyone is responsible, "done" means released. This stuff matters because it's how you build software that doesn't fall over at 3am.

The last twelve months have been about codifying these practices into AI workflows. And for me, the breakthrough came from combining two tools that might seem good alone but are actually ground breaking when combined: [GitHub's Spec Kit](https://github.com/github/spec-kit) and [Steve Yegge's Beads](https://github.com/steveyegge/beads).

I now use them via [SpecBeads](https://github.com/LastManStandingV2/SpecBeads), a thin (amazingly awesome) wrapper that connects them[^1]. But let me explain why they matter.

**Spec Kit** introduced "spec-driven development" — the idea that you should Specify → Plan → Tasks → Implement, with each phase generating artifacts that build on the previous ones. This sounds like basic project management, and it is. But the magic is in the `constitution.md` file.

The constitution captures your non-negotiable project principles. Your preferred architecture. Your API patterns. Your testing philosophy. Your coding standards. When an AI agent generates specs, plans, or implementations, it references this constitution. It's governance, not just documentation.

Why does this matter? Because without explicit constraints, AI models optimise for the shortest path to a passing result. They'll use `eval()` instead of safer alternatives. They'll skip validation. They'll introduce subtle logic errors. They're not malicious; they're just completing the task you gave them as efficiently as possible.

The constitution is how you encode "the way we do things here" into the AI workflow. It's how you capture the tacit knowledge that senior engineers carry around in their heads. And it turns out AI is actually pretty good at following rules — you just have to give it rules worth following.

And - this may pick at some old wounds - but I find the AI listens a lot more to understand what 'good' means (and executes to explict commands) than some humans I've worked with!!

**Beads** solves a different problem: AI agents have no memory between sessions.

Steve Yegge built Beads after "vibe coding like a madman for forty days and forty nights," and it shows. The core insight is that markdown plans don't work for AI agents. They're not queryable, agents rarely update them, and reconstructing a work graph from scattered documents burns context on every interaction. As Yegge puts it: "If you've got competing documents, obsolete documents, conflicting documents, ambiguous documents — they get dementia."

This was one of my main pain points if I look back 6 months ago. And Yegge's has done awesome things to patch it up.

Beads stores issues as JSONL, versioned with Git. It tracks dependencies (blocks, related, parent-child, discovered-from). It can tell you what's ready to work on without human intervention. And critically, it maintains context across sessions — so when you pick up tomorrow where you left off today, the agent actually knows what "where you left off" means.

The "discovered-from" dependency type is particularly clever for AI workflows. When an agent finds new work while implementing a task, it creates child issues that automatically inherit context and maintain traceability. No more losing track of scope.

And they are working on Linear & Jira integrations. Full Enterprise-ready audit trail and traceability. You can start to see where this is going...

## The workflow that actually works

Here's what my floe-runtime development cycle looked like:

1. **Specify** — Use Spec Kit to write a clear specification for a feature. The constitution ensures architectural consistency.
2. **Plan** — Generate an implementation plan that respects the spec and constitution.
3. **Tasks** — Break the plan into discrete, dependency-managed tasks that feed into Beads.
4. **Implement with Beads** — Let Claude Code work through the ready tasks, with Beads tracking progress and discovered work.
5. **Review** — This is the part that doesn't scale automatically. More on that shortly.

The key insight is that this isn't one-shot code generation. It's iterative refinement with explicit checkpoints. Each phase produces artifacts that constrain and guide the next phase. The AI isn't freestyling; it's working within a structure that encodes good practice.

This maps directly to how the best human teams work: PRDs reviewed before implementation, architectural decisions documented before coding, acceptance criteria defined before development. The difference is that AI agents can now enforce these practices automatically — catching misalignments before they become implementation problems.

## What AI still can't do (yet)

I want to be clear about the limitations, because I think overselling AI capabilities does everyone a disservice.

The security picture is genuinely concerning. Studies suggest that somewhere around 40-60% of AI-generated code contains vulnerabilities or design flaws. The models optimise for functionality, not security. They'll skip input validation, use insecure defaults, introduce injection vulnerabilities. This isn't theoretical — I've caught all of these in my own projects.

For floe-runtime, this means I need to treat every AI-generated component as untrusted until reviewed. The "101 security concerns" I mentioned aren't hypothetical; they're the result of honest assessment of code I haven't had time to properly audit.

I caught an amazing one recently - the AI hardcoded security roles that gave full access for the application to access the underlying Polaris services. This was a quick shortcut to get around test failures. And there will be many more I missed and need to clean up as I work over it with a fine-toothed comb...

This is a productivity paradox that's worth understanding. One study found that experienced developers predicted AI would make them 24% faster and *felt* 20% faster — but actually measured 19% slower on their own mature codebases. AI excels at greenfield work and familiar domains. It struggles with the deep contextual understanding that comes from years of working in a particular codebase (that the internet has never seen).

The review bottleneck is real. Teams with high AI adoption are completing more tasks and merging more PRs — but review times have ballooned. AI lets you throw code over the wall faster, but the walls still exist. Someone needs to validate that the code is correct, secure, maintainable, and actually solves the right problem.

This is where "I like to see every line of code it writes" comes from. It's not distrust exactly — it's that the review function hasn't been automated, and until it is, human attention remains the bottleneck.

## The changing role of engineering leadership

I've been an engineering manager and leader for over 15 years. The job is changing.

The shift is from creation to curation. From teams writing code to teams focused on design (software architecture specifically - not solution or enterprise architecture) validating that AI-generated code is correct, secure, and aligned with architectural intent. From designing systems to designing the constraints that AI operates within.

The constitution concept is central to this. As a leader, my job is increasingly to capture institutional knowledge in forms that AI can use. What are our principles? What patterns do we follow? What mistakes have we made before that we don't want to repeat? These have always been important; the difference is that now they can be operationalised rather than just documented.

I'm also finding that the skills that matter are shifting. Prompt / Context engineering is genuinely important. Understanding how to decompose problems into AI-tractable chunks. Knowing when to use AI and when human judgment is essential. Building review processes that can scale with increased generation capacity.

The junior/senior dynamic is also changing in interesting ways. AI can make junior developers dramatically more productive at generating code — but it doesn't give them the judgment to know whether that code is good. Senior engineers end up spending more time reviewing AI-assisted output. There's a risk of drowning in low-quality volume.

## Why this matters for side projects

For personal projects, proof-of-concepts, and rapid prototyping, we're in a genuinely new era.

floe-runtime would not exist without AI assistance. Not because I couldn't build it — but because I don't have 3-6 months of focused time, and a team, to dedicate to a side project. I have evenings, occasional weekends, and stolen hours. AI collapses the timeline for greenfield work dramatically.

The sweet spot is projects with clear specifications in domains where you have enough expertise to review the output. I know data engineering. I know orchestration, transformation, storage patterns. I can look at generated code and tell whether it's reasonable[^2]. The AI handles the boilerplate, the repetitive patterns, the syntax; I handle the architecture and the judgment calls.

This is genuinely democratising in some ways. Ideas that would have died in my "someday maybe" list are now actually buildable. The friction between "I have an idea" and "I have a working prototype" has dropped dramatically.

But it requires honesty about limitations. floe-runtime exists, but it's not production-ready. It needs security review, performance testing, edge case handling. AI got me to a working prototype faster than I ever could have alone. Getting from prototype to production still requires human judgment, time, and care.

## Where I think we're heading

I don't have a crystal ball, and anyone who claims to know where AI development is heading in 2-3 years is either lying or deluded. The pace of change is genuinely unpredictable.

But some things seem likely:

The spec-driven approach will become standard. "Vibe coding" — just telling an AI what you want and accepting whatever it produces — works for basic, static websites. Add any level of complexity with infrastructure, multiple service domains, complex interfaces, and you can't vibe your way out the mess the AI will create. It just heads off and never has a North Star. The industry is learning this, and tools like Spec Kit represent where we're heading.

Memory and context management will improve. Beads is a clever hack around model limitations, but eventually this will be built into the tools themselves. Or the models. Agents or LLMs that genuinely remember and learn from previous sessions will be more capable than today's stateless interactions.

Security will remain a problem until it's explicitly solved. Models trained to generate functional code don't automatically generate secure code. This requires either specialised training, explicit security-focused tooling, or (most likely) both.

The review bottleneck will drive tooling innovation. We need AI that can review AI-generated code. We need better static analysis, better test generation, better ways to validate architectural compliance. The tools that solve this will be enormously valuable.

And the role of senior engineers will become more important, not less. Someone needs to set the constraints, encode practices, validate the output, and make the judgment calls that AI can't make. That's not disappearing; if anything, it's becoming more critical.

## Closing thoughts

Six months ago, I couldn't have built an MVP of floe-runtime in two weeks. Today I can — with caveats, with rough edges, with work still to do.

The tools that made this possible aren't magic. They're the combination of genuinely capable models, structured workflows that encode good practice, and memory systems that maintain context across sessions. Each piece reinforces the others.

I'm excited about where this is going. But I'm also trying to stay humble about what I don't know. The world is changing fast, and having too much confidence in any particular prediction feels like arrogance.

What I do know: the ability to codify good engineering practice into AI workflows — to capture "how we do things here" in forms that AI can follow — is a skill worth developing. The tools exist. The practices are emerging. The question is whether we'll use them well.

I'll keep experimenting. I'll keep watching every line of code. And I'll keep sharing what I learn.

And there's a massive amount of work ahead. The MVP proved the concept works, but the architecture needs to be torn down and rebuilt with proper modularity in mind. That's not a failure — it's the exciting next phase of learning what this thing can actually become.

[^1]: Big shoutout to Paul Mortimer at CBA for sharing SpecBeads with me!
[^2]: Although I'd love to have some of the amazing engineers I've worked with in the past help to rip it apart and turn it into something awesome!

---

*Daniel McCarthy is a Data & AI engineering leader based in Sydney. He's currently building [floe-runtime](https://github.com/Obsidian-Owl/floe-runtime) and exploring AI-assisted development workflows. Find him on [GitHub](https://github.com/Obsidian-Owl) or [LinkedIn](https://www.linkedin.com/in/daniel-mccarthy-87458920/).*