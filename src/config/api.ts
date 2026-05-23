import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

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

// Interceptor de respuesta (Este sí puede quedarse aquí porque no depende de Clerk)
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