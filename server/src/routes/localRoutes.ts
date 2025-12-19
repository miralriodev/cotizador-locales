import express from 'express';
import { getLocalByCodigo, getLocales } from '../controllers/localController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Local:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           description: Código único del local
 *         pabellon:
 *           type: string
 *         area_m2:
 *           type: number
 *         precio_mensual:
 *           type: number
 *         status:
 *           type: string
 *           enum: [disponible, ocupado, mantenimiento]
 */

/**
 * @swagger
 * /api/locales:
 *   get:
 *     summary: Retorna lista de locales disponibles con filtros
 *     tags: [Locales]
 *     parameters:
 *       - in: query
 *         name: pabellon
 *         schema:
 *           type: string
 *       - in: query
 *         name: min_area
 *         schema:
 *           type: number
 *       - in: query
 *         name: max_precio
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lista de locales paginada
 */
router.get('/', getLocales);

/**
 * @swagger
 * /api/locales/{codigo}:
 *   get:
 *     summary: Retorna detalle completo de un local específico
 *     tags: [Locales]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del local
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Local'
 *       404:
 *         description: Local no encontrado
 */
router.get('/:codigo', getLocalByCodigo);

export default router;