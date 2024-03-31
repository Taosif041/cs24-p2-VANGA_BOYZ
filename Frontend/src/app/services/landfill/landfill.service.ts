import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LandfillService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  getLandfillList(): Observable<any> {
    return this._http.get(`${this.apiUrl}/landfill`, {
      headers: this.getHeaders(),
    });
  }

  getLandfillById(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/landfill/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addLandfill(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/landfill`, data, {
      headers: this.getHeaders(),
    });
  }

  deleteLandfill(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/landfill/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateLandfill(id: string, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/landfill/${id}`, data, {
      headers: this.getHeaders(),
    });
  }

  addManagerToLandfill(landfillId: string, managerId: string): Observable<any> {
    const data = { managerId };
    return this._http.post(
      `${this.apiUrl}/landfill/${landfillId}/managers`,
      data,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
