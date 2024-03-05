import { Component, OnInit } from '@angular/core';
import { Subscription, map, switchMap } from 'rxjs';
import { ContactsService } from 'src/app/@app/contacts/service/contacts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  observableSub!: Subscription;
  contactData:any;
  constructor(private contactService: ContactsService) {}

  ngOnInit() {
    this.observableSub = this.contactService.selectedContact.subscribe(
      (contactData: any) => {
        console.log(contactData)
        this.contactData = contactData
      }
    );
  }
}
