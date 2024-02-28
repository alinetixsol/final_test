import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RelationSchema, Relations } from 'src/relations/schemas/Relation.scheme';
import { News, NewsSchema } from './schemas/news.schema';
import { language, languageSchema } from 'src/relations/schemas/Language.scheme';
import { Country, CountrySchema } from 'src/relations/schemas/Country.scheme';

@Module({
  imports :[
    MongooseModule.forFeature([{name: News.name,  schema: NewsSchema}]),
    MongooseModule.forFeature([{name: Relations.name,  schema: RelationSchema}]),
    MongooseModule.forFeature([{name: language.name,  schema: languageSchema}]),
    MongooseModule.forFeature([{name: Country.name,  schema: CountrySchema}]),
  ],
  providers: [NewsService],
  controllers: [NewsController]
})
export class NewsModule {}
