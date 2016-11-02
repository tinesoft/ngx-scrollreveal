import { Component } from '@angular/core';
import { NgsRevealConfig } from './../../lib/ngs-reveal-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  col1Config: NgsRevealConfig = { reset: true };
}
