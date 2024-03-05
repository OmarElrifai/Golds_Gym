import {Component, OnDestroy, OnInit} from '@angular/core';
import{ HrHomePageData , actions} from "../../../hrHomePageData";
import {ModalController, NavController, PopoverController} from "@ionic/angular";
import {LeavesService} from "../services/leaves/leaves.service";
import {LeaveDetailsComponent} from "./leave-details/leave-details.component";
import {SharedService} from "../../../../../@shared/shared.service";
import {AddEditComponent} from "./leave-details/add-edit/add-edit.component";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-manage-leaves',
  templateUrl: './manage-leaves.page.html',
  styleUrls: ['./manage-leaves.page.scss'],
})
export class ManageLeavesPage implements OnInit ,OnDestroy{
  public leavesSegments = HrHomePageData.LeavesSegment;
  public selectedTab=actions.toBeSubmitted;
  public updatedLeaves:any = new Observable();
  public leaves:any;
  public leavesObservable:any = new Observable();
  private approvedSubscription : any = new BehaviorSubject(null) ;
  private rejectedSubscription : any = new BehaviorSubject(null);
  private pendingSubscription : any = new BehaviorSubject(null);
  private toBeSubmittedSubscription : any = new BehaviorSubject(null);
  private toBeSubmitted: any;
  private pending: any;
  private approved: any;
  private rejected: any;
  private user_id:any = localStorage.getItem("user_id")

  constructor(private modalCtrl:ModalController,
              private leavesService:LeavesService ,
              private sharedService:SharedService,
              private popOverCtrl:PopoverController,
              private navCtrl:NavController) { }

  ngOnInit() {
    // this.leavesService.assignLeavesForEachTab();
    this.setLeaves();
  }

  ionViewDidEnter(){
    console.log("selected Tabs ",this.selectedTab)
  }
  setLeaves(){

    this.leavesService.getDraftLeaves(parseInt(this.user_id)).subscribe((leaves:any)=>{
      this.toBeSubmitted = leaves.data
      console.log("draft ",leaves.data)
      this.setSegmentsValues(this.selectedTab)

    });


    this.leavesService.getConfirmedLeaves(parseInt(this.user_id)).subscribe((leaves:any)=>{
      this.pending = leaves.data
      console.log("confirmed ",leaves.data)
      this.setSegmentsValues(this.selectedTab)

    });

    this.leavesService.getValidateLeaves(parseInt(this.user_id)).subscribe((leaves:any)=>{
      this.approved = leaves.data
      console.log("approved ",leaves.data)
      this.setSegmentsValues(this.selectedTab)

    });

    this.leavesService.getRefusedLeaves(parseInt(this.user_id)).subscribe((leaves:any)=>{
      this.rejected = leaves.data
      console.log("refused ",leaves.data)
      this.setSegmentsValues(this.selectedTab)

    });



  }

  setSegmentsValues(event:any){
    switch (event){
      case actions.approved:
        this.leaves = this.approved;
        break;

      case actions.pending:
        this.leaves = this.pending;
        break;

      case actions.rejected:
        this.leaves = this.rejected;
        break;

      default:
        this.leaves = this.toBeSubmitted;

    }
    this.selectedTab = event;
  }


  async openLeaveDetail(leave:any){
    const leaveModal = await this.modalCtrl.create({
      component:LeaveDetailsComponent,
      componentProps:{leave:leave},
      cssClass:'custom-modal'
    });
    await leaveModal.present();
    const {data,role} = await leaveModal.onDidDismiss();
    if(role == "reload"){
      this.setLeaves();
    }
  }

  async createNewLeave(){
    const leaveModal = await this.modalCtrl.create({
      component:AddEditComponent,
      cssClass:'custom-modal',
      componentProps:{newLeave:true}
    });
    leaveModal.present();
    const {data,role} = await leaveModal.onDidDismiss();
    if(role == "reload"){
      this.setLeaves();
    }
  }

  unsubscribe(){
    this.toBeSubmittedSubscription.unsubscribe();
    this.pendingSubscription.unsubscribe();
    this.approvedSubscription.unsubscribe();
    this.rejectedSubscription.unsubscribe();
  }
  ngOnDestroy() {
    this.unsubscribe()
  }

}
