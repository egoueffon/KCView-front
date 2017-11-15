import { Component, OnInit, Input } from '@angular/core';
import { ClubService } from "app/services/club.service";
import { AuthenticationService } from "app/services/authentication.service";
import { SyntheseClub } from "app/services/users.interface";

@Component({
  selector: 'app-card-prevision-abos',
  templateUrl: './card-prevision-abos.component.html',
  styleUrls: ['./card-prevision-abos.component.css']
})
export class CardPrevisionAbosComponent implements OnInit {

@Input() syntheseClub: SyntheseClub = new SyntheseClub();

  ngOnInit() {
  }

}
