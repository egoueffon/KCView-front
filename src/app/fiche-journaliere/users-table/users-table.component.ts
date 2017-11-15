import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import { Operation } from "../services/fiches.interface";
import { User } from "app/services/users.interface";
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';



@Component({
    selector: "app-users-table",
    templateUrl: "./users-table.component.html",
    styleUrls: ["./users-table.component.css"],
})
export class UsersTableComponent implements OnInit {

    @Output()
    private clickUser = new EventEmitter<User>();

    displayedColumns = ['type', 'sexe', 'rvp', 'nom', 'source', 'qualite', 'pack', 'montant_abo', 'montant_encaisse', 'mode_versement', 'pea'];
    dataSource: ExampleDataSource;

    private _operations: Operation[];
    selectedRow : Number;

    constructor() { 

    }

    setClickedRow(index){
            console.log("ligne selectioné :" + index)
            this.selectedRow = index;
    }

    
    
func2(){
    console.log("DBCLICK");
}    

    /**
     *
     */
    ngOnInit() {
        
    }

    @Input()
    set operations(operations: Operation[]){
        console.log("Table operations =>",operations);
        this._operations = operations;
        this.dataSource = new ExampleDataSource(operations);
    }

    get operations() {
        return this._operations;
    }

}


    /**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  
  
  constructor(private operations: Operation[]) {
    super();
  }

  connect(): Observable<Operation[]> {
    return Observable.of(this.operations);
  }

  disconnect() {}
}




