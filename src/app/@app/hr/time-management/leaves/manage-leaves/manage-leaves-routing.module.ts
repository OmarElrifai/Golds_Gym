import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageLeavesPage } from './manage-leaves.page';

const routes: Routes = [
  {
    path: '',
    component: ManageLeavesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageLeavesPageRoutingModule {}
