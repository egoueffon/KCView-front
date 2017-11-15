import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { MaterialModule } from '@angular/material';
import { MatDialogModule } from "@angular/material";

import {RouterModule} from "@angular/router";

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthenticationService} from "./services/authentication.service";
import { NavbarComponent } from './navbar/navbar.component';

import {ROUTES} from "./app.routes";


import { SidebarModule } from './sidebar/sidebar.module';


import { PortailComponent } from './portail/portail.component';

import { FicheJournaliereModule } from './fiche-journaliere/fiche-journaliere.module';
import { AccueilModule } from './accueil/accueil.module';


import { KcLinkComponent } from './kc-link/kc-link.component';
import { SuiviComptantModule } from "app/suivi-comptant/suivi-comptant.module";



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        NavbarComponent,
        PortailComponent,
        KcLinkComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        //MaterialModule,
        MatDialogModule,
        FormsModule,
        HttpModule,
        FicheJournaliereModule,
        SuiviComptantModule,
        AccueilModule,
        SidebarModule,
        RouterModule.forRoot(ROUTES),
        ModalModule.forRoot(),
        BsDropdownModule.forRoot()
        
    ],
    providers: [
        {provide: AuthenticationService, useClass: AuthenticationService},
        {provide: LOCALE_ID, useValue: 'fr-FR'}
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule { }
