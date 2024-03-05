import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription, map, switchMap } from 'rxjs';
import { ContactsService } from 'src/app/@app/contacts/service/contacts.service';
import { SalesService } from 'src/app/@app/sales/service/sales.service';
import { CustomCreateFormComponent } from 'src/app/@shared/components/custom-create-form/custom-create-form.component';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.page.html',
  styleUrls: ['./sales-history.page.scss'],
})
export class SalesHistoryPage implements OnInit, OnDestroy {
  sales: any;
  contactData: any;
  observableSub!: Subscription;
  constructor(
    private modalCtrl: ModalController,
    private salesService: SalesService,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactsService
  ) {}

  public results: any;

  ngOnInit() {
  this.observableSub = this.contactService.selectedContact
    .pipe(
      switchMap((contactData: any) => {
        const customerID = contactData.id;
        this.contactData = contactData
        return this.salesService.getOdooSalesOrders();
      })
    )
    .subscribe(
      (res: any) => {
        console.log(res); // The full response from getOdooSalesOrders.
        this.sales = res.data;
        this.results = res.data; // Consider differentiating these two assignments if they're meant to be different.
      }
    );
}

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);

    this.results = this.sales.filter((contact: any) => {
      return (
        (contact.name && contact.name.toLowerCase().indexOf(query) > -1) ||
        (contact.partner_id[1] &&
          contact.partner_id[1].toLowerCase().indexOf(query) > -1) ||
        (contact.type_name &&
          contact.type_name.toLowerCase().indexOf(query) > -1)
      );
    });

    console.log(this.results);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CustomCreateFormComponent,
      componentProps: {
        dataRows: [1, 1, 1, 1, 1],
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(
        '---------- close modal method with confirm role ------------'
      );
      console.log(data);
    }
  }
  ngOnDestroy(): void {
    this.observableSub.unsubscribe();
  }
}
