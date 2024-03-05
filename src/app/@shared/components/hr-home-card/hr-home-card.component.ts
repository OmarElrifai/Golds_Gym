import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hr-home-card',
  templateUrl: './hr-home-card.component.html',
  styleUrls: ['./hr-home-card.component.scss'],
})
export class HrHomeCardComponent  implements OnInit {

  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Input() cardList:any;
  @Input() hasNotification:any;
  constructor() { }

  ngOnInit() {
  }

  onCardClick(action:string){
    this.clicked.emit(action);
  }

}
