import { handleResponse, handleError } from './apiUtils';

export function getAuthors() {
  return fetch('http://localhost:3001/authors')
    .then(handleResponse)
    .catch(handleError);
}
