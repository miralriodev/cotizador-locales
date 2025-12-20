import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cotizacionService, localService } from '../services/api';
import type { CotizacionResponse, Local } from '../types';

const CreateCotizacion = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialLocalCode = searchParams.get('local') || '';

  // Estados
  const [localInfo, setLocalInfo] = useState<Local | null>(null);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quotationResult, setQuotationResult] = useState<CotizacionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form Data
  const [formData, setFormData] = useState({
    prospecto_email: '',
    local_codigo: initialLocalCode,
    duracion_meses: 12, // Valor por defecto razonable
    notas: ''
  });

  // 1. Efecto: Cargar info del local para mostrar contexto (precio base)
  useEffect(() => {
    const fetchLocalContext = async () => {
      if (!formData.local_codigo) return;
      try {
        setLoadingLocal(true);
        const data = await localService.getByCodigo(formData.local_codigo);
        setLocalInfo(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('El código del local no es válido o no existe.');
        setLocalInfo(null);
      } finally {
        setLoadingLocal(false);
      }
    };

    fetchLocalContext();
  }, [formData.local_codigo]);

  const validateForm = (): boolean => {

    if (localInfo && localInfo.status !== 'disponible') {
      setError(`El local ${localInfo.codigo} no está disponible para cotizar (Estado: ${localInfo.status}).`);
      return false;
    }

    // 2. Validar que el Local exista
    if (!localInfo) {
      setError('Debes ingresar un código de local válido antes de continuar.');
      return false;
    }

    // 3. Validar Email estricto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.prospecto_email)) {
      setError('Por favor ingresa un correo electrónico válido (ej: usuario@dominio.com).');
      return false;
    }

    // 4. Validar Enteros en duración
    if (!Number.isInteger(formData.duracion_meses)) {
      setError('La duración debe ser un número entero de meses.');
      return false;
    }

    return true;
  };

  // 2. Manejo del Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm())
       return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await cotizacionService.create({
        prospecto_email: formData.prospecto_email,
        local_codigo: formData.local_codigo,
        duracion_meses: Number(formData.duracion_meses),
        notas: formData.notas
      });
      setQuotationResult(response); // Guardamos el resultado para mostrar el "Recibo"
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al generar la cotización. Intente nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper para moneda
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

  // --- VISTA: RESULTADO DE LA COTIZACIÓN (ÉXITO) ---
  if (quotationResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full text-center border border-green-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Cotización Exitosa!</h2>
          <p className="text-gray-500 mb-6">Se ha enviado una copia a {formData.prospecto_email}</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3 text-left">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>{formatCurrency(quotationResult.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>IVA (16%):</span>
              <span>{formatCurrency(quotationResult.iva)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg text-gray-800">
              <span>Total:</span>
              <span>{formatCurrency(quotationResult.total)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/')} 
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Volver al inicio
            </button>
            <button 
              onClick={() => {
                setQuotationResult(null);
                setFormData({...formData, notas: ''}); // Limpiar notas para nueva cotización
              }}
              className="w-full text-blue-600 py-2 hover:bg-blue-50 rounded-lg transition"
            >
              Nueva cotización
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA: FORMULARIO ---
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button onClick={() => navigate(-1)} className="mb-4 md:mb-6 text-gray-500 hover:text-gray-800">
        ← Cancelar
      </button>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-blue-600 p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold text-white">Generar Nueva Cotización</h1>
          <p className="text-blue-100 mt-1">Ingresa los datos para calcular el arrendamiento.</p>
        </div>

        <div className="p-4 md:p-8">
          {/* Tarjeta de Resumen del Local (Si existe info) */}
          {localInfo && (
            <div className="mb-6 md:mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900">Local {localInfo.codigo}</h3>
                <p className="text-sm text-blue-700">{localInfo.pabellon}</p>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <p className="font-bold text-blue-900">{formatCurrency(localInfo.precio_mensual)}</p>
                <p className="text-xs text-blue-600">por mes</p>
              </div>
            </div>
          )}

          {localInfo && localInfo.status !== 'disponible' && (
           
           <div className='mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3'>
            <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-bold text-yellow-800">Local No Disponible</h4>
                <p className="text-sm text-yellow-700">
                  Este local se encuentra actualmente <strong>{localInfo.status.toUpperCase()}</strong>. 
                  No se pueden generar cotizaciones nuevas.
                </p>
              </div>
           </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo: Local ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código del Local</label>
              <input
                type="text"
                required
                value={formData.local_codigo}
                onChange={(e) => setFormData({...formData, local_codigo: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Ej. A-101"
              />
              {loadingLocal && <p className="text-xs text-gray-500 mt-1">Buscando local...</p>}
            </div>

            {/* Campo: Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email del Prospecto</label>
              <input
                type="email"
                required
                value={formData.prospecto_email}
                onChange={(e) => setFormData({...formData, prospecto_email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="cliente@empresa.com"
              />
            </div>

            {/* Campo: Duración */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duración (Meses)</label>
              <input
                type="number"
                min="1"
                max="60"
                required
                value={formData.duracion_meses}
                onChange={(e) => setFormData({...formData, duracion_meses: Number(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <p className="text-xs text-gray-400 mt-1">Mínimo 1 mes</p>
            </div>

            {/* Campo: Notas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas Adicionales (Opcional)</label>
              <textarea
                rows={3}
                value={formData.notas}
                onChange={(e) => setFormData({...formData, notas: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                placeholder="Detalles sobre el contrato o requerimientos..."
              />
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={submitting || loadingLocal || !!error}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all shadow-md
                ${(submitting || loadingLocal || !!error)
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
            >
              {submitting ? 'Generando Cotización...' : 'Calcular Cotización'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCotizacion;