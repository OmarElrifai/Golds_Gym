import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayslipDetailsPageRoutingModule } from './payslip-details-routing.module';

import { PayslipDetailsPage } from './payslip-details.page';
import {SharedModule} from "../../../../../@shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PayslipDetailsPageRoutingModule,
        SharedModule
    ],
  declarations: [PayslipDetailsPage]
})
export class PayslipDetailsPageModule {}
