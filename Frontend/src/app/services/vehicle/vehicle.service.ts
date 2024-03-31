import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
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

  getVehiclesList(): Observable<any> {
    const url = `${this.apiUrl}/vehicles`; // Use apiUrl for base URL
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getVehicleById(id: string): Observable<any> {
    const url = `${this.apiUrl}/vehicles/${id}`; // Use apiUrl for base URL
    return this.http.get(url, { headers: this.getHeaders() });
  }

  addVehicle(data: any): Observable<any> {
    const url = `${this.apiUrl}/vehicles`; // Use apiUrl for base URL
    return this.http.post(url, data, { headers: this.getHeaders() });
  }

  deleteVehicle(id: string): Observable<any> {
    const url = `${this.apiUrl}/vehicles/${id}`; // Use apiUrl for base URL
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  updateVehicle(id: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/vehicles/${id}`; // Use apiUrl for base URL
    return this.http.put(url, data, { headers: this.getHeaders() });
  }

  private stsUrl = `${this.apiUrl}/sts`;

  addVehicleToSts(stsId: string, vehicleId: string): Observable<any> {
    const url = `${this.stsUrl}/${stsId}/vehicles`; // Use apiUrl for base URL
    const data = { vehicleId };
    return this.http.post(url, data, { headers: this.getHeaders() });
  }
}
