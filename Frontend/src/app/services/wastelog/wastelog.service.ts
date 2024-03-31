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

    // Create headers in JSON format
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
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

    // Format waste data
    const wasteData = {
      vehicleId,
      stsId,
      landfillId,
      weightOfWaste,
      distance,
    };

    return this.http.post(url, wasteData, { headers: this.getHeaders() });
  }
}
