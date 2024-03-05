import {Component, Input, OnInit} from '@angular/core';
import {calendar} from "ionicons/icons";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent  implements OnInit {

  @Input() sessions:any
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }


  sendBackAction(){
    this.modalCtrl.dismiss()
  }
  protected readonly calendar = calendar;


}
