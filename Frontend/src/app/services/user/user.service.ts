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
  deleteUser(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/user/${id}`);
  }
  updateUser(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/user/${id}`, data);
  }
}
