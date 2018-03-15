import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  filesToUpload: FileList;

  constructor(private photosService: PhotosService) {}

  ngOnInit() {
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
    this.photosService.uploadPhoto(fileRes).subscribe();
    this.displayPhoto();
  }

  toDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  displayPhoto() {
    const base64 = this.photosService.getPhoto().subscribe();
    console.log(base64);
    const img = new Image();
    img.src = '';
    document.getElementById('profile-photo').style.backgroundImage = 'url(\'' + img.src + '\')';
  }

}
