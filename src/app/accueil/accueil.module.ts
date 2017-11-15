import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SyntheseAccueilComponent } from '../accueil/components/synthese-accueil/synthese-accueil.component';
import { AccueilComponent } from "app/accueil/accueil.component";
import { ROUTES } from "app/accueil/accueil.routes";
import { UsersService } from "app/services/users.service";
import { ClubService } from "app/services/club.service";

import { KnobModule } from "angular2-knob";

import {ChartModule} from 'primeng/primeng';

import {MatButtonToggleModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import { CardPrevisionAbosComponent } from './components/card-prevision-abos/card-prevision-abos.component';
import { CardPrevisionCAComponent } from './components/card-prevision-ca/card-prevision-ca.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ChartModule,
    KnobModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  declarations: [
    SyntheseAccueilComponent,
    AccueilComponent,
    CardPrevisionAbosComponent,
    CardPrevisionCAComponent
  ],    providers: [
        {provide: UsersService, useClass: UsersService},
        {provide: ClubService, useClass: ClubService},
        {provide: DatePipe, useClass: DatePipe}
    ],
})
export class AccueilModule { }
