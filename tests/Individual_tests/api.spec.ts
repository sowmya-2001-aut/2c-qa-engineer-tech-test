import { test, expect } from '@playwright/test';
import { BOOKS_API, BOOK_BY_ID_API } from '../../src/API/endpoints';
import {
  getMinimalBookPayload,
  getFullBookPayload,
  getRetrievableBookPayload,
  missingTitlePayload,
  missingAuthorPayload,
  emptyPayload
} from '../../src/Data/apiData';


test.describe('POST API - creation test cases using API', () => {
  test('should create a book with only required fields', async ({ request }) => {
    const payload = getMinimalBookPayload();
    const response = await request.post(BOOKS_API, {
      data: payload,
    });
    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe(payload.title);
    expect(body.author).toBe(payload.author);
  });

  test('should create a book with all optional fields populated', async ({ request }) => {
    const payload = getFullBookPayload();
    const response = await request.post(BOOKS_API, { data: payload });
    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body.title).toBe(payload.title);
    expect(body.genre).toBe(payload.genre);
  });

  test('should return 400 when title is missing', async ({ request }) => {
    const response = await request.post(BOOKS_API, { data: missingTitlePayload });
    expect(response.status()).toBe(400);
  });

  test('should return 400 when author is missing', async ({ request }) => {
    const response = await request.post(BOOKS_API, { data: missingAuthorPayload });
    expect(response.status()).toBe(400);
  });

  test('should return 400 when body is empty', async ({ request }) => {
    const response = await request.post(BOOKS_API, { data: emptyPayload });
    expect(response.status()).toBe(400);
  });

  test('created book should be retrievable via GET', async ({ request }) => {
    const payload = getRetrievableBookPayload();
    const created = await (
      await request.post(BOOKS_API, { data: payload })
    ).json();

    const fetched = await (await request.get(BOOK_BY_ID_API(created.id))).json();
    expect(fetched.title).toBe(payload.title);
    expect(fetched.author).toBe(payload.author);
  });
});

test.describe('GET API - Data fetching test cases using API', () => {
  test('should return 200 and an array of books', async ({ request }) => {
    const response = await request.get(BOOKS_API);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('each book should have id, title, and author', async ({ request }) => {
    const books = await (await request.get(BOOKS_API)).json();
    for (const book of books) {
      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('author');
    }
  });

  test('books should include optional metadata fields', async ({ request }) => {
    const books = await (await request.get(BOOKS_API)).json();
    const first = books[0];
    const hasExtras = 'genre' in first || 'rating' in first || 'publishedYear' in first;
    expect(hasExtras).toBe(true);
  });
});

test.describe('GET API - Data fetching test cases using API with specific ID', () => {
  test('should return 200 and a full book object for a valid ID', async ({ request }) => {
    const response = await request.get(BOOK_BY_ID_API(1));
    expect(response.status()).toBe(200);
    const book = await response.json();
    expect(book).toMatchObject({
      id: 1,
      title: expect.any(String),
      author: expect.any(String),
    });
  });

  test('should include all documented fields in the response', async ({ request }) => {
    const book = await (await request.get(BOOK_BY_ID_API(1))).json();
    for (const field of ['id', 'title', 'author', 'genre', 'publishedYear', 'description', 'isbn', 'pages', 'rating']) {
      expect(book).toHaveProperty(field);
    }
  });

  test('should return 404 for a non-existent book ID', async ({ request }) => {
    const response = await request.get(BOOK_BY_ID_API(99999));
    expect(response.status()).toBe(404);
  });

  test('should return an error for an invalid (non-numeric) ID', async ({ request }) => {
    const response = await request.get(BOOK_BY_ID_API('abc'));
    expect([400, 404]).toContain(response.status());
  });
});



