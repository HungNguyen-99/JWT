import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private readonly apiUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  getSetting() {
    return this.httpClient.get(`${this.apiUrl}/setting`, {
      withCredentials: true,
    });
  }
}
