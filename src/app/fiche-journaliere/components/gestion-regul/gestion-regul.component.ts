import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Operation, Fiche, Encaissement } from "../../services/fiches.interface";
import { FicheService } from "../../services/fiches.service";



declare var $: any;

@Component({
  selector: 'app-gestion-regul',
  templateUrl: './gestion-regul.component.html',
  styleUrls: ['./gestion-regul.component.css']
})
export class GestionRegulComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {

  }
  myState = 'CB';
  modePaiements = [{ code: 'CB', nom: 'carte crédit' }, { code: 'ESP', nom: 'Espèce' }];

  private operation: Operation = new Operation();
  private impaye: boolean;
  private encaissement: Encaissement = new Encaissement;

  public fiche: Fiche;

  private error: string;

  constructor(public ficheService: FicheService
  ) {

  }

  ngOnInit() {


  }



  _keyPress(event: any) {
    const pattern = /[0-9\.\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  update() {
    this.error = "";
    //this.operation.idFiche = this.fiche.id;
    console.log(this.fiche.id);
    console.log(this.impaye);
    console.log(this.operation.nom);
    console.log(this.operation.prenom);
    console.log(this.encaissement.montant_encaisse);

    this.operation.id = 0;
    this.operation.fiche = this.fiche;
    if (this.impaye) {
      this.operation.type = "regulImpaye";
    } else {
      this.operation.type = "regul";
    }

    //this.encaissement.operation = this.operation;
    this.operation.encaissements = [this.encaissement];

    this.ficheService.saveOperation(this.operation);

  }
}

