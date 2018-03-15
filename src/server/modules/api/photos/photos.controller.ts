import {Controller, Get, Post, Delete, Body, Param, HttpCode, Request, Response, HttpStatus, Headers} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { CreatePhotoDto } from './dto/create-photo.dto';


@Controller('api/photos')
export class PhotosController {

  constructor(private readonly photosService: PhotosService) {
  }



  @HttpCode(201)
  @Post()
  async create(@Request() req, @Response() res, @Body('data') file): Promise<any> {
    const img = await this.photosService.create({name: file.name, base64: file.base64} as CreatePhotoDto);
    console.log(img._id);
    res.status(HttpStatus.OK).json({data: 'success'});
  }

  @HttpCode(200)
  // @Headers('image/png')
  @Get(':id')
  async findById(@Param() params): Promise<any> {
    const src = this.photosService.findById(params.id);
    return await src;
  }

  // @HttpCode(200)
  // @Get('/avatar')
  // async findAvatar(@Request() req): Promise<string> {
  //   const src = this.photosService.findById(params.id);
  //   return await src;
  // }

}
