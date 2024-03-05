import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HrPageRoutingModule } from './hr-home-routing.module';

import { HrHomePage } from './hr-home.page';
import { SharedModule } from 'src/app/@shared/shared.module';
import {CheckInOutComponent} from "./time-management/check-in-out/check-in-out.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HrPageRoutingModule,
    SharedModule
  ],
  declarations: [HrHomePage , CheckInOutComponent]
})
export class HrPageModule {}
