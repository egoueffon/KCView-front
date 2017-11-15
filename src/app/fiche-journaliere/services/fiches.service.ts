import { Injectable } from '@angular/core';
import { Fiche, SyntheseFiche, Operation, Abonnement } from "./fiches.interface";
import { Http, Headers, RequestOptions, URLSearchParams, RequestMethod } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { DatePipe } from '@angular/common';

@Injectable()
export class FicheService {

    public currentFiche: Fiche;

    constructor(private http: Http, private datepipe: DatePipe) { }

    getSyntheseFiche(clubid: number, date: Date): Promise<SyntheseFiche> {
        //console.log("find user by login", login);

        let myParams = new URLSearchParams();
        myParams.append('clubId', clubid.toString());
        myParams.append('date', this.datepipe.transform(date, 'yyyy-MM-dd'));
        let options = new RequestOptions({ search: myParams });

        return this.http
            .get(`http://localhost:8080/syntheseFiche`, options)
            .map(response => response.json())
            .toPromise().then(response=>{this.currentFiche= response.fiche; return response});    
    }
 
    saveOperation(operation: Operation): Promise<Operation> {

        alert('ee')

        let options = new RequestOptions({ headers: new Headers({ 'Content-type': 'application/json' }) });


        return this.http
            .post(`http://localhost:8080/save/`, JSON.stringify(operation), options)
            .map(response => response.json())
            .toPromise()
    }

    saveAbo(operation: Abonnement): Promise<Operation> {

        alert('ee')

        let options = new RequestOptions({ headers: new Headers({ 'Content-type': 'application/json' }) });


        return this.http
            .post(`http://localhost:8080/save/`, JSON.stringify(operation), options)
            .map(response => response.json())
            .toPromise()
    }
}
