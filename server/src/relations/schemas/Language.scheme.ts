import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class language {
  @Prop({
    required: true,
  })
  language_name: string;
  @Prop({ default: Date.now })
  createdAt: Date;
}
export type languageDocument = language & Document;
export const languageSchema = SchemaFactory.createForClass(language);