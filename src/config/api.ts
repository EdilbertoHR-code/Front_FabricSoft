import axios from 'axios';

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

// Instancia para rutas admin — incluye clave de autenticación
export const adminApi = axios.create({
  baseURL,
  headers: {
    ...headersConfig,
    'x-admin-key': import.meta.env.VITE_ADMIN_API_KEY ?? '',
  },
  timeout: 30000,
});