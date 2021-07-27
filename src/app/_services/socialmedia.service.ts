import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class SocialmediaService {
  constructor(private http: HttpClient) { }

  accesstoken() {
    let httpheader = new HttpHeaders().set("Access-Control-Allow-Origin", "*")

    return this.http.get('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86bb74gj1gubjr&redirect_uri=https://sample-website-linkedin.herokuapp.com&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social',{headers:httpheader});
  }
}
