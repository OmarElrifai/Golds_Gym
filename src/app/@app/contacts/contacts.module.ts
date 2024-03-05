import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { SharedModule } from 'src/app/@shared/shared.module';
import {AddEditContactsComponent} from "./add-edit-contacts/add-edit-contacts.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ContactsPage,AddEditContactsComponent],
})
export class ContactsPageModule {}
