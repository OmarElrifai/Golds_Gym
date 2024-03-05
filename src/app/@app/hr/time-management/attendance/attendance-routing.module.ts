import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendancePage } from './attendance.page';

const routes: Routes = [
  {
    path: '',
    component: AttendancePage
  },
  {
    path: 'attendance-list',
    loadChildren: () => import('./attendance-list/attendance-list.module').then( m => m.AttendanceListPageModule)
  },
  {
    path: 'attendance-review',
    loadChildren: () => import('./attendance-review/attendance-review.module').then( m => m.AttendanceReviewPageModule)
  },
  {
    path: 'attendance-penalty',
    loadChildren: () => import('./attendance-penalty/attendance-penalty.module').then( m => m.AttendancePenaltyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendancePageRoutingModule {}
