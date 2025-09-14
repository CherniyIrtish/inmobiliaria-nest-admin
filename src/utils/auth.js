export function setAccessToken(token) {
  if (token) localStorage.setItem('accessToken', token);
  else localStorage.removeItem('accessToken');
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function isAuthenticated() {
  return !!getAccessToken();
}
