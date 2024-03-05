import { Component, OnInit } from '@angular/core';
import { HrHomePageData, actions } from '../../hrHomePageData';
import { SharedService } from 'src/app/@shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  public buttons = HrHomePageData.attendanceButtons;
  public employee :any;
  constructor(private router:Router) {

  }

  ngOnInit() {
  }

  openTabs(action:any){
    switch(action){
      case actions.byMonth:
      this.router.navigateByUrl("/hr/attendance/attendance-list");
      break;

      case actions.review:
      this.router.navigateByUrl("/hr/attendance/attendance-review");
      break;

      case actions.penalty:
      this.router.navigateByUrl("/hr/attendance/attendance-penalty");
      break;

      default:
      this.router.navigateByUrl("/hr");



    }
  }

}
