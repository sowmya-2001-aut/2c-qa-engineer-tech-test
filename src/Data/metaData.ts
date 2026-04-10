import { generateRandomName } from '../util/helperUtil';

// --- BookDetail MetaData ---
export const VALID_BOOK_ID = 12;
export const UNKNOWN_BOOK_ID_NUM = 99999;
export const UNKNOWN_BOOK_ID_STR = 'abc';

// --- AddBook MetaData ---
export const MISSING_TITLE_INPUT = { author: 'Test Author' };
export const MISSING_AUTHOR_INPUT = { title: 'Test Title' };
export const LONG_TITLE_INPUT = { title: 'A'.repeat(500) };
export const SPECIAL_CHARS_INPUT = {
    title: "Special <Chars> & \"Quotes\"",
    author: "O'Brien & Co.",
    pages: '100'
};

export const getMinimalBookInput = () => ({
  title: generateRandomName('Minimal Book'),
  author: generateRandomName('Minimal Author'),
  pages: '100'
});

export const getFullBookInput = () => ({
  title: generateRandomName('Success Book'),
  author: generateRandomName('Author'),
  genre: 'Fiction',
  publishedYear: '2024',
  description: 'A full book entry created during testing.',
  isbn: '978-1234567890',
  pages: '320',
  rating: '4.5',
});

// --- Responsive MetaData ---
export const VIEWPORTS = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
];
export const SCROLL_MOBILE_VIEWPORT = { width: 375, height: 812 };
