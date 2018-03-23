import { Controller, Get, Post, Delete, Body, Param, HttpCode, Request, Response, HttpStatus, Headers } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';


@Controller('api')
export class PhotosController {

  constructor(private readonly photosService: PhotosService) {
  }

  @HttpCode(201)
  @Post('/avatars/users/:id')
  async createAva(@Request() req, @Response() res, @Body('data') file, @Param() params): Promise<any> {
    const img = await this.photosService
      .create({name: file.name, base64: file.base64, avatar: true, userId: params.id} as CreatePhotoDto);
    console.log(img._id);
    res.status(HttpStatus.OK).json({data: 'success'});
  }

  @HttpCode(201)
  @Post('/photos/users/:id')
  async create(@Request() req, @Response() res, @Body('data') file, @Param() params): Promise<any> {
    const img = await this.photosService
      .create({name: file.name, base64: file.base64, avatar: false, userId: params.id} as CreatePhotoDto);
    console.log(img._id);
    res.status(HttpStatus.OK).json({data: 'success'});
  }

  // @HttpCode(200)
  // // @Headers('image/png')
  // @Get('/photos/users/:id')
  // async findById(@Param() params): Promise<any> {
  //   const src = this.photosService.findById(params.id);
  //   return await src;
  // }

  @HttpCode(200)
  // @Headers('image/png')
  @Get('/photos/users/:id')
  async findAll(@Param() params): Promise<any[]> {
    const src = this.photosService.findAll();
    console.log(src);
    return await src;
  }

  // @HttpCode(204)
  // @Delete(':id')
  // async removeById(@Param() params): Promise<{statusCode: number}> {
  //   const affected = await this.photosService.remove(params.id);
  //   return {statusCode: affected};
  // }

}
