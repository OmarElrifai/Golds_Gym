import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceListPageRoutingModule } from './attendance-list-routing.module';

import { AttendanceListPage } from './attendance-list.page';
import {SharedModule} from "../../../../../@shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceListPageRoutingModule,
    SharedModule
  ],
  declarations: [AttendanceListPage],
  exports: [
    AttendanceListPage
  ]
})
export class AttendanceListPageModule {}
