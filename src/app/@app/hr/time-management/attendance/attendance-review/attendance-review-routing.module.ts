import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceReviewPage } from './attendance-review.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceReviewPageRoutingModule {}
