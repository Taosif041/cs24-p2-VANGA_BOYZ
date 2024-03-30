import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
  useClass: AuthenticationService,
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/auth/login'; // Use HTTPS in production

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password }) // Ensure the endpoint is correct
      .pipe(
        map((response) => {
          // Store token securely or consider other storage mechanisms
          if (response && response.token) {
            localStorage.setItem('token', response.token); // Consider security implications
          }
          return response;
        }),
        catchError((error) => {
          // Customize or log error as needed
          return throwError(error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token'); // Ensure to clear any other auth-related data
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }
}
