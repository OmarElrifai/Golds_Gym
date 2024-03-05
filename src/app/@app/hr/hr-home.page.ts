/// <reference types="web-bluetooth" />
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/@shared/shared.service';
import { HrHomePageData , actions} from './hrHomePageData';
import {AlertController, IonContent, ModalController, PopoverController} from "@ionic/angular";
import {CheckInOutComponent} from "./time-management/check-in-out/check-in-out.component";

@Component({
  selector: 'app-hr',
  templateUrl: './hr-home.page.html',
  styleUrls: ['./hr-home.page.scss'],
})
export class HrHomePage implements OnInit {

  @ViewChild('video') video!:ElementRef;
  @ViewChild('canvas') canvas!:ElementRef;
  public videoElement :any;
  public canvasContext :any;
  public segments = HrHomePageData.segment;
  public timeCards = HrHomePageData.timeSegment;
  public devCards = HrHomePageData.devSegment;
  public employee :any;
  public segmentValue = "time";
  public videoOn:boolean = false;
  public checkType:any;
  public mediaStream:any;
  constructor(public shared:SharedService,private router:Router, private popoverController:PopoverController ,private modalController:ModalController, ) {
    this.shared.getEmployee()
  }





  ngOnInit() {

  }



  onSegmentChange(segmentChange:any){
    console.log(segmentChange)
    this.segmentValue = segmentChange
  }
  async openTabs(action:any){
    let mobileNavigatorObject= window.navigator
    switch(action){
      case actions.clockIn:
        // this.initiateCheckIn();
        navigator.bluetooth.requestDevice({acceptAllDevices:true}).then((devices:any)=>{
          console.log(devices)
          return devices.gatt.connect()
        }).then((connection:any)=>{
          console.log(connection)
        })
        break;


      case actions.clockOut:
        this.initiateCheckOut();
        break;

      case actions.openAttendance:
        this.router.navigateByUrl("/hr/attendance");
        break;

      case actions.openLeaves:
        this.router.navigateByUrl("/hr/leaves");
        break;

      case actions.openPayslips:
        this.router.navigateByUrl("/hr/payslips");
        break;

      default:
        this.router.navigateByUrl("/hr");



    }
  }
  async initiateCheckIn(){
    const checkin = await this.popoverController.create({
      component:CheckInOutComponent,
      componentProps:{id:this.shared.employee.id,checkType:"in"},
      cssClass:"cameraPopOver"
    });
    checkin.present();
  }

  async initiateCheckOut(){
    const checkOut = await this.popoverController.create({
      component:CheckInOutComponent,
      componentProps:{id:this.shared.employee.id,checkType:"out"},
      cssClass:"cameraPopOver"
    });
    checkOut.present();
  }


  closeCheckOut(){
    this.mediaStream.getTracks().forEach(function(track:any) {
      track.stop();
    });
    this.videoOn = false;
  }

}
