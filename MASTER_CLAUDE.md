# MASTER_CLAUDE.md

# Global Agent Knowledge Library

# Restricted Reference Document

IMPORTANT: This file is a REFERENCE LIBRARY, not a default instruction
set.

## READ CONTROL PROTOCOL

1.  DO NOT read this entire file by default.
2.  Only read sections that are explicitly referenced inside the active
    project CLAUDE.md.
3.  If no section IDs are referenced, STOP and ask one clarifying
    question before proceeding.
4.  Never browse this file "just in case."
5.  Respect read budget limits defined in the project CLAUDE.md.

Failure to follow this protocol increases cost and reduces task
precision.

------------------------------------------------------------------------

## PURPOSE OF THIS DOCUMENT

This document exists to: - Store reusable expert techniques. -
Centralize cross-project patterns. - Preserve proven workflows and
frameworks. - Provide optional guidance when explicitly invoked.

It is NOT: - A mandatory checklist. - A full project instruction set. -
A substitute for project-specific CLAUDE.md files.

------------------------------------------------------------------------

# SECTION INDEX

Each section is modular and must only be accessed if referenced.

A1. Repository Setup Patterns\
A2. Debugging Workflow Framework\
A3. Code Navigation Strategy\
B1. Testing Discipline and Test-First Strategy\
B2. Linting and Formatting Standards\
C1. Risk Containment Strategy\
C2. Failure Analysis Framework\
C3. Ralph Wiggum Pattern (Exploratory Isolation Logic)\
D1. DOE Framework (Design of Experiments for Controlled Testing)\
E1. Performance Optimization Guardrails\
F1. Refactor Discipline Rules\
G1. Security and Configuration Protection Protocol

------------------------------------------------------------------------

# CORE PRINCIPLES (GLOBAL)

These principles apply universally unless explicitly overridden in a
project file:

1.  Prefer minimal changes over broad refactors.
2.  Never modify environment configuration unless explicitly instructed.
3.  Never delete tests to force success.
4.  Prioritize deterministic, testable outcomes.
5.  Avoid unnecessary repository-wide exploration.
6.  Stop after defined iteration limits.
7.  Respect Definition of Done from AGENT.BENCHMARK.md.

------------------------------------------------------------------------

# SECTION CONTENTS

## A1. Repository Setup Patterns

Use only if project requires non-standard setup. - Validate environment
before modifying code. - Run tests before changes. - Confirm dependency
versions.

## A2. Debugging Workflow Framework

Use only when addressing failing tests or bugs. - Reproduce failure. -
Isolate failing component. - Make minimal targeted change. - Re-run
tests. - Confirm no regressions.

## A3. Code Navigation Strategy

Use only when repository structure is unclear. - Identify entry
points. - Locate modified files via search. - Avoid reading unrelated
directories. - Focus on files implicated by tests.

## B1. Testing Discipline and Test-First Strategy

Use only when implementing fixes or features. - Write or update at least
one unit test validating behavior. - Ensure failure before fix. -
Confirm pass after fix. - Avoid testing implementation details unless
specified.

## B2. Linting and Formatting Standards

-   Run formatting commands if required.
-   Do not introduce new lint errors.
-   Do not change unrelated formatting.

## C1. Risk Containment Strategy

-   Limit scope of edits.
-   Avoid cascading architectural changes.
-   Confirm impacted modules.

## C2. Failure Analysis Framework

-   Identify observable behavior.
-   Compare expected vs actual.
-   Avoid speculative rewrites.

## C3. Ralph Wiggum Pattern

Exploratory isolation method: - Create smallest reproducible test. -
Validate assumption in isolation. - Do not alter unrelated systems
during exploration.

## D1. DOE Framework

Controlled change validation: - Change one variable at a time. - Measure
effect via tests. - Avoid multi-variable edits in a single iteration.

## E1. Performance Optimization Guardrails

-   Optimize only when required.
-   Validate performance impact with measurable evidence.
-   Avoid premature optimization.

## F1. Refactor Discipline Rules

-   Refactor only if necessary for correctness.
-   Maintain existing interfaces unless instructed.
-   Ensure all tests still pass.

## G1. Security and Configuration Protection Protocol

-   Never modify .env or secrets.
-   Never expose credentials.
-   Never alter CI/CD configuration without explicit instruction.

------------------------------------------------------------------------

END OF MASTER REFERENCE FILE
