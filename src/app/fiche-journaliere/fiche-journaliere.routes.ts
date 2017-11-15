import { Routes } from '@angular/router';

import { FicheJournaliereComponent } from './fiche-journaliere.component';
import { GestionAbonnementComponent } from './components/gestion-abonnement/gestion-abonnement.component';

export const ROUTES: Routes = [
    { path: 'fiche/abo/:id', redirectTo: 'fiche/abonnement/:id' },
    { path: 'fiche/abo', redirectTo: 'fiche/abonnement' },
    { path: 'fiche/abonnement/:id', component: GestionAbonnementComponent },
    { path: 'fiche/abonnement', component: GestionAbonnementComponent },
];
