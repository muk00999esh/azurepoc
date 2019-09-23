import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewCarrierComponent } from './Carrier/view-carrier/view-carrier.component';
import { CreateCarrierComponent } from './Carrier/create-carrier/create-carrier.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateClientComponent } from './Client/create-client/create-client.component';
import { ViewClientComponent } from './Client/view-client/view-client.component';
import { ModifyClientComponent } from './Client/modify-client/modify-client.component';
import { UpdateCarrierComponent } from './Carrier/update-carrier/update-carrier.component';
import { ModifyReformatComponent } from './reformat/modify-reformat/modify-reformat.component';
import { ViewReformatComponent } from './reformat/view-reformat/view-reformat.component';
import { CopyReformatComponent } from './reformat/copy-reformat/copy-reformat.component';
import { AddReformatComponent } from './reformat/add-reformat/add-reformat.component';
import { InputLayoutLogisticsComponent } from './reformat/input-layout-logistics/input-layout-logistics.component';
import { InputLayoutstructureComponent } from './reformat/input-layoutstructure/input-layoutstructure.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'createCarrier',component:CreateCarrierComponent},
  {path:'viewCarrier',component:ViewCarrierComponent},
  {path:'createClient',component:CreateClientComponent},
  {path:'viewClient',component:ViewClientComponent},
  {path:'modifyClient',component:ModifyClientComponent},
  {path:'modifyCarrier',component:UpdateCarrierComponent },
  {path:'addReformat',component:AddReformatComponent},
  {path:'modifyReformat',component:ModifyReformatComponent},
  {path:'viewReformat',component:ViewReformatComponent},
  {path:'copyReformat',component:CopyReformatComponent},
  {path: 'modifyReformatLayout',component: InputLayoutLogisticsComponent},
  {path: 'modRefLayoutStr',component: InputLayoutstructureComponent}
  


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  })
export class AppRoutingModule {

  
}