import mongoose, { Document, Schema } from 'mongoose';

export interface ICotizacion extends Document {
    prospecto_email: string;
    local_codigo: string;
    duracion_meses: number;
    notas?: string;
    subtotal: number;
    iva: number;
    total: number;
    fecha_creacion: Date;
}

const CotizacionSchema: Schema = new Schema({
    prospecto_email: { type: String, required: true },
    local_codigo: { type: String, required: true },
    duracion_meses: { type: Number, required: true },
    notas: { type: String },
    // Campos calculados
    subtotal: { type: Number, required: true },
    iva: { type: Number, required: true }, // 16%
    total: { type: Number, required: true },
    fecha_creacion: { type: Date, default: Date.now }
});

export default mongoose.model<ICotizacion>('Cotizacion', CotizacionSchema);