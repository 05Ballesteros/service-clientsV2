import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Clientes' })
export class Clientes extends Document {
  @Prop({ required: true })
  Nombre: string;

  @Prop({ required: true, unique: true })
  Correo: string;

  @Prop({ type: Types.ObjectId, ref: 'Dependencia', required: true, default: new Types.ObjectId('679b8a12c9c34d1de358f1cd'), })
  Dependencia: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Direccion_general' })
  Direccion_General: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Direccionarea' })
  direccion_area: Types.ObjectId;

  @Prop({ required: true })
  Telefono: string;

  @Prop()
  Extension: string;

  @Prop()
  Ubicacion: string;
}

export const ClienteSchema = SchemaFactory.createForClass(Clientes);
