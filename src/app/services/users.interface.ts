
export class UserCredential {
    login: string;
    password: string;
}

export class SyntheseClub {
    nbAbosMois          : number;
    aboPourObjectif     : number;
    objectifAbosMois    : number;
    nbAbosJour          : number;
    nbAbosMoisN1        : number;
    nbAbosSemaine       : number;
    camois              : number;
    objectifCAMois      : number;
    camoisN1            : number;
    casemaineN1         : number;
    casemaine           : number;
    tendanceAboJour     : number =0;
    tendanceAboMois     : number =0;
    club                : Club = new Club;

    getCounter(){
    return this.nbAbosMois;
  }
}

export class User extends UserCredential {
    id: number;
    nom: string;
    prenom: string;
    color: string;
    actif: boolean;
    club: Club;

}

export class Club {
    id: number;
    name: string;   
    packs: Pack[];
}

export class Pack {
    id: number;
    value: string;   
}

export interface IUsersService {
    getUsers(): Promise<User[]>;
    create(user: User): Promise<User>;
    exists(login: string): Promise<boolean>;
    get(login: string, password:String): Promise<User>;
}