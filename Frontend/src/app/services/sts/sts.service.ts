import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';

@Injectable({
  providedIn: 'root',
})
export class StsService {
  private url = 'http://localhost:3000/sts';
  private uul = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    private _http: HttpClient,
    private authService: AuthenticationService
  ) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  getStsList(): Observable<any> {
    return this._http.get(this.uul);
  }
  getStsById(id: string): Observable<any> {
    return this._http.get(`http://localhost:3000/sts/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addSts(data: any): Observable<any> {
    return this._http.post(this.url, data, {
      headers: this.getHeaders(),
    });
  }
  deleteSts(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/sts/${id}`, {
      headers: this.getHeaders(),
    });
  }
  updateSts(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/sts/${id}`, data, {
      headers: this.getHeaders(),
    });
  }
}
