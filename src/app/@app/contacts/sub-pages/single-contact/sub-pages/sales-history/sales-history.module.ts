import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesHistoryPageRoutingModule } from './sales-history-routing.module';

import { SalesHistoryPage } from './sales-history.page';
import { SharedModule } from 'src/app/@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesHistoryPageRoutingModule,
    SharedModule
  ],
  declarations: [SalesHistoryPage]
})
export class SalesHistoryPageModule {}
