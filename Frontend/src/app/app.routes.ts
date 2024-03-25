import { HeaderComponent } from './modules/homeModule/header/header.component';
import { HomeComponent } from './modules/homeModule/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'header',
        component: HeaderComponent
    },
    
    
];
