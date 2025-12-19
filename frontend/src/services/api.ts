import axios from 'axios';
import type { CotizacionRequest, CotizacionResponse, Local } from '../types';

// Usamos la variable de entorno o localhost por defecto
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const localService = {
  // Obtener todos con filtros opcionales
  getAll: async (params?: Record<string, string | number | boolean>) => {
    const { data } = await api.get<{ data: Local[], pages: number }>('/locales', { params });
    return data;
  },
  
  // Obtener uno por código
  getByCodigo: async (codigo: string) => {
    const { data } = await api.get<{ data: Local }>(`/locales/${codigo}`);
    return data.data;
  },
};

export const cotizacionService = {
  create: async (payload: CotizacionRequest) => {
    const { data } = await api.post<{ data: CotizacionResponse }>('/cotizaciones', payload);
    return data.data;
  }
};

export default api;