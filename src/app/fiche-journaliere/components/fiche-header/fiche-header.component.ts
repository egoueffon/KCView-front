import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IMyOptions, IMyDateModel, IMyDate } from "mydatepicker";
import { Fiche, SyntheseFiche } from "../../services/fiches.interface";
import { AuthenticationService } from "app/services/authentication.service";
import { SyntheseClub } from "app/services/users.interface";
import { ClubService } from "app/services/club.service";

@Component({
  selector: 'app-fiche-header',
  templateUrl: './fiche-header.component.html',
  styleUrls: ['./fiche-header.component.css']
})
export class FicheHeaderComponent implements OnInit {

  myDatePickerOptions: IMyOptions = {
    dateFormat:'dd/mm/yyyy',
    width:'150px',
    dayLabels:{su: 'Di', mo: 'Lu', tu: 'Ma', we: 'Me', th: 'Je', fr: 'Ve', sa: 'Sa'},
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Avr', 5: 'Mai', 6: 'Jui', 7: 'Jui', 8: 'Aou', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
    todayBtnTxt: 'Auj',
    showWeekNumbers:true,
    showClearDateBtn : false
  };


   private _syntheseFiche : SyntheseFiche;
 
  @Input()
  set syntheseFiche(syntheseFiche: SyntheseFiche) {
    console.log("fiche setter")
    this._syntheseFiche = syntheseFiche;
 }

   get syntheseFiche(): SyntheseFiche { return this._syntheseFiche; }

  @Output() dateUpdated = new EventEmitter();

  clubSynthese : SyntheseClub = new SyntheseClub;
  myDate: Date = new Date;
  private selDate: IMyDate = {year: this.myDate.getFullYear(), 
                              month: this.myDate.getMonth() + 1, 
                              day: this.myDate.getDate()};

  constructor(public clubService: ClubService, public authService: AuthenticationService ) { 

  }


  ngOnInit() {
    this.sendRequest();
  }

  onDateChanged(event: IMyDateModel){
    console.log("date :" + event.date);
    this.myDate = event.jsdate;
     this.dateUpdated.emit(event.jsdate);
     this.sendRequest();
  }

  sendRequest(){
     this.clubService.getClubSynthese(this.authService.user.club.id, this.myDate).then(clubSynthese => {
            //console.log("Users2 =>", clubSynthese);
            this.clubSynthese = clubSynthese;
        });
  }

}
