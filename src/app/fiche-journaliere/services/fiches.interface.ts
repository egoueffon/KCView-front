

export class Fiche {
    id: number;
    jour: Date;
    vp: number;
    resiliation: number;
    eau: number;
    meteo: String;
    objectif_abo: number;
    id_club: number;
    listOperation: Operation[];
}

export class SyntheseFiche {
    fiche: Fiche = new Fiche;
    encaissement: number;
    encaissementCB: number;
    encaissementCheque: number;
    encaissementEspece: number;
    encaissementAutre: number;
}

export class Operation {
    id: number = 0;
    type: String;
    encaissements: Encaissement[];
    nom: string;
    prenom: String;
    source: String;
    fiche: Fiche;
    rvp: Boolean;
    reconduction: Boolean;
    qualite: String;
    pack: number;
    comptant: Boolean;
}

export class Abonnement extends Operation {
    type: String = "abonnement";
    sexe: String = "F";
    qualite: String;
    montant_abo: number;
}





export class FormuleClub {
    mois: number;
    pack: number;
    formule:Formule;
}

export class Formule {
    formuleId: number;
    qualite: String;
    prelevement:Boolean;
    comptant: Boolean;
    durees:Duree[];
    nomFormule: String
}

export class Duree {
    duree: number;
}

export class Encaissement {
    montant_encaisse: number;
    mode_versement: String;
    operation: Operation;
}