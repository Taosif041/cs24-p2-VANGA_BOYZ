import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandfillService {
  private url = 'http://localhost:3000/landfill';

  constructor(private _http: HttpClient) {}

  getLandfillList(): Observable<any> {
    return this._http.get(this.url);
  }

  getLandfillById(id: string): Observable<any> {
    return this._http.get(`http://localhost:3000/landfill/${id}`);
  }

  addLandfill(data: any): Observable<any> {
    return this._http.post(this.url, data);
  }
  deleteLandfill(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/landfill/${id}`);
  }
  updateLandfill(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/landfill/${id}`, data);
  }
}
