# 🐞 Bug Report – Book Library Application

## 🧾 Summary

This document lists defects identified during exploratory testing of the Book Library application.

---

## Bug 1: Special character safety is not added for the book names
  – inputs like `<script>` or `"` in title/author fields should be sanitised. A lightweight test is included to confirm the app doesn't crash on these inputs.

**Steps to Reproduce:**

1. Click on “Add New Book”
2. Provide inputs like `<script>` or `"` in title/author fields
3. Click submit

**Expected Result:**
Validation error should be displayed, preventing submission

**Actual Result:**
Book is created successfully with given values

**Severity:** Low
**Priority:** Low

---

## Bug 2: Duplicate books are allowed

**Steps to Reproduce:**

1. Add a new book with specific title and author
2. Repeat the same submission

**Expected Result:**
System should prevent duplicate entries or warn user

**Actual Result:**
Duplicate books are added without validation

**Severity:** Medium
**Priority:** Medium

---

## Bug 3: Newly added book not visible immediately

**Steps to Reproduce:**

1. Add a new book
2. Return to listing page

**Expected Result:**
New book should appear immediately in list

**Actual Result:**
Book does not appear until page refresh

**Severity:** Medium
**Priority:** High

---

## Bug 4: Invalid ID handling in API

**Steps to Reproduce:**

1. Call GET /books/abc

**Expected Result:**
Proper error message with 400 status

**Actual Result:**
Inconsistent response (400/404 without clear message)

**Severity:** Low
**Priority:** Medium

---

## Bug 5: No input validation for long text

**Steps to Reproduce:**

1. Enter very long string in title field
2. Submit form

**Expected Result:**
Validation should restrict input length

**Actual Result:**
Form accepts extremely long input without restriction

**Severity:** Low
**Priority:** Low

---

## Issues Observed & Resolutions During QA Integration

 1. **In-memory state** 
  – books added during tests persist only for the duration of the server session. Tests that verify a newly added book appears on the home page use unique timestamped titles to avoid cross-test interference.

 2. **Parallel Run Next.js Race Conditions (Flakiness)**
   - *Issue*: When isolated specs were run individually, everything passed. When ran together, assertions failed with `visible=false`. Next.js API requests began queueing, exposing long React loading components which the test didn't account for. Test assertions using immediate `isHeadingVisible().toBe(true)` returned false logic instantly.
   - *Resolution*: Implemented lifecycle synchronization using resilient strict `await expect(page.locator).toBeHidden()` checks in `beforeEach` fixture blocks. Migrated strict boolean expectations over to auto-waiting web-first expressions (`await expect(locator).toBeVisible()`). Removed unreliable polling mechanisms.



## Observations

* Input validation is minimal
* Backend validation appears inconsistent
* UI does not always reflect backend updates instantly

---
