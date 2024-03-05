import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearningDevelopmentPageRoutingModule } from './learning-development-routing.module';

import { LearningDevelopmentPage } from './learning-development.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearningDevelopmentPageRoutingModule
  ],
  declarations: [LearningDevelopmentPage]
})
export class LearningDevelopmentPageModule {}
