import { Module } from '@nestjs/common';
import { RelationSchema, Relations } from './schemas/Relation.scheme';
import { MongooseModule } from '@nestjs/mongoose';
import { RelationsService } from './relations.service';
import { RelationsController } from './relations.controller';
import { language, languageSchema } from '../relations/schemas/Language.scheme';
import { Country, CountrySchema } from '../relations/schemas/Country.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Relations.name, schema: RelationSchema },
    ]),
    MongooseModule.forFeature([
      { name: language.name, schema: languageSchema },
    ]),
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  providers: [RelationsService],
  controllers: [RelationsController],
})
export class RelationsModule {}
