import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = 'http://localhost:3000/auth/reset-password/initiate';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  initiateResetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email });
  }

  private resetUrl = 'http://localhost:3000/auth/reset-password';

  confirmOTP(email: string, otp: string): Observable<any> {
    const data = { email, otp };
    return this.http.post<any>(`${this.resetUrl}/confirm`, data);
  }

  changePassword(data: any) {
    // Make a POST request to your server to change the password
    return this.http.post<any>(
      'http://localhost:3000/auth/change-password',
      data,
      { headers: this.getHeaders() }
    );
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
      'http://localhost:3000/auth/reset-password/change-password',
      { newPassword: password }, // Wrapping password in an object
      { headers: this.getHeaders1() }
    );
  }
}
