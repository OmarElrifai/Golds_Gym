import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPageRoutingModule } from './sales-routing.module';

import { SalesPage } from './sales.page';
import { SharedModule } from 'src/app/@shared/shared.module';
import {CustomCreateFormComponent} from "../../@shared/components/custom-create-form/custom-create-form.component";
import {AddEditSalesComponent} from "./add-edit-sales/add-edit-sales.component";
import {SalesListComponent} from "./sales-list/sales-list.component";
import {ReviewSalesComponent} from "./review-sales/review-sales.component";
import {SalesDetailsComponent} from "./sales-list/sales-details/sales-details.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [SalesPage,AddEditSalesComponent,SalesListComponent,ReviewSalesComponent,SalesDetailsComponent]
})
export class SalesPageModule {}
