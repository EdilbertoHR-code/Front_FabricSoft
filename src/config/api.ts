import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const headersConfig: Record<string, string> = {
  'Content-Type': 'application/json',
};

if (baseURL.includes('ngrok')) {
  headersConfig['ngrok-skip-browser-warning'] = 'true';
}

export const api = axios.create({
  baseURL,
  headers: headersConfig,
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('⚠️ Sesión expirada o no autorizada');
    }
    console.error('🚨 Error en API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Hook para obtener una instancia de api con el Bearer token de Clerk inyectado.
// Úsalo en componentes: const authApi = useAuthApi();
export const useAuthApi = () => {
  const { getToken } = useAuth();

  const authApi = axios.create({
    baseURL,
    headers: headersConfig,
    timeout: 30000,
  });

  authApi.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  authApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn('⚠️ Sesión expirada o no autorizada');
      }
      console.error('🚨 Error en API:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return authApi;
};

