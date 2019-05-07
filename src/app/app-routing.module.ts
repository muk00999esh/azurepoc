import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewCarrierComponent } from './Carrier/view-carrier/view-carrier.component';
import { CreateCarrierComponent } from './Carrier/create-carrier/create-carrier.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateClientComponent } from './Client/create-client/create-client.component';
import { ViewClientComponent } from './Client/view-client/view-client.component';
import { ModifyClientComponent } from './Client/modify-client/modify-client.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'createCarrier',component:CreateCarrierComponent},
  {path:'viewCarrier',component:ViewCarrierComponent},
  {path:'createClient',component:CreateClientComponent},
  {path:'viewClient',component:ViewClientComponent},
  {path:'modifyClient',component:ModifyClientComponent}


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  })
export class AppRoutingModule {

  
}