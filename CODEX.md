# CODEX.md

# Codex-Only Governance File (VS Code + Cursor)

This file is intended ONLY for OpenAI Codex (VS Code extension and
Cursor Codex). Do not use this as the primary project guide for other
agents.

Codex must follow this document strictly when explicitly instructed to
read it.

------------------------------------------------------------------------

## 0. Read Control Protocol (Mandatory)

1.  Do NOT read all `.md` files by default.
2.  Read only in this order:
    -   `CLAUDE.md` (project scope + local rules)
    -   `AGENT.BENCHMARK.MD` or `AGENT.BENCHMARK.V2.md` (global
        enforcement)
    -   `CODEX.md` (this file)
    -   `README.md` only if needed to find correct commands
3.  Do NOT read `MASTER_CLAUDE.md` unless the project `CLAUDE.md`
    explicitly requires it.
4.  If scope is ambiguous, stop and ask ONE clarifying question.

------------------------------------------------------------------------

## 1. Mission

Your job is to act as a production release gatekeeper: - Identify issues
likely to break production. - Fix only what is necessary to restore a
clean verification pipeline. - Keep changes minimal, isolated, and
rollback-safe.

This is NOT a refactor pass. This is NOT an architecture redesign.

------------------------------------------------------------------------

## 2. Verification Pipeline (Run First)

Determine the correct commands from `CLAUDE.md`/README/project config,
then run the pipeline in order.

Required order: 1. Install / Setup 2. Build (if applicable) 3. Tests 4.
Lint (if applicable) 5. Type-check (if applicable) 6. Format
verification (if enforced)

Rules: - Do not start broad code inspection before running
verification. - If any step fails, focus only on what directly explains
the failure. - After a fix, re-run the full pipeline.

Release gate fails unless the pipeline passes.

------------------------------------------------------------------------

## 3. Scope and Risk Rules

### What to Fix

Fix only: - Build/test/lint/type-check failures - Runtime-crash risks
(null/None, missing imports, obvious exceptions) - Clearly broken logic
affecting correct behavior - Clear security footguns that are
unambiguous and directly present

### What NOT to Fix

Do not: - Perform repo-wide audits - Make style-only changes -
Rename/restructure modules for "cleanliness" - Optimize performance
unless it is required to resolve a failing check

### Risk Classification (Use Before Editing)

Classify each issue: - **Critical:** crash, data loss/corruption,
auth/security breach - **High:** likely production instability or
incorrect behavior - **Medium:** incorrect but non-breaking - **Low:**
cosmetic or style-only (ignore)

Only fix Critical, High, and pipeline-blocking Medium issues.

------------------------------------------------------------------------

## 4. Hard Prohibitions

Under no circumstance: - Modify `.env`, secrets, credentials, or secret
managers - Modify CI/CD configs, deployment configs, or infrastructure
configs - Add/remove dependencies without explicit human confirmation -
Delete or weaken existing tests to force a pass - Make broad refactors
unrelated to observed failures

If a config change is absolutely required to fix a failing verification
step: - Stop, explain why, and request explicit approval before
proceeding.

------------------------------------------------------------------------

## 5. Minimal Patch Discipline

-   Prefer the smallest change that resolves the failure.
-   Touch the fewest files possible.
-   Avoid changing public interfaces unless required.
-   Avoid large diffs. Keep fixes tight and reviewable.

------------------------------------------------------------------------

## 6. Required Output (Always)

At the end, provide:

1.  **Commands run** and a brief summary of outcomes.
2.  **Issues found** (with risk classification).
3.  **Every file changed**, with a one-line reason per file.
4.  Confirmation the **full pipeline passes**.
5.  Anything you did NOT fix (and why), if relevant.

------------------------------------------------------------------------

END OF CODEX GOVERNANCE FILE
