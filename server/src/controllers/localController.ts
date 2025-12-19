import type { Request, Response } from 'express';
import Local from '../models/Local.js';

// @desc    Obtener todos los locales con filtros y paginación
// @route   GET /api/locales
export const getLocales = async (req: Request, res: Response): Promise<void> => {
    try {
        const { 
            codigo, 
            pabellon, 
            min_area, 
            max_area, 
            min_precio, 
            max_precio,
            page = 1, 
            limit = 10 
        } = req.query;

        // Construir query dinámica
        const query: any = {};

        if (codigo) query.codigo = { $regex: codigo, $options: 'i' }; // Búsqueda parcial
        if (pabellon) query.pabellon = pabellon;
        
        // Filtros de Rango (Área y Precio) [cite: 15]
        if (min_area || max_area) {
            query.area_m2 = {};
            if (min_area) query.area_m2.$gte = Number(min_area);
            if (max_area) query.area_m2.$lte = Number(max_area);
        }

        if (min_precio || max_precio) {
            query.precio_mensual = {};
            if (min_precio) query.precio_mensual.$gte = Number(min_precio);
            if (max_precio) query.precio_mensual.$lte = Number(max_precio);
        }

        // Paginación [cite: 16]
        const skip = (Number(page) - 1) * Number(limit);

        const locales = await Local.find(query)
            .skip(skip)
            .limit(Number(limit));

        const total = await Local.countDocuments(query);

        res.json({
            success: true,
            count: locales.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            data: locales
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

// @desc    Obtener un local por código
// @route   GET /api/locales/:codigo
export const getLocalByCodigo = async (req: Request, res: Response): Promise<void> => {
    try {
        // Busca por el campo "codigo", no por _id [cite: 17]
        const local = await Local.findOne({ codigo: req.params.codigo! });

        if (!local) {
            res.status(404).json({ success: false, message: 'Local no encontrado' });
            return;
        }

        res.json({ success: true, data: local });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};