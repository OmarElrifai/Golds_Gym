import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayslipsPage } from './payslips.page';

const routes: Routes = [
  {
    path: '',
    component: PayslipsPage
  },  {
    path: 'payslip-details',
    loadChildren: () => import('./payslip-details/payslip-details.module').then( m => m.PayslipDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayslipsPageRoutingModule {}
