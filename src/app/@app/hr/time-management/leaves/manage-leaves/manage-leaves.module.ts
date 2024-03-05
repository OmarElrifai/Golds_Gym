import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageLeavesPageRoutingModule } from './manage-leaves-routing.module';

import { ManageLeavesPage } from './manage-leaves.page';
import {SharedModule} from "../../../../../@shared/shared.module";
import {LeaveDetailsComponent} from "./leave-details/leave-details.component";
import {AddEditComponent} from "./leave-details/add-edit/add-edit.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageLeavesPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ManageLeavesPage,LeaveDetailsComponent,AddEditComponent]
})
export class ManageLeavesPageModule {}
