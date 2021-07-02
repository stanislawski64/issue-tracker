import { client } from './api-client';

const localStorageKey = 'issue-tracker-token';
const localStorageKeyUser = 'issue-tracker-user';

function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function getUser() {
  return JSON.parse(window.localStorage.getItem(localStorageKeyUser));
}

function handleUserResponse({ authToken, user }) {
  window.localStorage.setItem(localStorageKey, authToken);
  window.localStorage.setItem(localStorageKeyUser, JSON.stringify(user));
  return { authToken, user };
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
  window.localStorage.removeItem(localStorageKeyUser);
}

export {
  getToken,
  login,
  register,
  logout,
  localStorageKey,
  localStorageKeyUser,
  getUser,
};
