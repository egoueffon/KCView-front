import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SuiviComptantComponent, AJoutRelanceDialog, ListRelanceDialog, ImportDialog } from './suivi-comptant.component';
import { MatTableModule } from "@angular/material/table";
import { SuiviComptantService } from "app/suivi-comptant/suivi-comptant.service";
import {MatFormFieldModule,MatSortModule, MatFormFieldControl, MatInputModule, MatSelectModule} from '@angular/material';
import {MatDialogModule, MatButtonModule} from '@angular/material';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {MatTooltipModule} from '@angular/material';
import {MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [SuiviComptantComponent,AJoutRelanceDialog, ListRelanceDialog, ImportDialog],
  entryComponents: [AJoutRelanceDialog, ListRelanceDialog, ImportDialog],
  providers: [
        {provide: SuiviComptantService, useClass: SuiviComptantService}
    ]
})
export class SuiviComptantModule { }
