export interface Local {
  _id: string;
  codigo: string;
  pabellon: string;
  area_m2: number;
  precio_mensual: number;
  status: 'disponible' | 'ocupado' | 'mantenimiento';
  ubicacion: {
    lat: number;
    lng: number;
  };
  caracteristicas: {
    instalacion_electrica: string;
    carga_maxima_kg: number;
    altura_m: number;
  };
}

export interface CotizacionRequest {
  prospecto_email: string;
  local_codigo: string;
  duracion_meses: number;
  notas?: string;
}

export interface CotizacionResponse {
  _id: string;
  subtotal: number;
  iva: number;
  total: number;
  fecha_creacion: string;
}