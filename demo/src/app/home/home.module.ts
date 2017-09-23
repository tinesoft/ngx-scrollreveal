import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { ClipboardModule } from 'ngx-clipboard';
import { NgsRevealModule } from 'ng-scrollreveal';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule,
        NgbAccordionModule.forRoot(),
        NgsRevealModule.forRoot(),
        ColorPickerModule,
        ClipboardModule],
    declarations: [HomeComponent],
})
export class HomeModule { }
