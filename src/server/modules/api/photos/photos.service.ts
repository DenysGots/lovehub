import { Model } from 'mongoose';
import { Types } from 'mongoose';
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

  async findById(id: string): Promise<string> {
    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const photo = await this.photoModel.findById(id);
        return photo.base64;
      }
    } catch (error) {
      console.error(`Arise an exception in the findById(${id}) method Photos Service`);
      throw error;
    }
  }
}
