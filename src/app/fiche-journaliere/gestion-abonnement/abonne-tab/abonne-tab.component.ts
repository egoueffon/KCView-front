import { Component, NgModule, OnInit, AfterViewInit, AfterViewChecked, Input } from '@angular/core';
import { Abonnement, Encaissement, Formule, FormuleClub } from "app/fiche-journaliere/services/fiches.interface";
import { AbstractControl, FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Club } from "app/services/users.interface";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatButtonToggleChange } from "@angular/material/material";
import { FicheService } from "app/fiche-journaliere/services/fiches.service";

@Component({
  selector: 'app-abonne-tab',
  templateUrl: './abonne-tab.component.html',
  styleUrls: ['./abonne-tab.component.css']
})
export class AbonneTabComponent implements OnInit {

  montantOffre: number;


  isLinear = false;
  firstFormGroup: FormGroup;
  formuleFormGroup: FormGroup;
  paiementFormGroup: FormGroup;


  formuleSelected: FormuleClub;
  packSelected = 0;
  dureeSelected;
  nbMoisOffertSelected = 0;
  isComptant: boolean = false;
  isDiferre: boolean = false;
  encaissements: Encaissement[] = [new Encaissement()]


  montantAbo: number = 0;
  montantOffrePack: number = 0;
  montantOffreMois: number = 0;
  montantOffreSupp: number = 0;
  montantAPayer: number = 0;
  montantEncaisser: number = 0;


  sources = [
    { value: 'BAO', viewValue: 'BAO' },
    { value: 'Internet', viewValue: 'Internet' },
    { value: 'passage', viewValue: 'passage' },
    { value: 'Parrainage', viewValue: 'Parrainage' }
  ];

  payments = [
    { value: 'CB', label: 'CB' },
    { value: 'ESP', label: 'ESP' },
    { value: 'CHQ', label: 'CHQ' },
    { value: 'PREL', label: 'PREL' }
  ];

  @Input() operation: Abonnement = new Abonnement()
  @Input() club: Club

  constructor(public fb: FormBuilder, public ficheService: FicheService) {

    this.firstFormGroup = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      source: ['', Validators.required],
      sexe: ['', Validators.required]
    });

    this.formuleFormGroup = this.fb.group({
      comptant: '',
      offreSupp: '',
      montant: '',
      nbMoisOffert: '',
      duree: '',
      starter: '',
      diferreControl: ''

    });


    this.paiementFormGroup = this.fb.group({});



  }

  ngOnInit() {

    this.firstFormGroup.patchValue({
      first: this.operation.nom,
      sexe: this.operation.sexe
    })
  }

  comptantChangeEvent(event) {
    this.isComptant = event.checked;
    this.operation.comptant = event.checked;

    this.formuleFormGroup.patchValue({
      duree: this.dureeSelected,
    });

    this.montantAbo = this.calculerMontantAbonnement();
    this.montantAPayer = this.calculerMontantAPayer();

  }

  diferreChangeEvent(event: MatSlideToggleChange) {
    this.isDiferre = event.checked;
    this.montantAPayer = this.calculerMontantAPayer();
  }

  formuleChangeEvent(event: MatButtonToggleChange) {

    this.formuleSelected = event.value;

    this.dureeSelected = this.formuleSelected.formule.durees[this.formuleSelected.formule.durees.length - 1].duree;

    if (!this.packSelected) {
      this.packSelected = this.formuleSelected.pack;
    }



    this.formuleFormGroup.patchValue({
      duree: this.dureeSelected,
      starter: this.packSelected,
      nbMoisOffert: this.nbMoisOffertSelected,
      diferreControl: this.isDiferre
    });

    if (this.formuleSelected.pack == 0) {
      this.montantAbo = this.formuleFormGroup.get("montant").value;
      this.montantOffre = 0;
      this.montantAPayer = this.formuleFormGroup.get("montant").value;
    } else {
      this.montantAbo = this.calculerMontantAbonnement();
      this.montantOffre = this.calculerMontantOffre();
      this.montantAPayer = this.calculerMontantAPayer();

    }

  }

  packChangeEvent(event: MatButtonToggleChange) {
    this.packSelected = event.value;
    this.montantOffrePack = this.formuleSelected.pack - event.value;
    this.montantOffre = this.calculerMontantOffre();
    this.montantAPayer = this.calculerMontantAPayer();
  }

  dureeChangeEvent(event: MatButtonToggleChange) {
    this.dureeSelected = event.value;
    this.montantAbo = this.calculerMontantAbonnement();
    this.montantAPayer = this.calculerMontantAPayer();
  }

  moisOffertChangeEvent(event: MatButtonToggleChange) {
    this.nbMoisOffertSelected = event.value
    this.montantOffre = this.calculerMontantOffre();
    this.montantAPayer = this.calculerMontantAPayer();
  }

  offreSuppChangeEvent(event: any) {
    this.montantOffreSupp = Number(event.target.value);
    this.montantOffre = this.calculerMontantOffre();
    this.montantAPayer = this.calculerMontantAPayer();
  }

  montantAboAutreChangeEvent(event: any) {
    this.montantOffre = 0;
    this.montantAPayer = Number(event.target.value);
  }

  calculerMontantAbonnement(): number {
    var montantAbo: number;

    montantAbo = this.formuleSelected.pack;

    if (this.isComptant) {
      montantAbo += this.formuleSelected.mois * this.dureeSelected;
    } else {
      montantAbo += this.formuleSelected.mois;
    }

    return parseFloat(montantAbo.toFixed(1));
  }


  calculerMontantOffre(): number {

    var montantOffre: number = 0;

    if (this.formuleSelected && this.formuleSelected.pack > 0) {
      montantOffre = this.montantOffrePack + this.montantOffreSupp + (this.nbMoisOffertSelected * this.formuleSelected.mois);
    } else {
      montantOffre = 0;
    }

    return parseFloat(montantOffre.toFixed(1));
  }

  calculerMontantAPayer(): number {
    var montantAPayer: number = 0;

    montantAPayer = this.montantAbo;

    montantAPayer -= this.montantOffrePack;

    if (this.isComptant) {
      montantAPayer -= (this.nbMoisOffertSelected * this.formuleSelected.mois)
    } else {
      if (!this.isDiferre && this.nbMoisOffertSelected > 0) {
        montantAPayer -= (this.formuleSelected.mois)
      }
    }

    montantAPayer -= this.montantOffreSupp;

    if (montantAPayer < 0) {
      return 0;
    } else {
      return parseFloat(montantAPayer.toFixed(1));
    }

  }

  encaissementChangeEvent(encaissement: Encaissement, event: any) {
    encaissement.montant_encaisse = event.target.value;
    this.calculerEncaissementTotal();
  }

  calculerEncaissementTotal() {

    var montantEncaisse: number = 0;

    for (let encaissement of this.encaissements) {

      montantEncaisse = (+montantEncaisse + +encaissement.montant_encaisse);
    }

     this.montantEncaisser = montantEncaisse;
  }

  addEncaissement() {
    //pas plus de 2 encaissements
    if (this.encaissements.length < 2) {
      this.encaissements.push(new Encaissement);
    }

  }

  deleteEncaissement(encaissement: Encaissement) {
    var index = this.encaissements.indexOf(encaissement, 0);
    if (index > -1) {
      this.encaissements.splice(index, 1);
    }

    this.calculerEncaissementTotal();
  }

  finish() {

    alert(this.ficheService.currentFiche)
    this.operation.id = 0;
    this.operation.sexe = this.firstFormGroup.get("sexe").value;
    this.operation.comptant = this.formuleFormGroup.get("comptant").value;
    this.operation.qualite = this.formuleSelected.formule.qualite;
    this.operation.fiche = this.ficheService.currentFiche;
    this.operation.nom = this.firstFormGroup.get("last").value;
    this.operation.prenom = this.firstFormGroup.get("first").value;
    this.operation.source = this.firstFormGroup.get("source").value;
    this.operation.pack = 129;
    this.operation.reconduction = true;
    this.operation.rvp = false;

    //this.encaissement.operation = this.operation;
    this.operation.encaissements = this.encaissements;

    //alert(this.ficheService.currentFiche.id)
    this.ficheService.saveAbo(this.operation);
  }



}
