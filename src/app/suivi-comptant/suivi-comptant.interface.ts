export class SuiviComptant {
    id: number;
    num_adherent: number;
    nom_adherent: string;
    prenom_adherent: string;
    nom_contrat: string;
    num_telephone: number;
    date_expiration: Date;
    statut:number; 
    dateDerniereRelance: Date;
    relances:RelanceComptant[];
}

export class RelanceComptant {
    id: number;
    type: number;
    commentaire: string;
    date_relance: Date = new Date();
}

export class ImportSuiviComptant {
    id: number;
    type: string;
    commentaire: string;
    date_import: Date;
    id_club: number;
}