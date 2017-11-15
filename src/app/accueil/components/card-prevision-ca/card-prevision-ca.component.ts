import { Component, OnInit, Input } from '@angular/core';
import { SyntheseClub } from "app/services/users.interface";

@Component({
  selector: 'app-card-prevision-ca',
  templateUrl: './card-prevision-ca.component.html',
  styleUrls: ['./card-prevision-ca.component.css']
})
export class CardPrevisionCAComponent implements OnInit {

  constructor() { }

  @Input() syntheseClub: SyntheseClub;

  ngOnInit() {
  }

}
