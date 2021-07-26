import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  str:String=""
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url)
    this.str = this.router.url;
    this.str=this.str.substr(21)
    console.log(this.str);
  }

  
  
}
