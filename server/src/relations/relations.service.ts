import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Relations } from './schemas/Relation.scheme';
import mongoose from 'mongoose';
import { RelationsDto } from './dtos/Relations.dto';
import { Country } from './schemas/Country.scheme';
import { language } from './schemas/Language.scheme';

@Injectable()
export class RelationsService {
  constructor(
    @InjectModel(Relations.name)
    private RelationsModel: mongoose.Model<Relations>,
    @InjectModel(Country.name) private CountryModel: mongoose.Model<Country>,
    @InjectModel(language.name) private languageModel: mongoose.Model<language>,
  ) {}

  async create(Comment: any, myarr: string[]): Promise<boolean> {
    if (!myarr.includes(Comment.site_url)) {
      console.log(myarr.includes(Comment.site_url));
      console.log('is side the service ', myarr);
      const createdComment = new this.RelationsModel({
        relation_type: Comment.site_url,
      });
      await createdComment.save();
      return true;
    } else {
      return false;
    }
  }

  async createCountry(Comment: any, countryarr: string[]): Promise<boolean> {
    if (!countryarr.includes(Comment.country)) {
      console.log(countryarr.includes(Comment.country));
      console.log('is side the service ', countryarr);
      const createdComment = new this.CountryModel({
        country_name: Comment.country,
      });
      await createdComment.save();
      return true;
    } else {
      return false;
    }
  }

  async createLanguage(Comment: any, languageArr: string[]): Promise<boolean> {
    if (!languageArr.includes(Comment.language)) {
      console.log(languageArr.includes(Comment.language));
      console.log('is side the service ', languageArr);
      const createdComment = new this.languageModel({
        language_name: Comment.language,
      });
      await createdComment.save();
      return true;
    } else {
      return false;
    }
  }
  async findAll(): Promise<any> {
    const blog = await this.RelationsModel.find()
      .populate('Country')
      .populate('language');
    return blog;
  }
}
