import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { localService } from '../services/api';
import type { Local } from '../types';

const LocalDetail = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const navigate = useNavigate();
  
  const [local, setLocal] = useState<Local | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocal = async () => {
      if (!codigo) return;
      
      try {
        setLoading(true);

        const data = await localService.getByCodigo(codigo);
        setLocal(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la información del local. Verifica el código.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocal();
  }, [codigo]);

  // Helper para formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      disponible: 'bg-green-100 text-green-800 border-green-200',
      ocupado: 'bg-red-100 text-red-800 border-red-200',
      mantenimiento: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !local) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-xl text-red-600 font-semibold">{error || 'Local no encontrado'}</h2>
        <Link to="/" className="text-blue-600 hover:underline">Volver al listado</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
      >
        <span className="mr-2">←</span> Volver
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        
        {/* Header: Código y Status */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Local {local.codigo}</h1>
            <p className="text-gray-500 mt-1">Pabellón: <span className="font-medium text-gray-700">{local.pabellon}</span></p>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide border ${getStatusColor(local.status)}`}>
            {local.status}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          
          {/* Columna 1: Precio y Área */}
          <div className="p-6 space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold">Precio Mensual</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{formatCurrency(local.precio_mensual)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold">Área Total</p>
              <p className="text-xl font-medium text-gray-800 mt-1">{local.area_m2} m²</p>
            </div>
          </div>

          {/* Columna 2: Características Técnicas */}
          <div className="p-6 space-y-4 md:col-span-2 bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Características Técnicas</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Altura</p>
                <p className="font-medium text-gray-700">{local.caracteristicas.altura_m} metros</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Carga Máxima</p>
                <p className="font-medium text-gray-700">{local.caracteristicas.carga_maxima_kg} kg/m²</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg col-span-1 sm:col-span-2">
                <p className="text-xs text-gray-500">Instalación Eléctrica</p>
                <p className="font-medium text-gray-700">{local.caracteristicas.instalacion_electrica}</p>
              </div>
            </div>
            
            {/* Ubicación (Coordenadas simples) */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Ubicación GPS:</span> {local.ubicacion.lat}, {local.ubicacion.lng}
              </p>
            </div>
          </div>
        </div>

        {/* Footer: Acciones */}
        <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          {local.status === 'disponible' ? (
             <Link 
               to={`/cotizar?local=${local.codigo}`}
               className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm text-center"
             >
               Generar Cotización
             </Link>
          ) : (
            <button disabled className="w-full md:w-auto bg-gray-300 text-gray-500 font-medium py-2 px-6 rounded-lg cursor-not-allowed">
              No disponible para cotizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalDetail;