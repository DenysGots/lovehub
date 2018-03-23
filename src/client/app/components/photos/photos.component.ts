import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  filesToUpload: FileList;
  userId: number;

  constructor(private photosService: PhotosService) {}

  ngOnInit() {
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
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
    this.photosService.uploadAvatar(fileRes, this.userId).subscribe();
    this.displayPhotos();
  }

  toDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  displayPhotos() {
    const base64 = this.photosService.getPhoto().subscribe();
    console.log(base64);
    const img = new Image();
    img.src = '';
    document.getElementById('profile-photo').style.backgroundImage = 'url(\'' + img.src + '\')';
  }


}
