import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomCreateFormComponent } from 'src/app/@shared/components/custom-create-form/custom-create-form.component';
import { ContactsService } from './service/contacts.service';
import { Router } from '@angular/router';
import {AddEditContactsComponent} from "./add-edit-contacts/add-edit-contacts.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: any;
  constructor(
    private modalCtrl: ModalController,
    private contactService: ContactsService,
    private router: Router
  ) {}

  public results: any;
  ngOnInit() {
    this.getContacts()
  }

  getContacts(){
    this.contactService.getOdooContacts().subscribe((res: any) => {
      console.log(res);
      this.contacts = res.data;
      this.results = this.contacts;
    });
  }
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);

    this.results = this.contacts.filter((contact: any) => {
      return (
        (contact.name &&
          contact.name.toLowerCase().indexOf(query) > -1) ||
        (contact.email && contact.email.toLowerCase().indexOf(query) > -1) ||
        (contact.mobile && contact.mobile.toLowerCase().indexOf(query) > -1) ||
        (contact.phone && contact.phone.toLowerCase().indexOf(query) > -1)
      );
    });

    console.log(this.results);
  }

  openSingleContact(contactData: any) {
    this.router.navigate([`/contacts/${contactData.id}`], { state: { contactId: 1 } });
    this.contactService.selectedContact.next(contactData)
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddEditContactsComponent,
      // componentProps: {},
      cssClass:"custom-modal"
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.getContacts();
      console.log(
        '---------- close modal method with confirm role ------------'
      );
      console.log(data);
    }
  }
}


