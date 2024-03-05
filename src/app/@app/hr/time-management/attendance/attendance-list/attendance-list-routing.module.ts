import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceListPage } from './attendance-list.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceListPageRoutingModule {}
