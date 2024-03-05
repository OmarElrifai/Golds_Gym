import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaveToApprovePageRoutingModule } from './leave-to-approve-routing.module';

import { LeaveToApprovePage } from './leave-to-approve.page';
import {SharedModule} from "../../../../../@shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveToApprovePageRoutingModule,
    SharedModule
  ],
  declarations: [LeaveToApprovePage]
})
export class LeaveToApprovePageModule {}
