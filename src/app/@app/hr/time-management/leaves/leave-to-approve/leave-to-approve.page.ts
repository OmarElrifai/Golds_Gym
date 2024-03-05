import { Component, OnInit } from '@angular/core';
import {actions, HrHomePageData} from "../../../hrHomePageData";
import {ModalController} from "@ionic/angular";
import {LeavesService} from "../services/leaves/leaves.service";
import {LeaveDetailsComponent} from "../manage-leaves/leave-details/leave-details.component";
import {SharedService} from "../../../../../@shared/shared.service";

@Component({
  selector: 'app-leave-to-approve',
  templateUrl: './leave-to-approve.page.html',
  styleUrls: ['./leave-to-approve.page.scss'],
})
export class LeaveToApprovePage implements OnInit {

  public leavesSegments = HrHomePageData.LeavesSegment;
  public tabs=[{
    text:"Pending",
    key:"pending"
  }];
  public leaves:any= [];
  constructor(private modalCtrl:ModalController,private leavesService:LeavesService) { }

  ngOnInit() {
    this.leavesService.getLeavesToApprove();
  }

  ionViewDidEnter(){
    this.leavesService.leavesToApproveObservable.subscribe((leaves:any)=>{
      console.log(leaves)
      this.leaves = leaves
    })
  }

  async openLeaveDetail(leave:any){
    const leaveModal = await this.modalCtrl.create({
      component:LeaveDetailsComponent,
      componentProps:{leave:leave,isManager:true},
      cssClass:"custom-modal"
    });
    leaveModal.present();
  }

}
