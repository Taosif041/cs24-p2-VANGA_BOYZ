import { Component } from '@angular/core';
import {StyleClassModule} from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ButtonModule } from 'primeng/button';
import {  InputTextModule} from 'primeng/inputtext';

import { ChipModule } from 'primeng/chip';
import { InputTextareaModule } from 'primeng/inputtextarea';


import { SplitButtonModule } from 'primeng/splitbutton';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        StyleClassModule, 
        CommonModule, 
        HeaderComponent, 
        ButtonModule, 
        InputTextModule,
        ChipModule,
        InputTextareaModule,
        SplitButtonModule
    ]
})
export class HomeComponent {
    redirectToURL(url: string): void {
        window.open(url, '_blank');
      }
    

}
