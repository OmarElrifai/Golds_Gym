import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceReviewPageRoutingModule } from './attendance-review-routing.module';

import { AttendanceReviewPage } from './attendance-review.page';
import {AttendanceListPageModule} from "../attendance-list/attendance-list.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AttendanceReviewPageRoutingModule,
        AttendanceListPageModule
    ],
  declarations: [AttendanceReviewPage]
})
export class AttendanceReviewPageModule {}
