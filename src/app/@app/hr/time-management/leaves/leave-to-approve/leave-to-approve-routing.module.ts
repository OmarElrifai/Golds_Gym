import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveToApprovePage } from './leave-to-approve.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveToApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveToApprovePageRoutingModule {}
