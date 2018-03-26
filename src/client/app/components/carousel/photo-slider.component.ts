import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import * as jwt_decode from 'jwt-decode';
import { Photo } from '../../models/photo';


@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class PhotoSliderComponent implements OnInit {

  filesToUpload: FileList;
  userId: number;
  photos: Photo[];

  constructor(private photosService: PhotosService) {}

  ngOnInit() {
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.photosService.getPhotos(this.userId)
      .subscribe(items => {
      this.photos = items;
      console.log(items);
    });
  }

  displayButton() {
    document.getElementById('button').style.visibility = 'visible';
  }

  hideButton() {
    document.getElementById('button').style.visibility = 'hidden';
  }

  deletePhoto(photoId: string) {
    this.photosService.deletePhoto(photoId).subscribe();
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <FileList>fileInput.target.files;
    if (this.filesToUpload) {
      this.upload();
    }
    this.fileReset(fileInput);
  }

  fileReset(fileInput: any) {
    fileInput.target.value = '';
    return ;
  }

  async upload() {
    const file: File = this.filesToUpload[0];
    const fileBase64 = await this.toDataURL(file);
    const fileName = file.name;
    const fileRes = {base64: fileBase64, name: fileName};
    this.photosService.uploadPhoto(fileRes, this.userId).subscribe();
  }

  toDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

}
