import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkingHourService {
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

  addWorkingHour(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/workingHour`, data, {
      headers: this.getHeaders(),
    });
  }

  getWorkingHourList(): Observable<any> {
    return this._http.get(`${this.apiUrl}/workingHour`, {
      headers: this.getHeaders(),
    });
  }

  getWorkingHourById(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/workingHour/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateWorkingHour(id: string, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/workingHour/${id}`, data, {
      headers: this.getHeaders(),
    });
  }

  deleteWorkingHour(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/workingHour/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
