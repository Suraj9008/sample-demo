import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class SocialmediaService {
  constructor(private http: HttpClient) { }
  url = 'https://angular-crm-backend.herokuapp.com/';
  
  accesstoken() {
    return this.http.get('https://angular-crm-backend.herokuapp.com/linkedin/auth/linkedin');
  }

}
