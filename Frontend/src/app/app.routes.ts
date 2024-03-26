import { HeaderComponent } from './modules/homeModule/header/header.component';
import { HomeComponent } from './modules/homeModule/home/home.component';
import { Routes } from '@angular/router';
import { UserListComponent } from './modules/systemAdminModule/user-list/user-list.component';
import { ListVehicleComponent } from './modules/landfillManagerModule/list-vehicle/list-vehicle.component';
import { LoginFormComponent } from './modules/loginModule/login-form/login-form.component';
import { CreateNewUserComponent } from './modules/systemAdminModule/create-new-user/create-new-user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'users', component: UserListComponent },
  { path: 'vehicles', component: ListVehicleComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'newuser', component: CreateNewUserComponent },
];
