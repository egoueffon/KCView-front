import { Component, OnInit } from '@angular/core';

//import {MdDialog} from "@angular/material";

import {AuthenticationService} from "../services/authentication.service";
import { SyntheseFiche, Fiche } from "app/fiche-journaliere/services/fiches.interface";
import { FicheService } from "app/fiche-journaliere/services/fiches.service";

@Component({
  selector: 'app-fiche-journaliere',
  templateUrl: './fiche-journaliere.component.html',
  styleUrls: ['./fiche-journaliere.component.css']
})
export class FicheJournaliereComponent implements OnInit {

  public syntheseFiche : SyntheseFiche = new SyntheseFiche;
  public fiche : Fiche;

  constructor(public ficheService: FicheService, public authService: AuthenticationService ) { }

  ngOnInit() {
    this.sendGetFiche(new Date);
  }

  private onClickAbonnement() {
      
  }

  sendGetFiche(mydate: Date){
      this.ficheService.getSyntheseFiche(this.authService.user.club.id, mydate).then(syntheseFiche => {
            console.log("Fiche récupéré");
            console.log(syntheseFiche.fiche.id);
            
            this.syntheseFiche = syntheseFiche;
            this.fiche = syntheseFiche.fiche;
       });  
  }

    handleDateUpdated(date) {
    // Handle the event
    console.log("date recu!!!!!!!")
    this.sendGetFiche(date);
  }

}
