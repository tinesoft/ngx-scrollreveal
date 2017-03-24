import { NgsRevealConfig } from 'ng-scrollreveal';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  col1Config: NgsRevealConfig;

  constructor(private titleService: Title) {
    this.col1Config = {reset:true};
   }

  ngOnInit() {
    this.titleService.setTitle('Home | ng-scrollreveal');
  }

}
