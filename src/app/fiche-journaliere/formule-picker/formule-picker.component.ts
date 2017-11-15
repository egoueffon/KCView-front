import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formule-picker',
  templateUrl: './formule-picker.component.html',
  styleUrls: ['./formule-picker.component.css']
})
export class FormulePickerComponent implements OnInit {

  private formules: any[] = <any[]>[
        {id: 1, color: '#8c8c8c', selected: false},
        {id: 2, color: '#bbce02', selected: false},
        {id: 3, color: '#e2007a', selected: false},
        {id: 4, color: '#ffffff', selected: false}
    ];

  constructor() { }

  ngOnInit() {

    //alert('load')
  }

  selectedIndexChange(event){
    
    this.formules.forEach(element => {
      element.selected = false;
    });

    this.formules[event - 1].selected = true;
  }

}
