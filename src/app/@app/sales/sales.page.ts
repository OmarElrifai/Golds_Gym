import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomCreateFormComponent } from 'src/app/@shared/components/custom-create-form/custom-create-form.component';
import { SalesService } from './service/sales.service';
import {SharedService} from "../../@shared/shared.service";
import {Preferences} from "@capacitor/preferences";
import {AddEditSalesComponent} from "./add-edit-sales/add-edit-sales.component";
import {TabSection} from "../../@shared/tabSection";
import {CardSegment} from "../../@shared/cardSegment";
import {SalesListComponent} from "./sales-list/sales-list.component";
import {ReviewSalesComponent} from "./review-sales/review-sales.component";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  cardData:CardSegment[] = [
    {
      text:'Sales',
      img:'/assets/icons/dollar.svg',
      action:'sales',
      show:true
    },
    {
      text:'Review Sales',
      icon:'cellular',
      action:'review',
      show:true
    }
  ];
  employee:any;
  constructor(
    private modalCtrl: ModalController,
    private salesService: SalesService,
    private shared: SharedService
  ) {}

  public results:any;
  ngOnInit() {

  }


  async openCard(action:any) {
    switch (action){
      case "sales":
        const sales = await this.modalCtrl.create({
          component:SalesListComponent
        });
        sales.present();
        break;

      default:
        const review = await this.modalCtrl.create({
          component:ReviewSalesComponent
        });
        review.present();
    }

  }
}
