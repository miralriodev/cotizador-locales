import express from 'express';
import { createCotizacion, getCotizacionesByProspecto } from '../controllers/cotizacionController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CotizacionInput:
 *       type: object
 *       required:
 *         - prospecto_email
 *         - local_codigo
 *         - duracion_meses
 *       properties:
 *         prospecto_email:
 *           type: string
 *         local_codigo:
 *           type: string
 *         duracion_meses:
 *           type: integer
 *         notas:
 *           type: string
 */

/**
 * @swagger
 * /api/cotizaciones:
 *   post:
 *     summary: Crea una nueva cotización calculando impuestos
 *     tags: [Cotizaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CotizacionInput'
 *     responses:
 *       201:
 *         description: Cotización creada exitosamente
 */
router.post('/', createCotizacion);

/**
 * @swagger
 * /api/cotizaciones/prospecto/{email}:
 *   get:
 *     summary: Historial de cotizaciones de un prospecto
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de cotizaciones
 */
router.get('/prospecto/:email', getCotizacionesByProspecto);

export default router;