import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { routing } from './app.routing';
import { PopupModule } from 'ng2-opd-popup';
import { DataTableModule } from "angular2-datatable";
import { TooltipModule } from "ngx-tooltip";
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { DatePickerModule } from 'angular-io-datepicker';

import { AuthGuard } from './guards/auth.guard';
import { ApiService } from './services/api.service';
import { AuthenticationService } from './services/authentication.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './common/header/header.component';
import { SidemenuComponent } from './common/sidemenu/sidemenu.component';
import { SemesteryComponent } from './semestery/semestery.component';
import { RegistrationComponent } from './registration/registration.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { MessinchargeComponent } from './messincharge/messincharge.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidemenuComponent,
    SemesteryComponent,
    RegistrationComponent,
    ComplaintsComponent,
    MessinchargeComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    DataTableModule,
    TooltipModule,
    ReactiveFormsModule,
    ToasterModule,
    DatePickerModule,
    PopupModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    ApiService,
    ToasterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
