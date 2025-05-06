import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Direccion_area' })
export class Direccionarea extends Document {
  @Prop({ required: true })
  direccion_area: Types.ObjectId;
}

export const Direccion_areaSchema = SchemaFactory.createForClass(Direccionarea);
