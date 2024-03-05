import { Component, OnInit } from '@angular/core';
import {ModalController, PickerController} from "@ionic/angular";
import {SalesService} from "../service/sales.service";
import {SharedService} from "../../../@shared/shared.service";
import {AddEditSalesComponent} from "../add-edit-sales/add-edit-sales.component";
import {SalesDetailsComponent} from "./sales-details/sales-details.component";
import {DateFormaterService} from "../../../@shared/services/date-formater.service";

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
})
export class SalesListComponent  implements OnInit {
  sales: any;
  employee:any;
  dateFrom:any;
  dateTo:any;
  constructor(
    private modalCtrl: ModalController,
    private pickerCtrl:PickerController,
    private salesService: SalesService,
    private shared: SharedService,
    private dateFormater:DateFormaterService
  ) {}

  public results:any;
  pickedDate: any;
  ngOnInit() {
    this.getSales();
  }

  getSales(){
    let date = new Date();
    let month = this.dateFormater.getMonth(date.getMonth());
    let year = date.getFullYear();
    this.getFirstAndLastDay(year,month);
    this.pickedDate = `${year}-${month}`;
    let dateFrom = `${this.pickedDate}-${this.getFirstAndLastDay(year,month)[0]}`
    let dateTo = `${this.pickedDate}-${this.getFirstAndLastDay(year,month)[1]}`
    this.salesService.getOdooSalesOrdersInTimeWindow(dateFrom,dateTo).subscribe((res: any) => {
      console.log(res);
      this.sales = res.data;
      this.results = res.data;
    });
  }
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.results = this.sales.filter((contact: any) => {
      return (
        (contact.name &&
          contact.name.toLowerCase().indexOf(query) > -1) ||
        (contact.partner_id[1] && contact.partner_id[1].toLowerCase().indexOf(query) > -1) ||
        (contact.type_name && contact.type_name.toLowerCase().indexOf(query) > -1)
      );
    });

    console.log(this.results);
  }

  async addSales() {
    const modal = await this.modalCtrl.create({
      component: AddEditSalesComponent,
      cssClass:'custom-modal'
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirmed') {
      console.log(
        '---------- close modal method with confirm role ------------'
      );
      this.getSales();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

  async openSalesDetails(sale:any) {
    const modal = await this.modalCtrl.create({
      component: AddEditSalesComponent,
      componentProps:{sale:sale},
      cssClass:'custom-modal'
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirmed') {
      console.log(
        '---------- close modal method with confirm role ------------'
      );
      this.getSales();
    }
  }

  async openDatePicker(){
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'month',
          options: [
            {
              text: '01',
              value: '01',
            },
            {
              text: '02',
              value: '02',
            },
            {
              text: '03',
              value: '03',
            },
            {
              text: '04',
              value: '04',
            },{
              text: '05',
              value: '05',
            },
            {
              text: '06',
              value: '06',
            },
            {
              text: '07',
              value: '07',
            },
            {
              text: '08',
              value: '08',
            },{
              text: '09',
              value: '09',
            },
            {
              text: '10',
              value: '10',
            },
            {
              text: '11',
              value: '11',
            },
            {
              text: '12',
              value: '12',
            }
          ],
        },{
          name: 'year',
          options: [
            {
              text: '2024',
              value: '2024',
            },
            {
              text: '2023',
              value: '2023',
            },
            {
              text: '2022',
              value: '2022',
            },
            {
              text: '2021',
              value: '2021',
            },
            {
              text: '2020',
              value: '2020',
            },{
              text: '2019',
              value: '2019',
            },
            {
              text: '2018',
              value: '2018',
            },
            {
              text: '2017',
              value: '2017',
            },
            {
              text: '2016',
              value: '2016',
            },{
              text: '2015',
              value: '2015',
            },
            {
              text: '2014',
              value: '2014',
            },
            {
              text: '2013',
              value: '2013',
            },
            {
              text: '2012',
              value: '2012',
            },
            {
              text: '2011',
              value: '2011',
            },
            {
              text: '2010',
              value: '2010',
            }
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value:any) => {
            this.pickedDate = `${value.year.value}-${value.month.value}`;
            var firstDay = this.getFirstAndLastDay(value.year.value,value.month.value)[0];
            var lastDay = this.getFirstAndLastDay(value.year.value,value.month.value)[1];
            let dateFrom = `${this.pickedDate}-${firstDay}`;
            let dateTo = `${this.pickedDate}-${lastDay}`;
            console.log(dateFrom, "-", dateTo);
            this.salesService.getOdooSalesOrdersInTimeWindow(dateFrom,dateTo).subscribe((res:any)=>{
              console.log(res);
              this.sales = res.data;
              this.results = res.data;
            })
          },
        },
      ],
    });

    await picker.present();
  }
  getFirstAndLastDay(year:any,month:any) {
    var date = new Date();
    var firstDay = '' + new Date(year, parseInt(month)-1, 1).getDate()
    var lastDay = '' + new Date(year, parseInt(month), 0).getDate();
    if (firstDay.length < 2)
      firstDay = "0" + firstDay
    if (lastDay.length < 2)
      lastDay = "0" + lastDay
    return [firstDay, lastDay]
  }
}
