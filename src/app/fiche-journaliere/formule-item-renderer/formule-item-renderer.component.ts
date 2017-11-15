import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formule-item-renderer',
  templateUrl: './formule-item-renderer.component.html',
  styleUrls: ['./formule-item-renderer.component.css']
})
export class FormuleItemRendererComponent implements OnInit {

  @Input() private color     : String = "#bbce02";
  @Input() private formule   : any;
  @Input() private imageUrl  : String = "https://www.keepcool.fr/tpl/img/shop/formule-two-cool.png";

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  private isSelected : boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  onClick(){
    //this.formule.selected = true;
    this.change.emit(this.formule.id);
    //alert('index ' + this.formule.id);
  }

}
