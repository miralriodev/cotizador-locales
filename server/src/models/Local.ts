import mongoose, {  Schema, Document} from "mongoose";

export interface ILocal extends Document {
  codigo: string;
  pabellon: string;
  area_m2: number;
  precio_mensual: number;
  status: 'disponible' | 'ocupado' | 'mantenimiento';
  ubicacion: { lat: number; lng: number };
  caracteristicas: {
    instalacion_electrica: string;
    carga_maxima_kg: number;
    altura_m: number;
  };
}

const LocalSchema: Schema = new Schema({
  codigo: { type: String, required: true, unique: true }, // Importante: unique
  pabellon: { type: String, required: true },
  area_m2: { type: Number, required: true },
  precio_mensual: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['disponible', 'ocupado', 'mantenimiento'],
    default: 'disponible' 
  },
  ubicacion: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  caracteristicas: {
    instalacion_electrica: { type: String },
    carga_maxima_kg: { type: Number },
    altura_m: { type: Number }
  }
});

export default mongoose.model<ILocal>('Local', LocalSchema);