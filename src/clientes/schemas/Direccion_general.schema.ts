import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Direccion_general' })
export class Direccion_general extends Document {
  @Prop({ required: true })
  Direccion_General: string;
}

export const Direccion_generalSchema = SchemaFactory.createForClass(Direccion_general);