import { generateRandomName } from '../util/helperUtil';

export const getE2EBookPayload = () => ({
  title: generateRandomName('E2E Book'),
  author: generateRandomName('E2E Author')
});

export const getMinimalBookPayload = () => ({
  title: generateRandomName('API Book'),
  author: generateRandomName('API Author')
});

export const getFullBookPayload = () => ({
  title: generateRandomName('Full API Book'),
  author: generateRandomName('Full Author'),
  genre: 'Non-Fiction',
  publishedYear: 2023,
  description: 'Created via API test',
  isbn: '978-0000000001',
  pages: 400,
  rating: 4.8,
});

export const getRetrievableBookPayload = () => ({
  title: generateRandomName('Retrievable Book'),
  author: 'Retrieve Author'
});

export const missingTitlePayload = { author: 'Only Author' };
export const missingAuthorPayload = { title: 'Only Title' };
export const emptyPayload = {};