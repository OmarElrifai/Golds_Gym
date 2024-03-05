import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/@app/contacts/service/contacts.service';
import { Subscription, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-sessions-schedual',
  templateUrl: './sessions-schedual.page.html',
  styleUrls: ['./sessions-schedual.page.scss'],
})
export class SessionsSchedualPage implements OnInit {
  observableSub!: Subscription;
  constructor(private contactService: ContactsService) {}
  contactData: any;
  results: any;
  ngOnInit() {
    this.observableSub = this.contactService.selectedContact
      .pipe(
        switchMap((contactData: any) => {
          const customerID = contactData.id;
          this.contactData = contactData;
          return this.contactService.getContactSessions(customerID);
        })
      )
      .subscribe((res: any) => {
        console.log(res); // The full response from getOdooSalesOrders.
        // this.sales = res.data;
        this.results = res.data; // Consider differentiating these two assignments if they're meant to be different.
      });
  }

  ngOnDestroy(): void {
    this.observableSub.unsubscribe();
  }
}
