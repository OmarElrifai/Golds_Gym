import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HrHomePage } from './hr-home.page';

const routes: Routes = [
  {
    path: '',
    component: HrHomePage
  },
  {
    path: 'attendance',
    loadChildren: () => import('./time-management/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'leaves',
    loadChildren: () => import('./time-management/leaves/leaves.module').then( m => m.LeavesPageModule)
  },
  {
    path: 'payslips',
    loadChildren: () => import('./time-management/payslips/payslips.module').then( m => m.PayslipsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrPageRoutingModule {}
