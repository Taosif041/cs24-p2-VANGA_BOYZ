import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WastelogService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      authorization: token ? token : '',
    });
    return headers;
  }

  transferWasteFromSTSToLandfill(
    vehicleId: string,
    stsId: string,
    landfillId: string,
    weightOfWaste: number,
    distance: number
  ): Observable<any> {
    const url = `${this.apiUrl}/transfer-waste/departure/sts-to-landfill`;
    const wasteData = {
      vehicleId,
      stsId,
      landfillId,
      weightOfWaste,
      distance,
    };
    return this.http.post(url, wasteData, { headers: this.getHeaders() });
  }

  getWasteLogs(): Observable<any> {
    const url = `${this.apiUrl}/transfer-waste/waste-logs`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  stsReceiveFunction(logId: string): Observable<any> {
    const url = `${this.apiUrl}/transfer-waste/departure/landfill-to-sts`;
    const body = { logId };
    return this.http.post(url, body, { headers: this.getHeaders() });
  }

  landfillReceiveFunction(logId: string): Observable<any> {
    const url = `${this.apiUrl}/transfer-waste/arrival/landfill`;
    const body = { logId };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, body, { headers });
  }

  departVehicle(logId: string): Observable<any> {
    const url = `${this.apiUrl}/transfer-waste/departure/landfill-to-sts`;
    const body = { logId };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, body, { headers });
  }
}
