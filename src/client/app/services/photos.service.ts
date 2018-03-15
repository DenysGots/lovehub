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

  uploadPhoto(file): Observable<any> {
    const url = 'api/photos';
    console.log('send');
    return this.http.post<any>(url, {data: file}, httpOptions);
  }

  getPhoto(id: string): Observable<any> {
    const url = 'api/photos/' + id;
    return this.http.get<any>(url);
  }

  // getAvatar(): Observable<any> {
  //   const url = 'api/photos/avatar';
  //   return this.http.get<any>(url);
  // }
}
