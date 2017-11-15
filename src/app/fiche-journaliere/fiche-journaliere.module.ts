import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { HttpModule } from '@angular/http';
import {MatTableModule } from '@angular/material';



import { FicheJournaliereComponent } from '../fiche-journaliere/fiche-journaliere.component';
import { FicheHeaderComponent } from '../fiche-journaliere/components/fiche-header/fiche-header.component';
import { GestionAbonnementComponent } from '../fiche-journaliere/components/gestion-abonnement/gestion-abonnement.component';
import { GestionRegulComponent } from '../fiche-journaliere/components/gestion-regul/gestion-regul.component';
import { FicheService } from "../fiche-journaliere/services/fiches.service";
import { UsersOnlinePipe } from "../fiche-journaliere/users-table/users-online.pipe";
import { UsersTableComponent } from "../fiche-journaliere/users-table/users-table.component";
import { MyDatePickerModule } from "mydatepicker";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { FormuleItemRendererComponent } from './formule-item-renderer/formule-item-renderer.component';
import { FormulePickerComponent } from './formule-picker/formule-picker.component';
import { AbonneTabComponent } from './gestion-abonnement/abonne-tab/abonne-tab.component';
import {MatCheckboxModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material';
import {MatStepperModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';

import { RouterModule } from '@angular/router';
import { ROUTES } from "./fiche-journaliere.routes";


import {InputSwitchModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
 
export { };

@NgModule({
  imports: [
    CommonModule,
    MyDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatCheckboxModule,
     BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatStepperModule,
        MatIconModule,
        MatButtonToggleModule,
        MatButtonModule,
        InputSwitchModule,
        ButtonModule,
        DropdownModule,
    HttpModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    
  ],
  declarations: [
    FicheJournaliereComponent,
    FicheHeaderComponent,
    GestionRegulComponent,
    UsersTableComponent,
    UsersOnlinePipe,
    GestionAbonnementComponent,
    FormuleItemRendererComponent,
    FormulePickerComponent,
    AbonneTabComponent,
  ],providers: [
        {provide: FicheService, useClass: FicheService}
    ],
})
export class FicheJournaliereModule { }
