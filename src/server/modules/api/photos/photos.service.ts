import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { Photo } from './interfaces/photo.interface';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Component()
export class PhotosService {
  constructor(
    @Inject('PhotoModelToken') private readonly photoModel: Model<Photo>) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const createdPhoto = new this.photoModel(createPhotoDto);
    return await createdPhoto.save();
  }
}
