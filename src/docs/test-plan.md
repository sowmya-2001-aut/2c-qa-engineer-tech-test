# 📋 Test Plan – Book Library Application

## 🧾 Objective

The objective of this test plan is to validate the functionality, reliability, and data integrity of the Book Library application, focusing on core user workflows such as viewing books, accessing details, and adding new books.

---

## SCOPE

### In Scope:

* Book listing page
* Book detail view
* Add new book functionality
* API endpoints for book creation and retrieval

### Out of Scope:

* Performance testing (basic observations only)
* Security testing
* Accessibility testing

---

## Test Strategy

A **risk-based testing approach** is used to prioritize critical functionalities:

* Book creation (core feature)
* Data visibility in UI
* Data consistency between API and UI

---

## Test Types Covered

* Functional Testing
* API Testing
* UI Testing
* End-to-End Testing (API + UI)
* Exploratory Testing

---

## Test Scenarios

### Book Listing Page

* Verify all books are displayed on page load
* Verify each book card shows correct title and author
* Verify UI consistency across book cards
* Verify behavior when no books are present (if applicable)

---

###  Book Details Page

* Verify clicking “View Details” opens correct book
* Verify all book details are displayed correctly
* Verify navigation back to listing page

---

###  Add New Book

#### Positive Scenarios:

* Add book with required fields (title, author)
* Add book with all optional fields
* Verify newly added book appears in list

#### Negative Scenarios:

* Submit form with missing required fields
* Submit empty form
* Submit invalid data (e.g., long strings, special characters)

#### Edge Cases:

* Duplicate book entries
* Very long input values
* Rapid multiple submissions

---

###  API Testing

#### POST /books

* Create book with valid data
* Create book with optional fields
* Validate error for missing required fields
* Validate error for empty request body

#### GET /books

* Retrieve all books
* Validate response structure
* Validate presence of required fields

#### GET /books/{id}

* Retrieve book with valid ID
* Validate response schema
* Validate error for invalid/non-existent ID

---

### End-to-End Scenario (API + UI)

* Create a book via API
* Navigate to UI
* Verify the book is displayed in listing


---

## Test Data Strategy

* Dynamic test data is generated using helper utilities to avoid conflicts
* Ensures repeatability and independence of tests

---

## Risks & Assumptions

* Application does not require authentication
* Data persistence depends on backend implementation
* UI updates may have slight delay after API operations

---

## Exit Criteria

* All critical test scenarios executed
* No high-severity defects open
* Automation tests are stable and passing

---
