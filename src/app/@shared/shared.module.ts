import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCardComponent } from './components/list-card/list-card.component';
import { IonicModule } from '@ionic/angular';
import { CustomCreateFormComponent } from './components/custom-create-form/custom-create-form.component';
import { SegmentTabsComponent } from './components/segment-tabs/segment-tabs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HrHomeCardComponent } from './components/hr-home-card/hr-home-card.component';
import { ToolbarPage } from './components/toolbar/toolbar.page';
import {ToolbarMenuComponent} from "./components/toolbar/toolbar-menu/toolbar-menu.component";
import {NoDataComponent} from "./components/no-data/no-data.component";
import {ChangePasswordComponent} from "./components/toolbar/toolbar-menu/change-password/change-password.component";
import {ChangeLanguageComponent} from "./components/toolbar/toolbar-menu/change-language/change-language.component";
import {ProfilePhotoComponent} from "./components/profile-photo/profile-photo.component";
import {NgCalendarModule} from "ionic2-calendar";
import {CalendarSharedComponent} from "./components/calendar/calendar-shared.component";
import {CoverPhotoComponent} from "./components/cover-photo/cover-photo.component";
import {EditableListComponent} from "./components/editable-list/editable-list.component";
import {AttendeesComponent} from "./components/attendees/attendees.component";
import {SessionComponent} from "./components/session/session.component";
import {ViewAttendeesComponent} from "./components/calendar/task-details/view-attendees/view-attendees.component";
import {TaskDetailsComponent} from "./components/calendar/task-details/task-details.component";
import {SessionMenuComponent} from "./components/session/session-menu/session-menu.component";



@NgModule({
  declarations: [ListCardComponent,CustomCreateFormComponent,SegmentTabsComponent,HrHomeCardComponent,ToolbarPage,ToolbarMenuComponent,NoDataComponent,ChangePasswordComponent,ChangeLanguageComponent,ProfilePhotoComponent,CalendarSharedComponent,CoverPhotoComponent,EditableListComponent,AttendeesComponent,SessionComponent,ViewAttendeesComponent,TaskDetailsComponent,SessionMenuComponent],
  imports: [CommonModule,
            FormsModule,
            IonicModule,
            ReactiveFormsModule,
            NgCalendarModule,
  ],
  exports: [ListCardComponent,CustomCreateFormComponent,SegmentTabsComponent,HrHomeCardComponent,ToolbarPage,ToolbarMenuComponent,NoDataComponent,ProfilePhotoComponent,CalendarSharedComponent,CoverPhotoComponent,EditableListComponent,AttendeesComponent,SessionComponent,ViewAttendeesComponent,TaskDetailsComponent],
})
export class SharedModule {}
