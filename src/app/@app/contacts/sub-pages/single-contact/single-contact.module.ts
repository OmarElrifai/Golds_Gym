import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleContactPageRoutingModule } from './single-contact-routing.module';

import { SingleContactPage } from './single-contact.page';
import {SharedModule} from "../../../../@shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleContactPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [SingleContactPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SingleContactPageModule {}
