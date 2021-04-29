import { client } from './api-client';

const localStorageKey = 'issue-tracker-token';

function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse({ authToken }) {
  window.localStorage.setItem(localStorageKey, authToken);
  return authToken;
}

function login({ username: name, password }) {
  return client('authenticate', { data: { name, password } }).then(
    handleUserResponse,
  );
}

function register({ email, username: name, password }) {
  return client('users/new', {
    data: { name, password, email },
  });
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export { getToken, login, register, logout, localStorageKey };
