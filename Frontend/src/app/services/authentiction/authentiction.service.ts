import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // private apiUrl = 'http://localhost:3000/auth/login'; // Use HTTPS in production
  apiUrl = environment.apiUrl;
  user$: any;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, { email, password }) // Ensure the endpoint is correct
      .pipe(
        map((response) => {
          // Store token securely or consider other storage mechanisms
          if (response && response.token) {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('token', response.token); // Consider security implications
            }
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
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token'); // Ensure to clear any other auth-related data
    }
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getAuthToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
  public getUser(): any {
    const token = this.getAuthToken();
    if (token) {
      // Decode the token to get user data
      const decoded = jwtDecode(token);
      console.log(decoded);
      return decoded;
    } else {
      // Token is null, handle this case accordingly
      return null;
    }
  }
}
