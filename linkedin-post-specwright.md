# LinkedIn Post — Specwright Launch

---

**Post:**

I've been building software with AI agents for eighteen months. The speed gains are real. But something kept bothering me: tests pass, CI is green, and three days later you find a feature that's half-wired — exports nobody imports, handlers never called, spec criteria silently skipped.

The AI optimises for "done." Not "correct."

I tried existing tools. Spec Kit is excellent for planning but light on verification. Oh-My-ClaudeCode is configurable but more hands-off than I like. None of them focused on the git ops and quality controls I needed. I ended up with skills and rules scattered across projects — nothing consistent, nothing improving.

So I built Specwright.

It's a Claude Code plugin that enforces spec-driven development with quality gates. The workflow: design (with an adversarial critic), plan (with testable acceptance criteria), build (with adversarial TDD — separate agents writing tests vs implementation), verify (five quality gates including wiring checks and spec compliance), and ship (PRs with evidence mapped to every requirement).

The key idea: every gate defaults to FAIL. Evidence must prove PASS. Not the other way around.

After months of running this across multiple projects — Go, TypeScript, Python — the difference isn't speed. It's consistency. I don't find orphaned code in PRs anymore. I don't discover features that compile but are never connected. The AI has to prove things work, not just claim they do.

Today I'm open-sourcing it.

If you're using AI for development and you've felt the gap between "tests pass" and "it actually works" — give it a try. MIT licensed.

GitHub: https://github.com/Obsidian-Owl/specwright
Deep dive: https://obsidian-owl.github.io/engineering-blog/posts/specwright-spec-driven-development-that-closes-the-loop/

Feedback welcome. The whole point is that quality improves through evidence.

#AIEngineering #ClaudeCode #DeveloperTools #OpenSource #SoftwareQuality #TDD #SpecDrivenDevelopment

---

**Notes:**
- Keep the post as-is for the text — LinkedIn truncates after ~3 lines so the hook ("tests pass, CI is green, and three days later...") needs to land immediately
- Consider adding an image/diagram of the workflow stages (init → design → plan → build → verify → ship → learn) as the post image
- Best posting times for dev/tech audience: Tuesday–Thursday, 8–10am local time
- Tag relevant connections who might amplify (colleagues, Claude Code community members)
