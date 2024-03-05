import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleContactPage } from './single-contact.page';

const routes: Routes = [
  {
    path: '',
    component: SingleContactPage,
  },
  {
    path: 'sales-history',
    loadChildren: () => import('./sub-pages/sales-history/sales-history.module').then( m => m.SalesHistoryPageModule)
  },
  {
    path: 'buy',
    loadChildren: () => import('./sub-pages/buy/buy.module').then( m => m.BuyPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./sub-pages/profile/profile.module').then( m => m.ProfilePageModule)
  },  {
    path: 'sessions-schedual',
    loadChildren: () => import('./sub-pages/sessions-schedual/sessions-schedual.module').then( m => m.SessionsSchedualPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleContactPageRoutingModule {}
