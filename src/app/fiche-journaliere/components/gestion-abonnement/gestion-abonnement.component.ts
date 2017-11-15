import { Component, OnInit } from '@angular/core';
import { Abonnement } from "app/fiche-journaliere/services/fiches.interface";
import { AbonneTabComponent } from "app/fiche-journaliere/gestion-abonnement/abonne-tab/abonne-tab.component";
import { ClubService } from "app/services/club.service";
import { Club } from "app/services/users.interface";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
    selector: 'app-gestion-abonnement',
    templateUrl: './gestion-abonnement.component.html',
    styleUrls: ['./gestion-abonnement.component.css']
})

export class GestionAbonnementComponent implements OnInit {
    aboId: string;
    abonnement:Abonnement;
    label: string = 'Ajout';
    club: Club = new Club();


    constructor(    private route: ActivatedRoute,
    private router: Router,
    public clubService: ClubService) { 

        //alert(clubService.clubid);
    }

    //private operation: Operation = new Operation();

   ngOnInit() {

    //recupération du parametre
    this.aboId = this.route.snapshot.paramMap.get('id');
   
if(this.aboId){
    //alert('ok')
    this.label = "Modification"
}else{
    this.abonnement= new Abonnement();
}

     this.clubService.getClub(8).then(club => {
            //console.log("Users2 =>", clubSynthese);
            this.club = club;
        });

       
  }
}
