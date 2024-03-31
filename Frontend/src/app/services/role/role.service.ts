import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  updateUserRoles(userId: string, roles: string[]): Observable<any> {
    const url = `${this.baseUrl}/${userId}/roles`;
    return this.http.post(url, roles, {
      headers: this.getHeaders(),
    });
  }
}
