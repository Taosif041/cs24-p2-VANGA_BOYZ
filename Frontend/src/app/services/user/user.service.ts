import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentiction/authentiction.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  getUserList(): Observable<any> {
    const url = `${this.apiUrl}/user`; // Use apiUrl for base URL
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getUserById(id: string): Observable<any> {
    const url = `${this.apiUrl}/user/${id}`; // Use apiUrl for base URL
    return this.http.get(url, { headers: this.getHeaders() });
  }

  addUser(data: any): Observable<any> {
    const url = `${this.apiUrl}/user`; // Use apiUrl for base URL
    return this.http.post(url, data, { headers: this.getHeaders() });
  }

  deleteUser(id: string): Observable<any> {
    const url = `${this.apiUrl}/user/${id}`; // Use apiUrl for base URL
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  updateUser(id: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/user/${id}`; // Use apiUrl for base URL
    return this.http.put(url, data, { headers: this.getHeaders() });
  }
}
