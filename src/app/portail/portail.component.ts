import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-portail',
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.css']
})
export class PortailComponent implements OnInit {
    
  @ViewChild('test') input; 
  nbAbosMonth: number;

  constructor() { }

  ngOnInit() {
    
  }

}
