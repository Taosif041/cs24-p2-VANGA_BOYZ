import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = 'http://localhost:3000/auth/reset-password/initiate';

  constructor(private http: HttpClient) {}

  initiateResetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email });
  }

  private resetUrl = 'http://localhost:3000/auth/reset-password';

  confirmOTP(email: string, otp: string): Observable<any> {
    const data = { email, otp };
    return this.http.post<any>(`${this.resetUrl}/confirm`, data);
  }

  changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.http.post('http://localhost:3000/auth/change-password', data);
  }
}
