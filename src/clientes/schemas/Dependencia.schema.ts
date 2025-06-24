import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Dependencia' })
export class Dependencia extends Document {
  @Prop({ required: true })
  Dependencia: string;
}

export const DependenciaSchema = SchemaFactory.createForClass(Dependencia);
