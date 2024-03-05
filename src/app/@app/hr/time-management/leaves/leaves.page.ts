import { Component, OnInit } from '@angular/core';
import { HrHomePageData, actions } from '../../hrHomePageData';
import { SharedService } from 'src/app/@shared/shared.service';
import { Router } from '@angular/router';
import {LeavesService} from "./services/leaves/leaves.service";

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.page.html',
  styleUrls: ['./leaves.page.scss'],
})
export class LeavesPage implements OnInit {

  public buttons:any ;
  public employee :any;
  constructor(public shared:SharedService,private router:Router,private leavesService:LeavesService) {

  }

  ngOnInit() {
    console.log(this.shared.employee)
  }

  ionViewWillEnter(){
    this.leavesService.getLeavesToApprove();
  }

  ionViewDidEnter(){
    this.buttons = HrHomePageData.leavesButtons
    this.leavesService.leavesToApproveObservable.subscribe((leaves:any)=>{
      if(leaves.length > 0){
        this.buttons.map((button:any)=>{
          button.text == "Leaves To Approve" ? button.hasNotification = true : null;
        });
      }else{
        this.buttons.map((button:any)=>{
          button.text == "Leaves To Approve" ? button.hasNotification = false : null;
        });
      }

    })
    console.log(this.buttons)

  }
  openTabs(action:any){
    switch(action){
      case actions.leaves:
      this.router.navigateByUrl("/hr/leaves/manage-leaves");
      break;

      case actions.leavesToApprove:
      this.router.navigateByUrl("/hr/leaves/leave-to-approve");
      break;

      case actions.leavesBalance:
      this.router.navigateByUrl("/hr/leaves/balance");
      break;

      default:
      this.router.navigateByUrl("/hr");



    }
  }

}
