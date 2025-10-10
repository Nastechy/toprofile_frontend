import axios from 'axios';
import { getTokenTOLocalStorage } from './storage';

export let URL = 'https://toprofile-backend.vercel.app/api/v1';

// export let URL = "http://127.0.0.1:8000/api/v1";

const client = axios.create({
  baseURL: URL,
});

client.interceptors.request.use(
  async (config) => {
    if (token) {
      const token = getTokenTOLocalStorage();
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default client;
