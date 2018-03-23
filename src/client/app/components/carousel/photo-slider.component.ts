// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-photo-slider',
//   templateUrl: './photo-slider.component.html',
//   styleUrls: ['./carousel.component.scss']
// })
// export class PhotoSliderComponent  {
//   items = [
//     { title: 'Slide 1' },
//     { title: 'Slide 2' },
//     { title: 'Slide 3' },
//   ];
//
//   addSlide() {
//     this.items.push({
//       title: `Slide 4`
//     });
//   }
//
// }

import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import * as jwt_decode from 'jwt-decode';
;


@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class PhotoSliderComponent implements OnInit {

  filesToUpload: FileList;
  userId: number;

  constructor(private photosService: PhotosService) {}

  i = 3;

  photos = [
    { title: '1' },
    { title: '2' },
    { title: '3' },
  ];

  ngOnInit() {
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
  }


  displayButton() {
    document.getElementById('button').style.visibility = 'visible';
  }

  hideButton() {
    document.getElementById('button').style.visibility = 'hidden';
  }

  addPhoto() {
    this.i++;
    console.log(this.i);
    this.photos.push({
      title: this.i.toString()
    });
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
