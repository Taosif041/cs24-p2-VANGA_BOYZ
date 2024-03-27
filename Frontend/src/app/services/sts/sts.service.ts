import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StsService {
  private url = 'http://localhost:3000/sts';

  constructor(private _http: HttpClient) {}

  getStsList(): Observable<any> {
    return this._http.get(this.url);
  }

  addSts(data: any): Observable<any> {
    return this._http.post(this.url, data);
  }
  deleteSts(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/sts/${id}`);
  }
  updateSts(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/sts/${id}`, data);
  }
}
