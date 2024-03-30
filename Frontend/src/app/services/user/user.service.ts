import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3000/user';

  constructor(
    private _http: HttpClient,
    private authService: AuthenticationService
  ) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  getUserList(): Observable<any> {
    return this._http.get(this.url, { headers: this.getHeaders() });
  }
  getUserById(id: string): Observable<any> {
    return this._http.get(`http://localhost:3000/user/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addUser(data: any): Observable<any> {
    return this._http.post(this.url, data, { headers: this.getHeaders() });
  }
  deleteUser(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/user/${id}`, {
      headers: this.getHeaders(),
    });
  }
  updateUser(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/user/${id}`, data, {
      headers: this.getHeaders(),
    });
  }
}
