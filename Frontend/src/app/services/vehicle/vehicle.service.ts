import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private url = 'http://localhost:3000/vehicles';

  constructor(private _http: HttpClient) {}

  getVehiclesList(): Observable<any> {
    return this._http.get(this.url);
  }

  getVehicleById(id: string): Observable<any> {
    return this._http.get(`http://localhost:3000/vehicle/${id}`);
  }

  addVehicles(data: any): Observable<any> {
    return this._http.post(this.url, data);
  }
  deleteVehicles(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/vehicles/${id}`);
  }
  updateVehicles(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/vehicles/${id}`, data);
  }
}
