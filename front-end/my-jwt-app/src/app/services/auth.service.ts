import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment.development';

@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrl;

  private _httpClient = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/auth/login`, {
      username,
      password,
    });
  }

  refreshToken(): Observable<any> {
    return this._httpClient.post(
      `${this.apiUrl}/auth/token`,
      {},
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this._httpClient.post(
      `${this.apiUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }
}
