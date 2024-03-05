import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeavesPage } from './leaves.page';

const routes: Routes = [
  {
    path: '',
    component: LeavesPage
  },
  {
    path: 'manage-leaves',
    loadChildren: () => import('./manage-leaves/manage-leaves.module').then( m => m.ManageLeavesPageModule)
  },
  {
    path: 'balance',
    loadChildren: () => import('./balance/balance.module').then( m => m.BalancePageModule)
  },
  {
    path: 'leave-to-approve',
    loadChildren: () => import('./leave-to-approve/leave-to-approve.module').then( m => m.LeaveToApprovePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavesPageRoutingModule {}
