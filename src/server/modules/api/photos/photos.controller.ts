import {Controller, Get, Post, Delete, Body, Param, HttpCode, Request, Response, HttpStatus} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import {CreatePhotoDto} from './dto/create-photo.dto';



@Controller('api/photos')
export class PhotosController {

  constructor(private readonly photosService: PhotosService) {
  }

  @HttpCode(201)
  @Post()
  async create(@Request() req, @Response() res, @Body('data') base64): Promise<any> {
    console.log(base64);
    res.status(HttpStatus.OK).json({data: 'success'});
    this.photosService.create({name: 'test', base64: base64} as CreatePhotoDto);
  }
}
