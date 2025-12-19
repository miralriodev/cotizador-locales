import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Local from '../models/Local.js';

dotenv.config();

const locales = [
  {
    codigo: "L-A-001",
    pabellon: "A",
    area_m2: 45.5,
    precio_mensual: 15000,
    status: "disponible",
    ubicacion: { lat: 19.4326, lng: -99.1332 },
    caracteristicas: { instalacion_electrica: "220V", carga_maxima_kg: 500, altura_m: 3.5 }
  },
  {
    codigo: "L-B-002",
    pabellon: "B",
    area_m2: 60.0,
    precio_mensual: 20000,
    status: "ocupado",
    ubicacion: { lat: 19.4340, lng: -99.1340 },
    caracteristicas: { instalacion_electrica: "110V", carga_maxima_kg: 300, altura_m: 3.0 }
  },
  {
    codigo: "L-A-002",
    pabellon: "A",
    area_m2: 50.0,
    precio_mensual: 16500,
    status: "disponible",
    ubicacion: { lat: 19.4330, lng: -99.1335 },
    caracteristicas: { instalacion_electrica: "220V", carga_maxima_kg: 600, altura_m: 3.8 }
  },
  {
    codigo: "L-B-003",
    pabellon: "B",
    area_m2: 55.5,
    precio_mensual: 18500,
    status: "disponible",
    ubicacion: { lat: 19.4345, lng: -99.1345 },
    caracteristicas: { instalacion_electrica: "110V", carga_maxima_kg: 400, altura_m: 3.2 }
  },
  {
    codigo: "L-C-001",
    pabellon: "C",
    area_m2: 70.0,
    precio_mensual: 22000,
    status: "ocupado",
    ubicacion: { lat: 19.4350, lng: -99.1350 },
    caracteristicas: { instalacion_electrica: "220V", carga_maxima_kg: 800, altura_m: 4.0 }
  },
  {
    codigo: "L-C-002",
    pabellon: "C",
    area_m2: 40.0,
    precio_mensual: 14000,
    status: "disponible",
    ubicacion: { lat: 19.4355, lng: -99.1355 },
    caracteristicas: { instalacion_electrica: "110V", carga_maxima_kg: 350, altura_m: 3.0 }
  },
  {
    codigo: "L-D-001",
    pabellon: "D",
    area_m2: 65.0,
    precio_mensual: 19500,
    status: "disponible",
    ubicacion: { lat: 19.4360, lng: -99.1360 },
    caracteristicas: { instalacion_electrica: "220V", carga_maxima_kg: 700, altura_m: 3.6 }
  },
  {
    codigo: "L-D-002",
    pabellon: "D",
    area_m2: 48.5,
    precio_mensual: 15500,
    status: "ocupado",
    ubicacion: { lat: 19.4365, lng: -99.1365 },
    caracteristicas: { instalacion_electrica: "110V", carga_maxima_kg: 450, altura_m: 3.3 }
  },
  {
    codigo: "L-E-001",
    pabellon: "E",
    area_m2: 75.0,
    precio_mensual: 25000,
    status: "disponible",
    ubicacion: { lat: 19.4370, lng: -99.1370 },
    caracteristicas: { instalacion_electrica: "220V", carga_maxima_kg: 900, altura_m: 4.2 }
  },
  {
    codigo: "L-E-002",
    pabellon: "E",
    area_m2: 52.0,
    precio_mensual: 17000,
    status: "disponible",
    ubicacion: { lat: 19.4375, lng: -99.1375 },
    caracteristicas: { instalacion_electrica: "110V", carga_maxima_kg: 500, altura_m: 3.4 }
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Local.deleteMany(); // Borra lo viejo para no duplicar
    await Local.insertMany(locales);
    console.log('¡Datos importados correctamente!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();