import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private url = 'http://localhost:3000/vehicles';

  constructor(
    private _http: HttpClient,
    private authService: AuthenticationService
  ) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  getVehiclesList(): Observable<any> {
    return this._http.get(this.url, {
      headers: this.getHeaders(),
    });
  }

  getVehicleById(id: string): Observable<any> {
    return this._http.get(`http://localhost:3000/vehicle/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addVehicles(data: any): Observable<any> {
    return this._http.post(this.url, data, {
      headers: this.getHeaders(),
    });
  }
  deleteVehicles(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/vehicles/${id}`, {
      headers: this.getHeaders(),
    });
  }
  updateVehicles(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/vehicles/${id}`, data, {
      headers: this.getHeaders(),
    });
  }

  private base = 'http://localhost:3000/sts';

  addVehicleToSts(stsId: string, vehicleId: string): Observable<any> {
    const data = { vehicleId };
    return this._http.post(`${this.base}/${stsId}/vehicles`, data, {
      headers: this.getHeaders(),
    });
  }
}
