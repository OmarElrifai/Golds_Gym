import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancePenaltyPageRoutingModule } from './attendance-penalty-routing.module';

import { AttendancePenaltyPage } from './attendance-penalty.page';
import {AttendanceListPageModule} from "../attendance-list/attendance-list.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AttendancePenaltyPageRoutingModule,
        AttendanceListPageModule
    ],
  declarations: [AttendancePenaltyPage]
})
export class AttendancePenaltyPageModule {}
