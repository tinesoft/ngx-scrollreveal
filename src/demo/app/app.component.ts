import { NgsRevealConfig } from './shared/ngs-reveal-config';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  col1Config: NgsRevealConfig = {reset:true};
}
