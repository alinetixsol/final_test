import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UploadedFile,
} from '@nestjs/common';

import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private NewsService: NewsService) {}

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './files',
  //       filename: (req, file, callback) => {
  //         // Custom filename to avoid duplicates
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         callback(
  //           null,
  //           `${file.originalname}-${uniqueSuffix}${extname(file.originalname)}`,
  //         );
  //       },
  //     }),
  //   }),
  // )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('file is missing ...');
    }
    try {
      const csvData = readFileSync(file.path, 'utf-8');
      const parsedCsv = parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) =>
          header.toLowerCase().replace('#', '').trim(),
        complete: (results) => results.data,
      });

      const urlsArray = await this.NewsService.findAllUrls();
      const createCountryArr = await this.NewsService.findAllCountries();
      const createLanguageArr = await this.NewsService.findAllLanguages();

      const newsFilterArray = [];
      const dirtyData = [];
      // console.log({
      //     urlsArray,
      //     createCountryArr,
      //     createLanguageArr
      // });

      let dublicate: number = 0;

      for (const element of parsedCsv.data) {
        const csvElement = element as any;

        const isDuplicate = newsFilterArray.some(
          (entry) =>
            entry.site_url === csvElement.site_url &&
            entry.country === csvElement.country &&
            entry.language === csvElement.language &&
            entry.author === csvElement.author &&
            entry.title === csvElement.title,
        );

        if (isDuplicate) {
          dublicate++;
          console.log('in continue');

          continue;
        }

        newsFilterArray.push({
          site_url: csvElement.site_url,
          country: csvElement.country,
          language: csvElement.language,
          author: csvElement.author,
          title: csvElement.title,
        });

        console.log(newsFilterArray);

        const matchedObjectUrl: any = urlsArray.find(
          (obj) => obj.relation_type === csvElement.site_url,
        );
        const myUrl = matchedObjectUrl ? matchedObjectUrl._id : null;

        const matchedObjectLanguage: any = createCountryArr.find(
          (obj2) => obj2.country_name == csvElement.country,
        );
        const myLanguage = matchedObjectLanguage
          ? matchedObjectLanguage._id
          : null;

        // console.log("lang" , csvElement.language);

        const matchedObjectCountry: any = createLanguageArr.find(
          (obj3) => obj3.language_name == csvElement.language,
        );
        const myCountry = matchedObjectCountry
          ? matchedObjectCountry._id
          : null;
        // console.log("country" , csvElement.country);

        if (!myUrl || !myLanguage || !myCountry) {
          dirtyData.push(element);
          continue;
        }

        // console.log({
        //     myUrl,
        //     myLanguage,
        //     myCountry
        // });

        const promise = await this.NewsService.create(
          myUrl,
          myLanguage,
          myCountry,
          element,
        );

        if (!promise) {
          dirtyData.push(element);
        }
      }
      // console.log(dublicate);

      return {
        duplicateData: dublicate,
        addedRecord: newsFilterArray.length,
        dirtyDataLength: dirtyData.length,
        dirtyData: dirtyData,
      };
    } catch (error) {
      throw new BadRequestException('Error processing CSV file');
    }
  }
  @Get('/countries')
  async getAllCountries(): Promise<any> {
    return this.NewsService.findCountry();
  }

  @Get('/languages')
  async getAllLangauges(): Promise<any> {
    return this.NewsService.findLanguage();
  }
  @Get()
  async getAllNews(): Promise<any> {
    return this.NewsService.findAllRelations();
  }
  @Get('/all')
  async getAll(@Query() query): Promise<any[]> {
    console.log(query.get);
    const news = this.NewsService.getAll(query);
    return news;
  }
  @Get('/aggregateByDate') // Changed route path here
  async aggregateNewsByDate(): Promise<any[]> {
    return this.NewsService.aggregateNewsByDate();
  }

  @Get(':id')
  async getBlogsById(@Param('id') id: string): Promise<any> {
    return this.NewsService.findById(id);
  }

  @Get('/author/aggregateByDate') // Changed route path here
  async aggregateNews(): Promise<any[]> {
    return this.NewsService.aggregateNews();
  }
}
