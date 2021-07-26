import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class SocialmediaService {

  constructor(private http: HttpClient) { }
  url = 'https://sample-website-linkedin.herokuapp.com/home/contact/import';
  
  
  accesstoken(code: any) {
    return this.http.post(this.url + '/auth/linkedin/callback', code);
  }

}
