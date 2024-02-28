// import { Controller } from '@nestjs/common';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { parse } from 'papaparse';
import { readFileSync } from 'fs';
import { RelationsService } from './relations.service';
import { RelationsDto } from './dtos/Relations.dto';

@Controller('relations')
export class RelationsController {
  constructor(private RelationsService: RelationsService) {}

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './files',
  //       filename: (req, file, callback) => {
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
      throw new BadRequestException('No file uploaded');
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

      const myarr = [];
      const createCountryArr = [];
      const createLanguageArr = [];
      const dirtyData = [];
      for (const element of parsedCsv.data) {
        const csvElement = element as any;

        if (
          !csvElement.language ||
          !csvElement.site_url ||
          !csvElement.country ||
          csvElement.site_url.split(' ').length > 1
        ) {
          dirtyData.push(csvElement);
          continue;
        }
        const promise = await this.RelationsService.create(element, myarr);

        if (promise) {
          myarr.push(csvElement.site_url);
          console.log('controller', promise, myarr);
        }

        const CountryPromise = await this.RelationsService.createCountry(
          element,
          createCountryArr,
        );

        if (CountryPromise) {
          createCountryArr.push(csvElement.country);
          console.log('controller', promise, createCountryArr);
        }

        const LanguagePromise = await this.RelationsService.createLanguage(
          element,
          createLanguageArr,
        );

        if (LanguagePromise) {
          createLanguageArr.push(csvElement.language);
          console.log('controller', promise, createLanguageArr);
        }
      }
      return { dirtyData: dirtyData };
    } catch (error) {
      throw new BadRequestException('Error processing CSV file');
    }
  }
  @Get()
  async getAllBlogs(): Promise<any> {
    return this.RelationsService.findAll();
  }
}
