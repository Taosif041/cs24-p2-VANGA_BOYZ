import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3000/user';

  constructor(private _http: HttpClient) {}

  getUserList(): Observable<any> {
    return this._http.get(this.url);
  }

  addUser(data: any): Observable<any> {
    return this._http.post(this.url, data);
  }
}
