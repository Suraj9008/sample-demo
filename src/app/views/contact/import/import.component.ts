import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SocialmediaService } from '../../../_services/socialmedia.service'
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  str: String = ""
  constructor(private router: Router, private socialmedia: SocialmediaService) { }

  ngOnInit(): void {
    this.str = this.router.url;
    this.str = this.str.substr(21)
    console.log(this.str);
  }

  linkedIn() {
    this.socialmedia.accesstoken().subscribe(data => {
      console.log(data);
    });
  }

}