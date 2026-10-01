# Quality Workshop – Project Roadmap

## Project Goal

Quality Workshop is a hands-on quality engineering project for building
and demonstrating modern testing practices with Playwright and TypeScript.

The project will grow incrementally from UI automation into API testing,
CI/CD, cross-layer testing, failure analysis and controlled test
environments.

The goal is not to create the largest possible number of automated tests.
The focus is on building maintainable and reliable test automation,
understanding the engineering decisions behind it, and demonstrating
modern quality-engineering practices.

The repository itself will evolve as the project progresses. Features and
technologies should be implemented and understood before they are presented
as completed capabilities.

---

## Test Application Selection

The project deliberately uses different test applications for different
quality-engineering objectives rather than forcing all testing layers into
a single demonstration application.

### SauceDemo – UI Automation

SauceDemo is used primarily for browser-based UI automation.

Reasons for choosing it:

- It provides stable and understandable end-to-end user journeys.
- It includes authentication, product lists, sorting, cart operations,
  checkout and form validation.
- It provides test-friendly selectors that allow reliable Playwright
  locator strategies.
- It is widely used for automation practice, making the application itself
  easy to understand while keeping the focus on the test architecture and
  engineering approach.
- It is suitable for demonstrating Playwright execution in CI.

Limitations:

- SauceDemo is a demonstration application rather than a real production
  system.
- It is widely used in automation tutorials, so simply automating SauceDemo
  is not in itself a distinctive portfolio project.
- It does not provide the API capabilities required for the API and
  cross-layer testing goals of this project.

For this reason, SauceDemo is treated as a test target for demonstrating
UI automation engineering rather than as the centerpiece of the portfolio.

### Restful Booker – API and Cross-Layer Testing

Restful Booker is used primarily for REST API testing and later for
combining API and UI testing.

Reasons for choosing it:

- It provides a realistic CRUD lifecycle for booking data.
- It supports authentication.
- It allows GET, POST, PUT, PATCH and DELETE operations to be tested.
- Test data can be created, modified, verified and deleted.
- It supports scenarios where APIs can be used for test setup,
  verification and cleanup.
- Its web interface creates opportunities for combining API and UI testing
  in the same Playwright/TypeScript project.

Limitations:

- The public instance is an externally hosted demonstration environment.
- Availability and behavior of an external environment are outside the
  control of this project.
- External instability must not automatically be interpreted as a product
  or automation defect.
- Depending permanently on a public test environment would make the CI
  pipeline less deterministic.

For this reason, a later project phase will investigate running suitable
test applications in a controlled environment, for example using Docker.

### Engineering Decision

The applications were selected according to the testing problem being
solved:

SauceDemo
→ UI automation

Restful Booker
→ REST API automation

Restful Booker UI + API
→ cross-layer testing

Controlled environment
→ deterministic and reproducible CI testing

The purpose is not to demonstrate the demo applications themselves.
They are test targets used to demonstrate test architecture, automation
strategy, CI/CD, failure analysis and quality-engineering practices.

---

## Phase 1 – UI Automation

Test application: SauceDemo

The first phase establishes a professional Playwright and TypeScript
foundation.

Areas to develop:

- Navigation
- Authentication
- Positive and negative test scenarios
- Assertions
- Reliable locator strategies
- Product workflows
- Sorting
- Cart operations
- Checkout
- Form validation
- Page Objects
- Fixtures
- Test data management
- Test isolation
- Cross-browser testing
- Parallel execution
- Screenshots on failure
- Playwright tracing
- HTML reporting
- Retry strategy
- Flaky-test investigation

The project will begin with small and understandable tests before adding
framework abstractions.

Retries must not be used simply to hide unreliable tests. When instability
occurs, the cause should be investigated.

---

## Phase 2 – REST API Testing

Test application: Restful Booker

The second phase introduces API automation using the same Playwright and
TypeScript technology stack.

Areas to develop:

- Authentication
- GET requests
- POST requests
- PUT requests
- PATCH requests
- DELETE requests
- HTTP status-code validation
- Response-body validation
- Header validation
- Positive API scenarios
- Negative API scenarios
- Test data creation
- Test data cleanup
- API error handling

A typical automated lifecycle may be:

Authenticate
→ Create Booking
→ Read Booking
→ Update Booking
→ Verify Booking
→ Delete Booking
→ Verify Deletion

The objective is to test complete API behavior rather than demonstrating
isolated HTTP requests.

---

## Phase 3 – UI and API Integration

The third phase combines UI and API automation.

Example scenario:

API Setup
→ Create booking through API
→ Open application in browser
→ Verify booking through UI

Another scenario:

UI Action
→ Create or modify data through UI
→ Query API
→ Verify backend-visible state

Another scenario:

API Setup
→ UI Test
→ API Verification
→ API Cleanup

Using APIs for test setup and cleanup can make UI tests faster and more
focused while also providing verification across different system layers.

The objective is to demonstrate quality engineering across system
boundaries rather than treating browser and API automation as unrelated
activities.

---

## Phase 4 – CI/CD with GitHub Actions

Automated tests should not depend on the developer's local computer.

GitHub Actions will be used to execute the test suite in a clean CI
environment.

The pipeline will progressively include:

Repository checkout
→ Node.js setup
→ Dependency installation
→ Playwright browser installation
→ Test execution
→ Test reporting
→ Artifact collection

Tests should run automatically for appropriate Git events such as pushes
and pull requests.

Failure artifacts may include:

- Playwright HTML reports
- Screenshots
- Traces
- Relevant logs

An important part of this phase is learning to diagnose failures.

A failed CI test should be investigated to determine whether the cause is:

- a product defect
- an automation defect
- a test-data problem
- an environment problem
- a network or external-service problem
- a flaky test

The objective is not merely to obtain a green pipeline, but to understand
why the pipeline is green or red.

---

## Phase 5 – Controlled Test Environment

Public demonstration applications introduce dependencies that are outside
the control of the test project.

A later phase will therefore investigate running suitable test applications
inside a controlled environment.

Possible technologies include:

- Docker
- Containers
- Reproducible test environments
- Automated environment startup
- CI integration

Where practical, the CI process could start the required application,
execute the automated tests against it and then dispose of the environment.

This reduces dependence on public infrastructure and improves
reproducibility.

---

## Project Outcome

As the project develops, Quality Workshop should demonstrate practical
experience with:

- Playwright
- TypeScript
- UI automation
- REST API automation
- UI/API integration
- Test architecture
- Page Objects
- Fixtures
- Test data management
- Test isolation
- GitHub Actions
- CI/CD
- Reporting
- Tracing
- Failure diagnostics
- Flaky-test engineering
- Cross-browser testing
- Controlled test environments
- AI-assisted quality engineering

These capabilities should be demonstrated through working code and
documented engineering decisions rather than simply listed as technologies.

---

## Future Enterprise Scenario

SauceDemo and Restful Booker are intentionally simple demonstration
applications.

A later extension of Quality Workshop may introduce a fictional enterprise
workflow inspired by common procurement and ERP concepts.

For example:

Supplier
→ Tender
→ Bid
→ Evaluation
→ Award
→ Contract

This would provide a more complex environment for demonstrating areas such
as:

- business-rule testing
- workflow testing
- role-based behavior
- state transitions
- data validation
- UI/API interaction
- test-data design
- regression strategy

The scenario must remain completely independent from any real employer.

No proprietary code, internal URLs, credentials, production or test data,
documents, database content or other confidential information from a real
organization will be used.

---

## Engineering Principles

### Build incrementally

Start with simple tests and introduce architecture when there is a real
reason for it.

### Understand before abstracting

Code should be understood before it is hidden behind helpers, fixtures,
Page Objects or framework abstractions.

### Reliability over test count

A small reliable test suite is more valuable than a large unreliable one.

### Investigate failures

Retries should not be used to conceal instability. Failures should be
diagnosed and classified.

### Keep tests isolated

Tests should avoid unnecessary dependencies on the execution order or
state created by other tests.

### Keep tests reproducible

Where possible, test data and environments should be controllable and
repeatable.

### Document engineering decisions

Important architectural and testing decisions should explain both the
chosen approach and its trade-offs.

### Use AI responsibly

AI may assist with test design, implementation, refactoring, debugging and
analysis.

AI-generated code should not be accepted blindly.

The engineer should be able to explain:

- what the code does
- why the approach was selected
- how it can be modified
- how it can fail
- how to debug it

AI is used as an engineering accelerator, not as a substitute for
understanding the system or the automation code.