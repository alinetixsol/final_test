import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Schema as MongooseSchema } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({
    required: true,
    message: 'Username is required and it should be unique',
    unique: true,
  })
  username: string;

  @Prop({ required: false, message: 'Email is required' })
  email: string;

  @Prop({ required: true, message: 'Password is required' })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
