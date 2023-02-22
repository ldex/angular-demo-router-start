import { config } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = config.adminApiUrl;
  private storageKey: string = config.storageTokenKey;

  getProfile(): Observable<any> {

    const authToken = localStorage.getItem(this.storageKey);
    const headers = {'Authorization': `Bearer ${authToken}` };

      return this
              .http
              .get<any>(this.baseUrl, { headers })
              .pipe(
                map(response => response.profile)
              );;
  }

}
