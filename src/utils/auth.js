import { getCookie } from './cookies.js';

export function isAuthenticated() {
  return Boolean(getCookie('auth_token'));
}
