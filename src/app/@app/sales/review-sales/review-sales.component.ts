import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-review-sales',
  templateUrl: './review-sales.component.html',
  styleUrls: ['./review-sales.component.scss'],
})
export class ReviewSalesComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss()
  }
}
