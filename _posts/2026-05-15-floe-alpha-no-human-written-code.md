---
title: "Floe Hits Alpha: Building a Data Platform Without Writing a Line of Code"
date: 2026-05-15 09:00:00 +1000
categories: [AI, Development]
tags: [floe, ai-development, data-platform, claude-code, codex, specwright, vsdd, alpha-release]
---

*[Floe](https://github.com/Obsidian-Owl/floe) just shipped its first alpha. I started it over the 2025 Christmas break. Every line of code was written by AI — I have not typed a single function. Here's what that took, what it cost, and what's still ahead.*

## The claim, up front

I have not written a line of Floe.

Not a function. Not a test. Not a YAML schema. Not a Helm chart. Not a CLI flag. I reviewed every PR. I shaped every architectural decision. I argued with the AI more times than I can count. But the keyboard work — the code, the tests, the docs, the schemas — was someone, *something*, else's job.

Today, Floe tags `v0.1.0-alpha.1`. The alpha compiles the documented Customer 360 demo end-to-end against a Kubernetes runtime, emits Dagster assets, dbt profiles, OpenLineage and OpenTelemetry evidence, and signed compiled artifacts, and enforces governance at compile time. There is a long road from here to production — I'll come back to that. But Floe is live, Apache-2.0 licensed at [github.com/Obsidian-Owl/floe](https://github.com/Obsidian-Owl/floe), with the [docs site](https://obsidian-owl.github.io/floe/) up and the codebase explorable interactively via [DeepWiki](https://deepwiki.com/Obsidian-Owl/floe).

This post has two purposes. The first is to mark the alpha release. The second is to tell the story honestly — including the parts where the AI broke things, the parts where I broke things, and the parts where I had to throw a week of work in the bin and start again.

## What Floe is, for people who don't run data platforms

If your day job has nothing to do with data engineering, this is the section for you. The architecture deep-dive that follows gets technical fast — feel free to skim it and pick the thread back up at *How it actually got built*. Here's the gist.

Most large organisations spend a lot on data and don't get the return they expected. Recent benchmarking puts the average annual data spend at around **$29.3 million** for a large enterprise, and **73% of those organisations say their data initiatives fall short of expectations**[^2]. The Modern Data Company's 2024 practitioner survey — 232 data professionals across 48 countries, averaging 15+ years experience — found **63% of practitioners spend more than 15–20% of their time on maintenance work**, **42% report integration efforts actively slowing them down**, and **38% call integrations the costliest part of maintaining data infrastructure**[^3]. Soda's 2024 data engineer survey reached a more pointed conclusion: the *majority* of data engineers spend more than half their time handling data issues rather than building anything new[^9].

That gap — between the money spent and the value delivered — is mostly the cost of *plumbing*. Tools that don't talk to each other. Credentials sprawled across half a dozen systems. Governance committees that meet to approve a pipeline that should have been one YAML file. Self-hosted dbt and Airflow eating $5,000–$26,000 a month in engineering time before any infrastructure spend[^4]. A platform team of five to ten engineers running $800k–$1.5m a year in fully loaded salaries[^4], propping up a stack of fifteen tools none of which were designed to live together.

Floe attacks that mess from a specific angle. It's not another tool to add to the pile. It's the *layer above the pile*. Platform teams pick the pieces of their stack — DuckDB or Snowflake for compute, Dagster or Airflow for orchestration, Polaris or Glue for catalog — and Floe stitches them together with compile-time guarantees. Data teams write a small `floe.yaml` file describing what their pipeline does. Floe compiles that against the platform's `manifest.yaml`, validates governance rules before anything deploys, and generates everything else — Dagster assets, dbt profiles, Kubernetes manifests, secret references, lineage emitters, the lot.

The promise on the README is the honest one: *if it compiles, it's compliant*. Governance stops being three meetings and becomes a CI check.

The business case writes itself. Faster delivery for data teams because they're not waiting two weeks on the platform team for a unicorn use case[^5]. Lower risk for platform teams because policies are enforced computationally, not in PowerPoint. A clear path toward Data Mesh — federated ownership with central guardrails — without having to invent the federation primitives yourself. And no vendor lock-in: every component is Apache 2.0 or replaceable behind a stable plugin contract.

That's the non-technical pitch. If you've ever sat in a "data platform strategy" workshop, you've heard variants of it. The difference this time is that the thing exists, it's running on Kubernetes, and one person built it in stolen hours.

## The architecture underneath

This is the section where the jargon arrives. If you build data platforms for a living, it's also the section I most want you to read carefully, rather than skim. The layer boundaries, the contracts between them, the two-tier config split, and where governance actually lands at compile time are the design choices that shaped everything else. I'd rather you push back on them than nod through them.

Floe is a framework for building internal data platforms — not the platform itself, the framework underneath one. Architecturally that means four enforcement layers and a two-tier config split.

The **four-layer model**, with Layer 1 at the base:

- **Layer 1 — FOUNDATION.** Framework code — schemas, validation engine, plugin ABCs. Owned by Floe maintainers. Distributed via PyPI and Helm.
- **Layer 2 — CONFIGURATION.** Immutable policies in `manifest.yaml`. Plugin selection, governance rules, naming patterns, coverage thresholds. Owned by platform engineers. Enforced at compile time.
- **Layer 3 — SERVICES.** Long-lived infrastructure (orchestrator, catalog, lineage service, telemetry). Owned by platform engineers. Deployed via Helm.
- **Layer 4 — DATA.** Ephemeral pipeline jobs owned by data engineers. Defined in `floe.yaml`. Inherits everything from the layers underneath.

The key principle is that **constraints flow from the lower layers outward into the upper ones, never the reverse**. A data engineer working in `floe.yaml` (Layer 4) cannot reach into `manifest.yaml` (Layer 2) and turn off the 80% test coverage requirement. The compiler refuses to emit artifacts that violate the platform's rules. That sounds rigid because it is — deliberately. The whole point is that the things that get bypassed in real organisations (governance, security, naming) are exactly the things you want enforced by a compiler, not by a Tuesday afternoon working group.

The **two-tier config** is the other half. Platform engineers write `manifest.yaml` — infrastructure, credentials, plugin choices, governance. Data engineers write `floe.yaml` — pipeline logic, transforms, schedules. Data engineers never see credentials. Platform engineers never have to read SQL. Both files compile together into a set of artifacts: Dagster assets, dbt profiles, OCI-signed bundles, Kubernetes manifests. Everything is checked into git. Everything is diffable. Nothing happens at runtime that wasn't decided at compile time.

The architecture defines **14 plugin categories** with **24 concrete packages** behind them. The alpha publishes **15**, and deliberately holds the rest back.

The validated core is the data plane — **Dagster** orchestrating **dbt-core** through **DuckDB** into **Polaris**-managed Iceberg tables on **MinIO**, with **Marquez** for lineage, **Jaeger** for telemetry, **dlt** for ingestion, and **Great Expectations** for quality. Two **AWS provider plugins** (S3, Glue) ship alongside, pending live-infrastructure validation.

Two plugins ship that I want to be loud about: **K8s RBAC** and **K8s network security**. The architecture is right; the testing isn't. They're in the release but they need significant further work, and I would not lean on them as the only line of defence in a production cluster.

The held-back set — Keycloak identity, both secrets backends, all four alert channels, Cube, dbt-fusion, dbt-quality, console telemetry — have implementations and unit tests but no composed runtime path proving they work together. Shipping everything that compiles is exactly the failure mode AI-assisted development encourages, and the contract stability matters more than the publish count: swapping Polaris for Glue, or Jaeger for Datadog, is a plugin away rather than a fork.

The technologies underneath are not novel — they're the right tools, picked deliberately. Apache Iceberg for storage. Apache Polaris for catalog. DuckDB for embedded compute. dbt for SQL transformation. Dagster for asset-centric orchestration. Cube for the semantic layer. OpenTelemetry and OpenLineage for observability and lineage. None of these are mine, and Floe stands very explicitly on the shoulders of those projects. What Floe adds is the *composition contract* between them — the schemas, the compile-time validator, the policy enforcer, the credential boundary, the four-layer enforcement, the plugin registry.

Is "framework" the right word? Partly. It's more accurate to call Floe a **platform compiler**. It takes declarative intent at two levels (platform and data product) and produces signed, validated, deployment-ready artifacts. It's spec-driven all the way down — and the spec is enforced before deployment, not after.

### Why this is hard

I've spent fifteen-plus years in engineering management, much of it building and running data platforms at scale. I've stood up Hadoop estates, modern lakehouse stacks, governed analytics environments, and I've watched the same pattern play out every time: the technology is the easy part; *the integration is the work*.

The 2024 DORA report makes the same point quantitatively. Internal developer platforms produce real gains — **8% increase in individual productivity, 10% increase in team performance** — but teams required to use the platform exclusively saw an **8% drop in change throughput and a 14% drop in change stability**[^6]. The platform helps when the boundaries are right. It hurts when they aren't.

If a fictional version of me had been asked, twelve months ago, to scope the design and build of something with Floe's surface area — four enforcement layers, fourteen plugin categories, compile-time governance, OCI artifact signing, full OpenTelemetry/OpenLineage emission, K8s-native deployment, multi-environment parity, RBAC across teams and namespaces, policy enforcement with strict/warn/off modes, contract lifecycle management, identity federation, secret refs, audit trails — I'd have given the following answer:

*Two to three squads. Twelve to eighteen months. Somewhere between **$4m and $8m** in fully loaded engineering cost. Probably another **$1m-$2m** in infra and tooling. A 100-page architecture pack before line one. And we'd ship a beta in eighteen months that did 60% of what was promised.*

That's not pessimism. That's the actual industry pattern. The Informatica 2024 report found pipeline development taking up to **12 weeks per pipeline**[^2]. Self-hosting dbt and Airflow costs more in engineering time than the infrastructure it runs on[^4]. **78% of teams report tool complexity as a top challenge**[^2]. **76% of enterprises report severe shortages in AI and data engineering talent**[^2]. The integration problem isn't a technology problem — it's a coordination problem at scale, and coordination at scale is expensive.

Which makes it worth asking how a single side project — about five months of elapsed time, with high-intensity bursts (less sleep, partner reasonably frustrated at how much I was looking at my laptop) and long stretches of low intensity (full-time job, two young kids, what passes for a life) — produced something that walks the alpha path.

The answer is two-part. The first part is the system above: a deliberate four-layer model, two-tier config, compile-time enforcement, and stable plugin contracts. None of which is free, but all of which is now designed. The second part is who — or *what* — did the actual building.

## How it actually got built

I started Floe over the Christmas break of 2025. The first version was a one-week prototype. The "architecture", such as it was, was a set of scripts: a `floe.yaml` schema, an early CLI, and a barely-functional compiler that emitted Dagster and dbt scaffolding. Nothing was composable. Everything was tightly coupled to everything else. The contracts between components were implicit, the modules leaked into each other, and the moment I tried to add a second compute target or swap the catalog, it became obvious the thing couldn't be evolved — only rewritten. It worked in the narrow sense that it compiled. It didn't work in any sense that mattered. I binned it.

Then I went deep.

Two things had happened in late 2025 that made the deeper attempt feel different. First, Anthropic had just released agent **Skills** as a standard — markdown files with progressive disclosure, the architecture pattern at the heart of the [Why Not a Plugin?](/posts/why-not-a-plugin/) thesis. Spec-driven development was still in full flight after Spec Kit's release. Opus 4.5 had just dropped. Codex was getting good in parallel. The substrate had improved.

Second, the vibe-coding discourse had finally crystallised into something testable. Steve Yegge's [Vibe Coding Manifesto](https://www.latent.space/p/steve-yegges-vibe-coding-manifesto) — the same Yegge whose Beads project I've leaned on in earlier posts — makes the argument that domain expertise still matters intensely, even as the syntax becomes someone else's problem. Around the same time, a [widely-shared retrospective on a year of vibe coding](https://medium.com/blog/after-a-year-of-vibe-coding-ai-still-cant-replace-effort-expertise-00c9aa44ee28) made the related point that effort and expertise are still the parts AI can't substitute for. The pattern the two pieces point at, when you put them together, is the obvious test: *pick a domain you know deeply, and try to build a software product end-to-end with AI doing the keyboard work.* Pick the domain where you can't be bluffed. Pick the domain where you'll see the AI's mistakes because the mistakes will be in things you understand.

Data platforms is that domain for me.

So Floe became the test. The constraint I set myself was strict: I would not write a line of code. Architecture, design, review, argument — all mine. Implementation — none of mine. Every commit would have an AI author.

The first six weeks were brutal.

I'd had eighteen months of experience with AI-assisted coding by this point — I described the state of it in my [last six months](/posts/last-six-months-in-ai-agentic-development/) post in December. I knew how to write specs. I knew how to use Spec Kit and Beads. I knew the value of a constitution file. I was not coming in cold.

And I still found agentic software engineering, for a project of Floe's scope, to be like taming a wild horse. Even with carefully written specs, with detailed plans, with constitutions encoding my standards, the LLMs would wander. They'd interpret a spec one way on Tuesday and another way on Thursday. They'd silently widen a scope. They'd write tests that passed because the implementation and the tests were written by the same agent, optimising for "done" rather than "correct" — the same problem I'd already identified and was building [Specwright](https://github.com/Obsidian-Owl/specwright) to solve. They'd "fix" a failing test by hardcoding security roles that gave the application full access to the underlying Polaris service. (Yes, that one really happened. Yes, I caught it. Yes, there are probably others I haven't yet.)

What I asked for very often was not what I got.

## Specwright, VSDD, and the wild horse that escaped

Specwright deserves — and has — its own [post](/posts/specwright-spec-driven-development-that-closes-the-loop/). I'll only touch on it here. Specwright is the Claude Code plugin I built in parallel with Floe to close the gap between *"tests pass"* and *"it actually works"*. It enforces seven stages — Init, Design, Plan, Build, Verify, Ship, Learn — with five quality gates (build, test quality, security, wiring, spec compliance) and a default-FAIL stance. Evidence has to prove PASS, not the other way around.

Specwright's lineage is **Verified Spec-Driven Development (VSDD)** — the fusion of Spec-Driven Development (SDD), Test-Driven Development (TDD), and Verification-Driven Development (VDD) into one workflow[^7]. The slogan from the original gist is the right one: *specs define what; tests enforce how; adversarial verification ensures nothing was missed*. The adversary's job is to find flaws. When the adversary is reduced to hallucinating flaws because the real ones are gone, you ship. Every artifact traces back through the chain: spec → verification property → tracked issue → test case → implementation → adversarial review.

Floe is the codebase Specwright was forged on. The two evolved together — Floe revealed gaps Specwright needed to close; Specwright shaped how Floe got built.

And then Specwright was archived.

This is the bit that earns its own post eventually. The short version: I was trying to overfit state management into a Skills plugin. Plugins are markdown and progressive disclosure — they're not great at holding stateful, long-running, multi-stage workflows with branching artifacts. I kept reaching for state and the Skills mental model kept pushing back. The wild horse broke free. There was no recovering that particular horse.

Specwright has now spawned a side project: a custom agent harness designed for stateful, verified, multi-stage engineering workflows. That's where the VSDD ideas are heading next. More on that another time.

The point for *this* post is that Floe was built within a system that did its best to close the AI's escape hatches. Where Specwright caught things, Floe stayed on the rails. Where Specwright couldn't catch things — state management, cross-session memory, long-running plans — Floe drifted, and I had to drag it back.

The numbers tell the story honestly. The [refreshed complexity audit](https://github.com/Obsidian-Owl/floe/blob/main/docs/analysis/complexity-analysis-2026-05-14.md), just merged[^1], shows the codebase has roughly *tripled* since January — and the proportional shape has held. **84.3% of functions still sit at low complexity**, down only 3.5 points despite 2.5× growth. The concern is the absolute count of trouble: twelve critical-complexity functions, up from one, concentrated in three files — the compiler, the OCI promotion controller, and the platform CLI. A focused week of refactoring would put the critical count back into single digits. Overall grade: GOOD (B). Maintainable. Not perfect, and the backlog is mine to clear.

## The honest accounting — what Floe is not

Floe is not finished.

I would not deploy this in production today. The alpha path validates a Customer 360 demo against a documented runtime. It does not yet validate large-scale production workloads against complicated topologies. The work that still has to happen is:

- **Load and performance testing.** The alpha runs on demo volumes. I have no honest data on how the compile pipeline, the Dagster runtime, or the Polaris catalog behave under realistic enterprise load.
- **Complicated end-to-end use cases.** The Customer 360 demo is deliberately bounded. Real platforms have eighty teams, two thousand pipelines, six environments, and edge cases that don't show up in a single demo.
- **Security hardening and testing.** I believe the architecture is secure by design — credential boundaries, layer separation, compile-time validation, signed OCI artifacts, no secrets in compiled output. But *believing* a thing and *proving* a thing under adversarial testing are different. The K8s RBAC and network-security plugins ship in the alpha and need significant work before I'd trust them at depth. The Keycloak identity plugin, both secrets backends, and the alert channels were deliberately held back from publish for exactly that reason. I caught the hardcoded-RBAC shortcut. There are others.
- **Provider interchangeability.** The alpha proves composition for the documented path. Full provider swap across all categories — Snowflake compute, Airflow orchestration, Atlan lineage, Datadog telemetry — is planned, not proven.

I'll get there. But these phases cost real money, and I still have a mortgage.

When I tally up the actual spend so far — across Floe, Specwright, Memory Cascade, FinancialFusion, and the other side projects — I'm somewhere between **$3,000 and $5,000** in total. That's distributed across:

- Anthropic and OpenAI subscriptions. I run Claude Code Max and Codex Max in parallel now — different angles, different strengths, different failure modes.
- GitHub Actions. The minutes have exploded. Several hundred PRs a week across projects means I had to move to GitHub Enterprise.
- A remote Kubernetes testing strategy running on **Hetzner**. A few hundred dollars a month — significantly cheaper than the equivalent on AWS, GCP, or Azure, and adequate for the realistic loads I'm hitting at this stage.
- Side subscriptions: security scanners, multiple PR bots (I like a lot of agents looking at the same change from different angles), code review services, and things I've forgotten about that are still hitting the credit card.

Three to five thousand dollars. For a system that, twelve months ago, I'd have scoped at the **low millions**.

You can see why SaaS organisations are getting nervous. You can see why the markets have been jumpy. The pattern I wrote about in *Why Not a Plugin?* — a $285 billion stock selloff triggered by Anthropic releasing markdown files into the legal domain — is not an outlier. It's the same pattern at a different scale. When the economics of producing a thing fall by three orders of magnitude, the businesses built on the old economics start to look fragile, and the markets reprice them.

I'm not predicting the death of SaaS. I'm certainly not saying every domain looks like data platforms. **AI excels at greenfield work in domains where the architect has deep expertise.** It struggles with established codebases the internet has never seen[^8]. Floe is greenfield. I have deep expertise. The conditions were favourable. Not every project gets those conditions.

But it's worth sitting with what just happened. A data platform that I would have estimated in years of squad-time and millions of dollars now exists in alpha, in a public repo, after a few months of evenings and stolen hours, for less than the cost of a second-hand car.

It's not magic. It's not free. It's not finished. It is, however, real, open source, and running on a Kubernetes cluster in front of me as I write this.

## What I've learned

The biggest shift, after this build, is in what's now expensive. Code is cheap. Specs are cheap. Tests are cheap. The expensive parts are the **judgement** to know what to build, the **architecture** to keep it coherent, the **review** to keep it honest, and the **discipline** to throw away a week's work when it's heading the wrong way. Yegge and the year-of-vibe-coding retrospective said it before me: pick a domain you know deeply, try to build something end-to-end with AI doing the keyboard work, and you'll learn more about where this technology genuinely earns its place than from any amount of reading. Floe was my version of that test. The skills that mattered fifteen years ago — engineering management, software architecture, picking the right boundary — matter more, not less, in a world where the cost of writing the wrong code has collapsed.

Floe will keep growing. The alpha is a milestone, not a destination — security hardening, load testing, real-world deployments, and finishing the runtime composition story for the planned categories are what come next. I'll keep writing about what breaks, what doesn't, and what costs more than I expected.

For now — the platform compiler runs, the artifacts validate, the alpha is tagged, and I still haven't written a line of it.

**Repository:** [github.com/Obsidian-Owl/floe](https://github.com/Obsidian-Owl/floe)
**Docs:** [obsidian-owl.github.io/floe](https://obsidian-owl.github.io/floe/)
**Interactive exploration:** [deepwiki.com/Obsidian-Owl/floe](https://deepwiki.com/Obsidian-Owl/floe)
**Issues, PRs, feedback:** very welcome, especially the harsh kind.

---

*If you've been running similar experiments — picking a domain you know and pushing AI to build it end-to-end — I'd like to hear what broke and what surprised you. Drop a comment, open an issue, or get in touch directly.*

*Daniel McCarthy is a Sydney-based Data & AI engineering leader with 15+ years in engineering management. He's currently building [Floe](https://github.com/Obsidian-Owl/floe), exploring AI-assisted development workflows, and trying to keep the credit-card statements in order. Find him on [GitHub](https://github.com/Obsidian-Owl) or [LinkedIn](https://www.linkedin.com/in/daniel-mccarthy-87458920/).*

[^1]: [Floe complexity analysis, 14 May 2026](https://github.com/Obsidian-Owl/floe/blob/main/docs/analysis/complexity-analysis-2026-05-14.md) — generated with radon 6.0.1 (cyclomatic + raw) plus AST-based nesting depth, scoped to `packages/` and `plugins/` (tests, `.venv`, and worktrees excluded). 366 production files, 55,415 SLOC. The full report breaks every critical and high-complexity function down to file and line, with refactor hints; the action plan ranks remediation P1/P2/P3.
[^2]: [The enterprise data infrastructure benchmark report 2026 — Fivetran](https://www.fivetran.com/blog/the-enterprise-data-infrastructure-benchmark-report-2026). Based on a 2025 survey of 500 senior data and technology leaders.
[^3]: [Resource Realities: How Maintenance and Misalignment Consume Data Teams' Time — Modern Data Company, December 2024](https://www.themoderndatacompany.com/blog/data-practitioner-perspectives-a-2024-research-insight-brief). 232 respondents across 48 countries, surveyed April–June 2024.
[^4]: [Build vs. Buy a Data Platform: The Real Cost of Self-Hosting dbt and Airflow — Datacoves](https://datacoves.com/post/build-vs-buy-analytics); [Platform Engineering Cost Calculator 2026](https://platformengineeringcost.com/).
[^5]: 64% of data professionals struggle to embed governance into their workflows ([Secoda data governance survey](https://www.secoda.co/blog/data-governance-survey)); 63% say leaders don't understand their pain ([Atlassian Developer Experience Report 2025](https://www.atlassian.com/blog/developer/developer-experience-report-2025)).
[^6]: [Accelerate State of DevOps Report 2024 — DORA](https://dora.dev/research/2024/dora-report/); summary at [Announcing the 2024 DORA report — Google Cloud](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report).
[^7]: [Verified Spec-Driven Development (VSDD) — original gist](https://gist.github.com/dollspace-gay/d8d3bc3ecf4188df049d7a4726bb2a00); related discussion on [Hacker News](https://news.ycombinator.com/item?id=47197595).
[^8]: A well-cited 2024 RCT found experienced developers predicted AI would make them 24% faster, felt 20% faster, and measured 19% slower on their own mature codebases — context I noted in [Last six months of AI-powered engineering](/posts/last-six-months-in-ai-agentic-development/).
[^9]: [Majority of Data Engineers Spending More Than Half Their Time Handling Data Issues, Soda Reveals — BigDATAwire, 2024](https://www.bigdatawire.com/this-just-in/majority-of-data-engineers-spending-more-than-half-their-time-handling-data-issues-soda-reveals/). Survey of ~100 data engineers and subject-matter experts.
