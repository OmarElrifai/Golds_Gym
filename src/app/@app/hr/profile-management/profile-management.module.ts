import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileManagementPageRoutingModule } from './profile-management-routing.module';

import { ProfileManagementPage } from './profile-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileManagementPageRoutingModule
  ],
  declarations: [ProfileManagementPage]
})
export class ProfileManagementPageModule {}
