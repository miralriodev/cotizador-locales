import type { Request, Response } from 'express';
import Cotizacion from '../models/Cotizacion.js';
import Local from '../models/Local.js';

// @desc    Crear nueva cotización
// @route   POST /api/cotizaciones
export const createCotizacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { prospecto_email, local_codigo, duracion_meses, notas } = req.body;

        // 1. Validar que el local existe para obtener su precio
        const local = await Local.findOne({ codigo: local_codigo });
        if (!local) {
            res.status(404).json({ success: false, message: 'Local no encontrado' });
            return;
        }

        // 2. Realizar cálculos (Requerimiento funcional)
        const subtotal = local.precio_mensual * duracion_meses;
        const iva = subtotal * 0.16;
        const total = subtotal + iva;

        // 3. Guardar cotización
        const nuevaCotizacion = new Cotizacion({
            prospecto_email,
            local_codigo,
            duracion_meses,
            notas,
            subtotal,
            iva,
            total
        });

        await nuevaCotizacion.save();

        res.status(201).json({
            success: true,
            data: nuevaCotizacion
        });

    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

// @desc    Obtener cotizaciones de un prospecto
// @route   GET /api/cotizaciones/prospecto/:email
export const getCotizacionesByProspecto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.params;
        
        // Ordenadas por fecha reciente (Requerimiento funcional)
        const cotizaciones = await Cotizacion.find({ prospecto_email: email! })
            .sort({ fecha_creacion: -1 });

        res.json({
            success: true,
            count: cotizaciones.length,
            data: cotizaciones
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};