import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';

@Injectable({
  providedIn: 'root',
})
export class LandfillService {
  private url = 'http://localhost:3000/landfill';
  private uul = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    private _http: HttpClient,
    private authService: AuthenticationService
  ) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  getLandfillList(): Observable<any> {
    return this._http.get(this.url, {
      headers: this.getHeaders(),
    });
  }

  getLandfillById(id: string): Observable<any> {
    return this._http.get(`http://localhost:3000/landfill/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addLandfill(data: any): Observable<any> {
    return this._http.post(this.url, data, { headers: this.getHeaders() });
  }
  deleteLandfill(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/landfill/${id}`, {
      headers: this.getHeaders(),
    });
  }
  updateLandfill(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/landfill/${id}`, data, {
      headers: this.getHeaders(),
    });
  }

  addManagerToLandfill(landfillId: string, managerId: string): Observable<any> {
    const data = { managerId };
    return this._http.post(`${this.url}/${landfillId}/managers`, data, {
      headers: this.getHeaders(),
    });
  }
}
