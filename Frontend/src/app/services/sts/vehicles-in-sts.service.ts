import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehiclesInStsService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('authorization', token ? token : '');
  }

  getVehicles(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/sts/${id}/vehicles`, {
      headers: this.getHeaders(),
    });
  }

  // Add other methods if needed
}
