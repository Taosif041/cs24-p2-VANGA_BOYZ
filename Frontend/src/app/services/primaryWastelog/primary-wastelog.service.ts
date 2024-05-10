import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrimaryWasteLogService {
  deleteEntry(id: string) {
    throw new Error('Method not implemented.');
  }
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

  getPrimaryWasteLogList(): Observable<any> {
    return this._http.get(`${this.apiUrl}/primaryWasteLog`, {
      headers: this.getHeaders(),
    });
  }

  getPrimaryWasteLogById(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/primaryWasteLog/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addPrimaryWasteLog(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/primaryWasteLog`, data, {
      headers: this.getHeaders(),
    });
  }

  deletePrimaryWasteLog(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/primaryWasteLog/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updatePrimaryWasteLog(id: string, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/primaryWasteLog/${id}`, data, {
      headers: this.getHeaders(),
    });
  }

  addManagerToPrimaryWasteLog(
    primaryWasteLogId: string,
    managerId: string
  ): Observable<any> {
    const data = { managerId };
    return this._http.post(
      `${this.apiUrl}/primaryWasteLog/${primaryWasteLogId}/managers`,
      data,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
