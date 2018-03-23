import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PhotosService {

  constructor(private http: HttpClient) {}

  uploadAvatar(file, userId): Observable<any> {
    const url = `api/avatars/users/${userId}`;
    console.log('send');
    return this.http.post<any>(url, {data: file}, httpOptions);
  }

  uploadPhoto(file, userId): Observable<any> {
    const url = `api/photos/users/${userId}`;
    console.log('send');
    return this.http.post<any>(url, {data: file}, httpOptions);
  }


  getPhoto(): Observable<any> {
    const url = 'api/photos/id';
    return this.http.get<any>(url);
  }

}
