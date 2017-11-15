import {Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AccueilComponent} from './accueil/accueil.component';
import {FicheJournaliereComponent} from './fiche-journaliere/fiche-journaliere.component';
import { KcLinkComponent } from "app/kc-link/kc-link.component";
import { GestionAbonnementComponent } from "app/fiche-journaliere/components/gestion-abonnement/gestion-abonnement.component";
import { SuiviComptantComponent } from "app/suivi-comptant/suivi-comptant.component";


export const ROUTES: Routes = [
    { path: '',  loadChildren: './accueil/accueil.module#AccueilModule' },
    { path: 'accueil', loadChildren: './accueil/accueil.module#AccueilModule' },
    { path: 'fiche', component: FicheJournaliereComponent },
    { path: 'suiviComptant', component:  SuiviComptantComponent},
    { path: 'kcLink/:site', component: KcLinkComponent },

];

 