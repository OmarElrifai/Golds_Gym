import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionsSchedualPageRoutingModule } from './sessions-schedual-routing.module';

import { SessionsSchedualPage } from './sessions-schedual.page';
import { SharedModule } from 'src/app/@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionsSchedualPageRoutingModule,
    SharedModule
  ],
  declarations: [SessionsSchedualPage]
})
export class SessionsSchedualPageModule {}
