import axios from 'axios';

const isDev = import.meta.env.DEV;
const baseURL = isDev ? '/api' : import.meta.env.VITE_API_URL;

export const http = axios.create({
  baseURL,
  withCredentials: true,
});

http.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const status = error.response?.status;
    const payload = error.response?.data;
    const message = (typeof payload === 'string' && payload) || payload?.message || error.message || 'Request failed';

    return Promise.reject(new Error(`${message}`));
  }
);
