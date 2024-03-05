import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramsPageRoutingModule } from './programs-routing.module';

import { ProgramsPage } from './programs.page';
import { SharedModule } from 'src/app/@shared/shared.module';
import {ProgramViewComponent} from "../../@shared/components/view-programs/program-view.component";
import { AttendeesListComponent } from '../../@shared/components/view-programs/attendees-list/attendees-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ProgramsPage,ProgramViewComponent,AttendeesListComponent]
})
export class ProgramsPageModule {}
