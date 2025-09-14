import axios from 'axios';

const isDev = import.meta.env.DEV;
const baseURL = isDev ? '/api' : import.meta.env.VITE_API_URL;

let accessToken = localStorage.getItem('accessToken') || null;

export function setAccessToken(token) {
  accessToken = token;

  if (token) localStorage.setItem('accessToken', token);
  else localStorage.removeItem('accessToken');
}

export function getAccessToken() {
  return accessToken;
}

export const http = axios.create({ baseURL, withCredentials: false });

http.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const status = error.response?.status;
    const payload = error.response?.data;
    const message = (typeof payload === 'string' && payload) || payload?.message || error.message || 'Request failed';

    return Promise.reject(new Error(message));
  }
);
