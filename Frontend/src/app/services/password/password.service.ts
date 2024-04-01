import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('authorization', token ? token : '');
  }

  initiateResetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/reset-password/initiate`, {
      email,
    });
  }

  confirmOTP(email: string, otp: string): Observable<any> {
    const data = { email, otp };
    return this.http.post<any>(
      `${this.apiUrl}/auth/reset-password/confirm`,
      data
    );
  }

  changePassword(data: any) {
    return this.http.post<any>(`${this.apiUrl}/auth/change-password`, data, {
      headers: this.getHeaders(),
    });
  }

  getTemToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('tempToken');
    }
    return null;
  }

  private getHeaders1(): HttpHeaders {
    const tempToken = this.getTemToken();
    return new HttpHeaders().set('Authorization', tempToken ? tempToken : '');
  }

  recoverPassword(password: string) {
    return this.http.post(
      `${this.apiUrl}/auth/reset-password/change-password`,
      { newPassword: password },
      { headers: this.getHeaders1() }
    );
  }
}
