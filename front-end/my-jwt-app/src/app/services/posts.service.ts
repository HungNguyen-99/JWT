import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly apiUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  getPosts() {
    return this.httpClient.get(`${this.apiUrl}/post`);
  }
}
