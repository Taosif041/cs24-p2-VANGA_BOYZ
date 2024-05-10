import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContructorService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();

    // Create headers in JSON format
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
    });

    return headers;
  }

  getContructorList(): Observable<any> {
    return this._http.get(`${this.apiUrl}/landfill`, {
      headers: this.getHeaders(),
    });
  }

  getContructorById(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/contructor/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addContructor(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/contructor`, data, {
      headers: this.getHeaders(),
    });
  }

  deleteContructor(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/Contructor/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateContructor(id: string, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/contructor/${id}`, data, {
      headers: this.getHeaders(),
    });
  }

  addManagerToContructor(
    contructorId: string,
    managerId: string
  ): Observable<any> {
    const data = { managerId };
    return this._http.post(
      `${this.apiUrl}/contructor/${contructorId}/managers`,
      data,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
