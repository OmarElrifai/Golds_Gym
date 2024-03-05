import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayslipsPageRoutingModule } from './payslips-routing.module';

import { PayslipsPage } from './payslips.page';
import {SharedModule} from "../../../../@shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayslipsPageRoutingModule,
    SharedModule
  ],
  declarations: [PayslipsPage]
})
export class PayslipsPageModule {}
