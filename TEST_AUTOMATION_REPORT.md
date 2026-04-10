# End-to-End Test Automation Report

 This document outlines the test automation coverage, technical architecture, and execution guidelines for the Book Library project.

The goal of this assessment is to demonstrate QA engineering capabilities across:

* Test planning
* Exploratory testing
* UI automation
* API testing
* End-to-end validation

---

##  Approach & Strategy

###  Test Design

A risk-based approach was used to prioritize critical user flows:

* Book creation (core functionality)
* Book listing and visibility
* Book detail validation

Test scenarios include:

* Positive cases (valid inputs)
* Negative cases (missing/invalid data)
* Edge cases (data limits, duplicates)

---

###  Automation Strategy

Automation focuses on **high-value user journeys** rather than exhaustive coverage.

Key areas automated:

* Add new book flow
* View book details
* Book listing validation

The framework follows:

* Page Object Model (POM) for maintainability
* Reusable utility functions
* Clear separation of concerns

---

###  API Testing

API tests validate backend functionality independently of UI:

* POST /books → Create book (positive & negative cases)
* GET /books → Fetch all books
* GET /books/{id} → Fetch specific book

Validations include:

* Status codes
* Response schema
* Data integrity

---

### End-to-End Validation (API + UI)

An integration test is implemented to validate **data consistency across layers**:

Flow:

1. Create a book via API
2. Navigate to UI
3. Verify the book is displayed

This ensures:

* Backend data correctness
* UI reflects real-time data

---

##  Project Structure

```
/* Structure Followed: */
src
- pages        ----> page objects that stores locators and methods for each page
    - BasePage.ts
    - HomePage.ts
    - BookDetailPage.ts
    - AddBookPage.ts
-tests        ----> test files
    - Individual tests         ----> individual test files
        - AddBook.spec.ts
        - BookDetail.spec.ts
        - Home.spec.ts
        - Responsive.spec.ts
        - api.spec.ts
    - e2eFlow        ----> e2e flow test files
        - UserJourney.spec.ts
- data           ----> data files
    - apiData.ts
    - metaData.ts
- API            ----> API endpoints
    - endpoints.ts
- util           ----> utility functions
    - helperUtil.ts
- docs           ----> documentation
    - bug-report.md
    - test-plan.md
```

---

##  Setup Instructions

### 1. Install dependencies
```
npm install
```
### 2. Run the application
```
npm start
```
### 3. Run tests

```
npx playwright test
```
### Run specific browser (recommended)

```
npx playwright test --project=chromium
```
---

##  Cross-Browser Note

Tests are optimized for **Chromium**.
Minor inconsistencies may occur in WebKit/Firefox due to rendering/timing differences, which can be further stabilized.

---

##  Reporters Used

- **HTML Reporter**: Captured inside `playwright.config.ts`, generating interactive stack traces and DOM snapshots on failure states (`test-results/`).
- Playwright trace-viewer is also configured to capture on `on-first-retry`.

---

##  Bug Reporting

Exploratory testing was conducted, and identified issues are documented in:

```
/docs/bug-report.md
```

---

##  Test Plan

Detailed test scenarios and coverage are documented in:

```
/docs/test-plan.md
```

---

##  Key Design Decisions

* Focused on **critical business flows** rather than full coverage
* Used **dynamic test data** to avoid conflicts and ensure repeatability
* Implemented **API + UI integration test** to validate real-world behavior
* Followed **POM structure** for scalability and maintainability

---

##  Summary

This solution demonstrates:

* Strong QA fundamentals
* Clean automation design
* API and UI validation
* Real-world testing approach

---
