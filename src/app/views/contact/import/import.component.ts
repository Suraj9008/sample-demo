import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialmediaService } from '../../../_services/socialmedia.service'
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  str: any;
  outlook = false;
  linkedin = false;
  facebook = false;
  sale = false;
  paramsObject: any;
  constructor(private router: ActivatedRoute, private socialmedia: SocialmediaService) { }

  ngOnInit(): void {
    this.router.queryParamMap
      .subscribe((params) => {
        this.paramsObject = { ...params.keys, ...params };
        console.log(this.paramsObject);
      }
      );
      this.str = this.paramsObject.params.code
      
      if(this.str!=undefined){
        this.linkedIns();
      }
  }

  linkedIns() {
    this.linkedin = true
    console.log(this.str,'from linkedin');
    this.socialmedia.LinkedinToken(this.str).subscribe((data: any) => {
      console.log(data);
      this.linkedin = false
    }, error => {
      console.log(error);
      this.linkedin = false
    });
  }

  facebooks() {
    this.facebook = true
    this.socialmedia.facebookToken().subscribe((data: any) => {
      this.str = data.toString();
      window.location.href = this.str.toString();
      this.facebook = false
    }, error => {
      console.log(error);
      this.facebook = false
    })
  }

  outlooks() {
    this.outlook = true
    this.socialmedia.outlookToken().subscribe((data: any) => {
      this.str = data.toString();
      window.location.href = this.str.toString();
      this.outlook = false
    }, error => {
      console.log(error);
      this.outlook = false
    })

  }

  sales() {
    this.sale = true
    this.socialmedia.salesToken().subscribe((data: any) => {
      this.str = data.toString();
      console.log(this.str);
      window.location.href = this.str.toString();
      this.sale = false
    }, error => {
      console.log(error);
      this.sale = false
    })
  }
}