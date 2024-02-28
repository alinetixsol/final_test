import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Country } from 'src/relations/schemas/Country.scheme';
import { language } from 'src/relations/schemas/Language.scheme';
import { Relations } from 'src/relations/schemas/Relation.scheme';
import { News } from './schemas/news.schema';
import { retry } from 'rxjs';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(Relations.name)
    private RelationsModel: mongoose.Model<Relations>,
    @InjectModel(Country.name) private CountryModel: mongoose.Model<Country>,
    @InjectModel(language.name) private languageModel: mongoose.Model<language>,
    @InjectModel(News.name) private NewsModel: mongoose.Model<News>,
  ) {}

  async findAllUrls(): Promise<Relations[]> {
    const ComentFind = await this.RelationsModel.find();
    return ComentFind;
  }

  async findAllCountries(): Promise<Country[]> {
    const ComentFind = await this.CountryModel.find();
    return ComentFind;
  }

  async findAllLanguages(): Promise<language[]> {
    const ComentFind = await this.languageModel.find();
    return ComentFind;
  }

  async findAllRelations(): Promise<any> {
    const relationsFind = await this.NewsModel.find();
    return relationsFind;
  }

  async create(
    myUrl: string,
    myLanguage: string,
    myCountry: string,
    single: any,
  ): Promise<boolean> {
    const language = myUrl;
    const siteUrl = myLanguage;
    const country = myCountry;

    if (!language || !siteUrl || !country) {
      return true;
    }

    try {
      await this.NewsModel.create({
        ord_in_thread: single.ord_in_thread,
        author: single.author,
        published: single.published,
        title: single.title,
        text: single.text,
        language: language,
        crawled: single.crawled,
        site_url: siteUrl,
        country: country,
        domain_rank: single.domain_rank,
        thread_title: single.thread_title,
        spam_score: single.spam_score,
        main_img_url: single.main_img_url,
        replies_count: single.replies_count,
        participants: single.participants_count,
        likes: single.likes,
        comments: single.comments,
        shares: single.shares,
        type: single.type,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findCountry(): Promise<any> {
    const country = await this.CountryModel.find();
    return country;
  }
  async findLanguage(): Promise<any> {
    const language = await this.languageModel.find();
    return language;
  }
  async getAll(query: any): Promise<any> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const News = await this.NewsModel.find().limit(resPerPage).skip(skip);
    return News;
  }

  async findById(id: string): Promise<any> {
    const blog = await this.NewsModel.findById(id)
      .populate('language')
      .populate('country');

    console.log('this is blog : ', blog);

    if (!blog) {
      throw new NotFoundException('Blog not found.');
    }
    return blog;
  }
  async aggregateNewsByDate(): Promise<any[]> {
    return this.NewsModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: { $toDate: '$published' },
            },
          },
          participants: { $sum: '$participants' },
          replies_count: { $sum: '$replies_count' },
        },
      },
      {
        $project: {
          date: '$_id',
          participants: 1,
          replies_count: 1,
          _id: 0,
        },
      },
      { $sort: { date: 1 } },
    ]);
  }
  async aggregateNews(): Promise<any[]> {
    return this.NewsModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: { $toDate: '$published' },
            },
          },
          author: { $sum: '$participants' },
        },
      },
      {
        $project: {
          date: '$_id',
          author: 1,
          _id: 0,
        },
      },
      { $sort: { date: 1 } },
    ]);
  }
}
