import { HeaderComponent } from './modules/homeModule/header/header.component';
import { HomeComponent } from './modules/homeModule/home/home.component';
import { Routes } from '@angular/router';
import { ListVehicleComponent } from './modules/landfillManagerModule/list-vehicle/list-vehicle.component';
import { LoginFormComponent } from './modules/loginModule/login-form/login-form.component';
import { VehiclesComponent } from './modules/systemAdminModule/Vehicles/vehicles/vehicles.component';
import { CreateNewUserComponent } from './modules/systemAdminModule/Users/create-new-user/create-new-user.component';
import { AddSTSComponent } from './modules/systemAdminModule/sts/add-sts/add-sts.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'newuser', component: CreateNewUserComponent },
  { path: 'addsts', component: AddSTSComponent },
];
