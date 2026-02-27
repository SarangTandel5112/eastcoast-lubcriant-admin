import axios from 'axios';
import { Env } from '@/libs/Env';
import { normalizeApiError } from './error-normalizer';

export const httpClient = axios.create({
  baseURL: Env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  response => response,
  (error: unknown) => {
    const normalized = normalizeApiError(error);

    if (typeof window !== 'undefined' && normalized.statusCode === 401 && window.location.pathname !== '/login') {
      window.location.assign('/login');
    }

    return Promise.reject(normalized);
  },
);
