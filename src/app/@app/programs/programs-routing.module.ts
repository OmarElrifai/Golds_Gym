import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramsPage } from './programs.page';
import {ProgramViewComponent} from "../../@shared/components/view-programs/program-view.component";

const routes: Routes = [
  {
    path: '',
    component: ProgramsPage
  },
  {
    path:'program-view',
    component:ProgramViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramsPageRoutingModule {}
