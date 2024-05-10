import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkforceService {
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

  getWorkforceList(): Observable<any> {
    return this._http.get(`${this.apiUrl}/workforce`, {
      headers: this.getHeaders(),
    });
  }

  getWorkforceById(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/workforce/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addWorkforce(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/workforce`, data, {
      headers: this.getHeaders(),
    });
  }

  deleteWorkforce(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/workforce/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateWorkforce(id: string, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/workforce/${id}`, data, {
      headers: this.getHeaders(),
    });
  }
}
