import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayslipDetailsPage } from './payslip-details.page';

const routes: Routes = [
  {
    path: '',
    component: PayslipDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayslipDetailsPageRoutingModule {}
