import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Country {
  @Prop({
    required: true,
  })
  country_name: string;
  @Prop({ default: Date.now })
  createdAt: Date;
}
export type CountryDocument = Country & Document;
export const CountrySchema = SchemaFactory.createForClass(Country);