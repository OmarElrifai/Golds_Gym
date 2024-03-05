import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendancePenaltyPage } from './attendance-penalty.page';

const routes: Routes = [
  {
    path: '',
    component: AttendancePenaltyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendancePenaltyPageRoutingModule {}
