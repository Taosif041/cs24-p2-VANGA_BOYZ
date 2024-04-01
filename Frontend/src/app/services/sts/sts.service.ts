import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StsService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('authorization', token ? token : '');
  }

  getStsList(): Observable<any> {
    const url = `${this.apiUrl}/sts`; // Use apiUrl for base URL
    return this.http.get(url, {
      headers: this.getHeaders(),
    });
  }

  getStsById(id: string): Observable<any> {
    const url = `${this.apiUrl}/sts/${id}`; // Use apiUrl for base URL
    return this.http.get(url, {
      headers: this.getHeaders(),
    });
  }

  addSts(data: any): Observable<any> {
    const url = `${this.apiUrl}/sts`; // Use apiUrl for base URL
    return this.http.post(url, data, {
      headers: this.getHeaders(),
    });
  }

  deleteSts(id: string): Observable<any> {
    const url = `${this.apiUrl}/sts/${id}`; // Use apiUrl for base URL
    return this.http.delete(url, {
      headers: this.getHeaders(),
    });
  }

  updateSts(id: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/sts/${id}`; // Use apiUrl for base URL
    return this.http.put(url, data, {
      headers: this.getHeaders(),
    });
  }

  addManagerToSts(stsId: string, userId: string): Observable<any> {
    const url = `${this.apiUrl}/sts/${stsId}/managers`; // Use apiUrl for base URL
    const data = { userId };
    return this.http.post(url, data, {
      headers: this.getHeaders(),
    });
  }
}
