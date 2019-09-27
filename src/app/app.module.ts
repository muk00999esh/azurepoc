import { CreateCarrierService } from './Services/create-carrier.service';
import { ViewCarrierService } from './Services/view-carrier.service';
import { ClientServiceService } from './Services/client-service.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatMenuModule,MatDialogModule, MatToolbarModule,MatRadioModule, MatTableModule, MatTabsModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ViewCarrierComponent } from './Carrier/view-carrier/view-carrier.component';
import { CreateCarrierComponent } from './Carrier/create-carrier/create-carrier.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateClientComponent, ClientPopup } from './Client/create-client/create-client.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewClientComponent } from './Client/view-client/view-client.component';
import { ModifyClientComponent ,UpdatePopup} from './Client/modify-client/modify-client.component';
import { UpdateCarrierComponent } from './Carrier/update-carrier/update-carrier.component';
import { UpdateCarrierService } from './Services/update-carrier.service';
import { ModifyReformatComponent } from './reformat/modify-reformat/modify-reformat.component';
import { ViewReformatComponent } from './reformat/view-reformat/view-reformat.component';
import { CopyReformatComponent } from './reformat/copy-reformat/copy-reformat.component';
import { AddReformatComponent } from './reformat/add-reformat/add-reformat.component';
import { OutputFilterPipe } from './output-filter.pipe';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OnSavePopupComponent } from './on-save-popup/on-save-popup.component';
import { InputLayoutLogisticsComponent } from './reformat/input-layout-logistics/input-layout-logistics.component';
import { InputLayoutstructureComponent } from './reformat/input-layoutstructure/input-layoutstructure.component';
import { StatusDialogComponent } from './Status-dialog/status-dialog.component';
import { CFMappingComponent } from './CFMapping/cfmapping.component';






@NgModule({
  declarations: [
    AppComponent,
    ViewCarrierComponent,
    CreateCarrierComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    UpdateCarrierComponent,
    CreateClientComponent,
    ClientPopup,
    UpdatePopup,
    ViewClientComponent,
    ModifyClientComponent,
    StatusDialogComponent,
    ModifyReformatComponent,
    ViewReformatComponent,
    CopyReformatComponent,
    AddReformatComponent,
    OnSavePopupComponent,
    InputLayoutLogisticsComponent,
    InputLayoutstructureComponent,
    CFMappingComponent,
    OutputFilterPipe
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    HttpModule,
    HttpClientModule,
    MatToolbarModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents:[ClientPopup,UpdatePopup,StatusDialogComponent,OnSavePopupComponent],
  providers: [
    LoginComponent,
    NavbarComponent,
    ViewCarrierService,
    CreateCarrierService,
    UpdateCarrierService,
    ClientServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
