import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Importamos los iconos de Radix
import { 
  SewingPinIcon, 
  SizeIcon, 
  MagnifyingGlassIcon, 
  FileTextIcon,
  PaperPlaneIcon
} from '@radix-ui/react-icons';
import { localService } from '../services/api';
import type { Local } from '../types';

export default function Dashboard() {
  const [locales, setLocales] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para filtros según requerimientos [cite: 52]
  const [filters, setFilters] = useState({
    pabellon: '',
    min_precio: '',
    max_precio: ''
  });

  const fetchLocales = async () => {
    setLoading(true);
    try {
      // Limpieza de filtros vacíos
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '')
      );
      const response = await localService.getAll(params);
      setLocales(response.data);
    } catch (error) {
      console.error('Error cargando locales:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocales();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FileTextIcon className="w-6 h-6" /> Locales Disponibles
        </h2>
      </div>

      {/* --- BARRA DE FILTROS --- */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pabellón</label>
          <select 
            name="pabellon" 
            className="border border-gray-200 rounded-lg p-2.5 w-36 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="A">Pabellón A</option>
            <option value="B">Pabellón B</option>
            <option value="C">Pabellón C</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Precio Min</label>
            <input 
              type="number" 
              name="min_precio" 
              placeholder="0" 
              className="border border-gray-200 rounded-lg p-2.5 w-28 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Precio Max</label>
            <input 
              type="number" 
              name="max_precio" 
              placeholder="Max" 
              className="border border-gray-200 rounded-lg p-2.5 w-28 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <button 
          onClick={fetchLocales}
          className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <MagnifyingGlassIcon className="w-4 h-4" /> Buscar
        </button>
      </div>

      {/* --- GRID DE RESULTADOS --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
           <p>Cargando inventario...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locales.map((local) => (
            <div key={local._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
              {/* Imagen Placeholder (Gris elegante) */}
              <div className="h-36 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                <span className="text-gray-300 text-5xl select-none">🏢</span>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">{local.codigo}</h3>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                    local.status === 'disponible' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {local.status === 'disponible' ? 'DISPONIBLE' : 'OCUPADO'}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-3">
                    <SewingPinIcon className="w-4 h-4 text-gray-400" /> 
                    <span>Pabellón <span className="font-semibold text-gray-800">{local.pabellon}</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <SizeIcon className="w-4 h-4 text-gray-400" /> 
                    <span>{local.area_m2} m²</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Radix no tiene icono de dolar explícito, usamos texto estilizado */}
                    <div className="w-4 h-4 flex items-center justify-center font-bold text-gray-400">$</div>
                    <span className="text-lg font-bold text-gray-900">
                      {local.precio_mensual.toLocaleString('es-MX')} <span className="text-xs font-normal text-gray-500">/mes</span>
                    </span>
                  </div>
                </div>

                <Link 
                  to={`/local/${local.codigo}`}
                  className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition font-medium text-sm"
                >
                  <PaperPlaneIcon />
                  Ver Detalle y Cotizar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}