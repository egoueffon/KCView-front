import { Injectable } from '@angular/core';
import { SuiviComptant, ImportSuiviComptant } from "app/suivi-comptant/suivi-comptant.interface";
import { Http, RequestOptions, Headers } from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class SuiviComptantService {

  getSuiviComptant(clubid: number): Promise<SuiviComptant[]> { 
    let myParams = new URLSearchParams();
    //myParams.append('clubId', clubid.toString());
    //myParams.append('date', this.datepipe.transform(date, 'yyyy-MM-dd'));
    let options = new RequestOptions({ search: myParams });

    return this.http
      .get(`http://localhost:8080/suivisComptant`, options)
      .map(response => response.json())
      .toPromise();
  }

  getlastImportSuiviComptant(clubid: number): Promise<ImportSuiviComptant> { 
    let myParams = new URLSearchParams();
    //myParams.append('clubId', clubid.toString());
    //myParams.append('date', this.datepipe.transform(date, 'yyyy-MM-dd'));
    let options = new RequestOptions({ search: myParams });

    return this.http
      .get(`http://localhost:8080/lastImportSuiviComptant`, options)
      .map(response => response.json())
      .toPromise();
  }

  validateSuiviComptant(sc: SuiviComptant): Promise<SuiviComptant> {
    let options = new RequestOptions({ headers: new Headers({ 'Content-type': 'application/json' }) });


    return this.http
      .post(`http://localhost:8080/validateSuiviComptant`, JSON.stringify(sc), options)
      .map(response => response.json())
      .toPromise()
  }

 saveSuiviComptant(sc: SuiviComptant): Promise<SuiviComptant> {
    let options = new RequestOptions({ headers: new Headers({ 'Content-type': 'application/json' }) });


    return this.http
      .post(`http://localhost:8080/saveSuiviComptant`, JSON.stringify(sc), options)
      .map(response => response.json())
      .toPromise()
  }


  cancelSuiviComptant(sc: SuiviComptant): Promise<SuiviComptant> {


    let options = new RequestOptions({ headers: new Headers({ 'Content-type': 'application/json' }) });


    return this.http
      .post(`http://localhost:8080/cancelSuiviComptant`, JSON.stringify(sc), options)
      .map(response => response.json())
      .toPromise()
  }

  constructor(private http: Http) { }

}
