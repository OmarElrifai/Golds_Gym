import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileManagementPage } from './profile-management.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileManagementPageRoutingModule {}
