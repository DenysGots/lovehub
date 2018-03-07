import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-upload-photo',
  template: `<input type="file" (change)="fileChangeEvent($event)" placeholder="Upload photo..."/>
              <button type="button" (click)="upload()">Upload</button>`,
})
export class PhotosComponent implements OnInit {

  filesToUpload: FileList;

  constructor(private photosService: PhotosService) {}

  ngOnInit() {
  }

  async upload() {
    const file: File = this.filesToUpload[0];
    const fileBase64 = await this.toDataURL(file);
    console.log(fileBase64);
    this.photosService.uploadPhoto(fileBase64).subscribe();
  }
  toDataURL (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <FileList>fileInput.target.files;
  }
}
