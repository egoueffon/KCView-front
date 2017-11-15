import { Pipe, PipeTransform } from '@angular/core';
import {Operation} from "../services/fiches.interface";

@Pipe({
  name: 'encaissement'
})
export class EncaissementPipe implements PipeTransform {

  retour:String = '';
  transform(operation: Operation): String {
    this.retour = "";
    if(operation.encaissements){
  
        return "";
    }


	}		

}

