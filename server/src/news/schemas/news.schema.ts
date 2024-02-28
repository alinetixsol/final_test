import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Country } from 'src/relations/schemas/Country.scheme';
import { language } from 'src/relations/schemas/Language.scheme';
import { Relations } from 'src/relations/schemas/Relation.scheme';

@Schema({
  timestamps: true,
})
export class News {
  @Prop()
  uuid: string;

  @Prop()
  ord_in_thread: string;

  @Prop()
  author: string;

  @Prop()
  published: string;

  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'language' })
  language: language;

  @Prop()
  crawled: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Relations' })
  site_url: Relations;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
  country: Country;

  @Prop()
  domain_rank: number;

  @Prop()
  thread_title: string;

  @Prop()
  spam_score: number;

  @Prop()
  main_img_url: string;

  @Prop()
  replies_count: number;

  @Prop()
  participants: number;

  @Prop()
  likes: number;

  @Prop()
  comments: number;

  @Prop()
  shares: number;

  @Prop()
  type: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
