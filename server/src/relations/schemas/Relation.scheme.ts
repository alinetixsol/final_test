import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Relations {
  @Prop({
    required: true,
  })
  relation_type: string;
  @Prop({ default: Date.now })
  createdAt: Date;
}
export type RelationDocument = Relations & Document;
export const RelationSchema = SchemaFactory.createForClass(Relations);