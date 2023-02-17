import { config, environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = config.adminApiUrl;
  private storageKey: string = config.storageTokenKey;

  getProfile(): Observable<any> {

    const authToken = localStorage.getItem(this.storageKey);
    const headers = {'Authorization': `Bearer ${authToken}` };

      // Real server call here!
      return this
              .http
              .get<any>(this.baseUrl, { headers })
              .pipe(
                map(response => response.profile)
              );;
  }

}
