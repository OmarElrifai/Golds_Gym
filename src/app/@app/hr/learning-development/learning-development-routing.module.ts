import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningDevelopmentPage } from './learning-development.page';

const routes: Routes = [
  {
    path: '',
    component: LearningDevelopmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningDevelopmentPageRoutingModule {}
