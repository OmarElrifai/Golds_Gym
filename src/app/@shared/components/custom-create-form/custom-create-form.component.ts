import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-custom-create-form',
  templateUrl: './custom-create-form.component.html',
  styleUrls: ['./custom-create-form.component.scss'],
})
export class CustomCreateFormComponent implements OnInit {
  name: any;
  @Input() fields: any;
  @Input() title: any;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {

  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
