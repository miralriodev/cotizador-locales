import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/db.js';
import cotizacionRoutes from './routes/cotizacionRoutes.js';
import localRoutes from './routes/localRoutes.js';


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cotizador Locales',
      version: '1.0.0',
      description: 'Documentación de API para prueba técnica'
    },
  },
  apis: ['./src/routes/*.ts'], 
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api/locales', localRoutes);
app.use('/api/cotizaciones', cotizacionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));