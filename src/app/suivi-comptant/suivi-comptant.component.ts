import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { DataSource } from "@angular/cdk/collections";
import { SuiviComptant, RelanceComptant, ImportSuiviComptant } from "app/suivi-comptant/suivi-comptant.interface";
import { SuiviComptantService } from "app/suivi-comptant/suivi-comptant.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { MatSort } from "@angular/material/sort";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";

//define the constant url we would be uploading to.
const URL = 'http://localhost:8080/up';



@Component({
  selector: 'app-suivi-comptant',
  templateUrl: './suivi-comptant.component.html',
  styleUrls: ['./suivi-comptant.component.css']
})
export class SuiviComptantComponent implements OnInit {

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  nbSuiviEnCours: number = 0;
  nbSuiviValidate: number = 0;
  nbSuiviCancel: number = 0;

  displayedColumns = ['nom', 'telephone', 'contrat', 'expiration', 'statut', 'derniereRelance', 'nbRelance', 'action'];
  dataSource: SuiviComptantDataSource;

  private _suivisComptant: SuiviComptant[];
  public lastImport: ImportSuiviComptant = new ImportSuiviComptant;


  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'file' });

  constructor(public suiviComptantService: SuiviComptantService, public dialog: MatDialog, private _service: NotificationsService) { }

  ngOnInit() {
    this.sendGetSuivisComptant();
    this.getlastImport();



    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });



    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //console.log("ImageUpload:uploaded:", item, status, response);
      this.sendGetSuivisComptant();
    };
  }

  sendGetSuivisComptant() {
    this.suiviComptantService.getSuiviComptant(8).then(listSuiviComptant => {
      this._suivisComptant = listSuiviComptant;
      this.dataSource = new SuiviComptantDataSource(this._suivisComptant, this.sort);
      this.updateCompteur();
    });
  }

  getlastImport() {
    this.suiviComptantService.getlastImportSuiviComptant(8).then(lastImport => {
      this.lastImport = lastImport;
    });
  }

  selectRow(row) {
    console.log(row['statut']);
  }

  //met a jour les trois variables membre representant le nombre de suivi encours/reconduit/abandonné
  updateCompteur() {

    this.nbSuiviEnCours = 0;
    this.nbSuiviValidate = 0;
    this.nbSuiviCancel = 0;

    this._suivisComptant.forEach(element => {
      if (element.statut == 0) {
        this.nbSuiviEnCours++;
      } else if (element.statut == 1) {
        this.nbSuiviValidate++;
      } else if (element.statut == 2) {
        this.nbSuiviCancel++;
      }
    });


  }

  validateClickHandler(element: SuiviComptant) {
    this.suiviComptantService.validateSuiviComptant(element).then(toto => {
      this.sendGetSuivisComptant();
      this._service.success(
        'GOOD JOB',
        'Adhérent réinscrit',
        {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10
        }
      )
    });
  }

  cancelClickHandler(element: SuiviComptant) {
    this.suiviComptantService.cancelSuiviComptant(element).then(toto => {
      this.sendGetSuivisComptant();
      this._service.success(
        'Enregistrement OK',
        'Adhérent abandonné',
        {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10
        }
      )
    });
  }

  openAjouterRelanceDialog(mySuivi: SuiviComptant): void {
    let dialogRef = this.dialog.open(AJoutRelanceDialog, {
      width: '400px', height: '250px',
      panelClass: 'myClass',
      data: { suivi: mySuivi }
    });

    dialogRef.afterClosed().subscribe(result => {
      mySuivi.relances.push(result);
      this.suiviComptantService.saveSuiviComptant(mySuivi).then(toto => {
        this.sendGetSuivisComptant();
        this._service.success(
          'Enregistrement OK',
          'Relance enregistrée',
          {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          }
        )
      });
    });
  }

  openImportDialog(): void {
    let dialogRef = this.dialog.open(ImportDialog, {
      width: '400px', height: '250px',
      panelClass: 'myClass',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.sendGetSuivisComptant();
        this._service.success(
          'Import effectué',
          'mail envoyé',
          {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          }
        )
      }

    });
  }


  openListeRelanceDialog(mySuivi: SuiviComptant): void {
    let dialogRef = this.dialog.open(ListRelanceDialog, {
      width: '500px', height: '400px',
      data: { suivi: mySuivi },
      hasBackdrop: true,
      backdropClass: 'myBackdrop',
      panelClass: 'myClass'
    });
  }



}

/**
* Data source to provide what data should be rendered in the table. The observable provided
* in connect should emit exactly the data that should be rendered by the table. If the data is
* altered, the observable should emit that new set of data on the stream. In our case here,
* we return a stream that contains only one set of data that doesn't change.
*/
export class SuiviComptantDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private suivisComptant: SuiviComptant[], private _sort: MatSort) {
    super();
  }

  // connect(): Observable<SuiviComptant[]> {
  //   return Observable.of(this.suivisComptant);
  // }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SuiviComptant[]> {
    const displayDataChanges = [
      this.suivisComptant,
      this._filterChange,
      this._sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() { }

  private getTime(date?: Date) {
    var t: Date = new Date(date);
    return t != null ? t.getTime() : 0;
  }
  /** Returns a sorted copy of the database data. */
  getSortedData(): SuiviComptant[] {
    const data = this.suivisComptant.slice().filter((item: SuiviComptant) => {
      let searchStr = (item.nom_adherent + item.prenom_adherent).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) != -1;
    });

    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'nom': [propertyA, propertyB] = [a.nom_adherent, b.nom_adherent]; break;
        case 'contrat': [propertyA, propertyB] = [a.nom_contrat, b.nom_contrat]; break;
        case 'statut': [propertyA, propertyB] = [a.statut, b.statut]; break;
        case 'expiration': [propertyA, propertyB] = [this.getTime(a.date_expiration), this.getTime(b.date_expiration)]; break;
        case 'nbRelance': [propertyA, propertyB] = [a.relances.length, b.relances.length]; break;
        case 'derniereRelance': [propertyA, propertyB] = [this.getTime(a.dateDerniereRelance), this.getTime(b.dateDerniereRelance)]; break;
      }
      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'addRelance.dialog.html',
  styleUrls: ['suivi-comptant.component.css']
})
export class AJoutRelanceDialog {

  relance: RelanceComptant = new RelanceComptant();

  typeRelances = [
    { value: '0', viewValue: 'téléphone' },
    { value: '1', viewValue: 'sms' },
    { value: '2', viewValue: 'mail' }
  ];

  constructor(
    public dialogRef: MatDialogRef<AJoutRelanceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'list-relance-dialog',
  templateUrl: 'listRelance.dialog.html',
  styleUrls: ['suivi-comptant.component.css']
})
export class ListRelanceDialog {

  constructor(
    public dialogRef: MatDialogRef<ListRelanceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'import-dialog',
  templateUrl: 'import.dialog.html',
  styleUrls: ['suivi-comptant.component.css']
})
export class ImportDialog {

  constructor(private http: Http,
    private el: ElementRef,
    public dialogRef: MatDialogRef<ImportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  //the function which handles the file upload without using a plugin.
  upload() {
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('file', inputEl.files.item(0));
      //call the angular http method
      this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        .post(URL, formData).map((res: Response) => res.toString()).subscribe(
        //map the success function and alert the response
        (success) => {
          this.dialogRef.close(true);

        },
        (error) => alert(error))
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
