import { ChangeInfoComponent } from './modules/authenticatedUserModule/change-info/change-info.component';
import { HomeComponent } from './modules/homeModule/home/home.component';
import { Routes } from '@angular/router';

import { LoginFormComponent } from './modules/loginModule/login-form/login-form.component';
import { VehiclesComponent } from './modules/systemAdminModule/Vehicles/vehicles/vehicles.component';
import { CreateNewUserComponent } from './modules/systemAdminModule/Users/create-new-user/create-new-user.component';
import { AddSTSComponent } from './modules/systemAdminModule/sts/add-sts/add-sts.component';
import { FogetPasswordComponent } from './modules/loginModule/foget-password/foget-password.component';
import { ProvideOTPComponent } from './modules/loginModule/provide-otp/provide-otp.component';
import { ChangePasswordComponent } from './modules/loginModule/change-password/change-password.component';
import { LandfillComponent } from './modules/systemAdminModule/landfill/landfill/landfill.component';
import { DashboardComponent } from './modules/authenticatedUserModule/dashboard/dashboard.component';
import { RecoverPasswordComponent } from './modules/loginModule/recover-password/recover-password.component';
import { UnassignedComponent } from './modules/systemAdminModule/Users/unassigned/unassigned.component';
import { VehicleTransferComponent } from './modules/stsManagerModule/vehicle-transfer/vehicle-transfer.component';
import { VehicleTransferDataComponent } from './modules/stsManagerModule/vehicle-transfer-data/vehicle-transfer-data.component';
import { WastelogsComponent } from './modules/displayModule/wastelogs/wastelogs.component';
import { LandfillVehiclesComponent } from './modules/displayModule/landfill-vehicles/landfill-vehicles.component';
import { StsVehiclesComponent } from './modules/displayModule/sts-vehicles/sts-vehicles.component';
import { PageNotFoundComponent } from './modules/homeModule/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'page', component: PageNotFoundComponent },

  { path: 'login', component: LoginFormComponent },
  { path: 'forgetpassword', component: FogetPasswordComponent },
  { path: 'provideotp', component: ProvideOTPComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'recoverpassword', component: RecoverPasswordComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'changeinfo', component: ChangeInfoComponent },

  { path: 'vehicles', component: VehiclesComponent },

  { path: 'newuser', component: CreateNewUserComponent },
  { path: 'addsts', component: AddSTSComponent },
  { path: 'landfill', component: LandfillComponent },

  { path: 'unassigned', component: UnassignedComponent },
  { path: 'transfer', component: VehicleTransferComponent },
  { path: 'transferdata', component: VehicleTransferDataComponent },

  { path: 'wastelogs', component: WastelogsComponent },
  { path: 'stsvehicle', component: StsVehiclesComponent },
  { path: 'landfillvehicle', component: LandfillVehiclesComponent },
];
