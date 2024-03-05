import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertController, ModalController, PopoverController} from "@ionic/angular";
import {AttendeesListComponent} from "../view-programs/attendees-list/attendees-list.component";
import {Router} from "@angular/router";
import {CalendarSharedComponent} from "../calendar/calendar-shared.component";
import {ProgramsService} from "../../services/programs.service";
import {SessionMenuComponent} from "./session-menu/session-menu.component";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent  implements OnInit {
  @Input() editAttendance: any;
  @Input() editSchedule:any;
  @Input() isMenuVisible:any;
  @Input() results:any;
  @Output() updateView = new EventEmitter();

  constructor(private modalCtrl:ModalController,
              private alrtCtrl:AlertController,
              private router:Router,
              private programService:ProgramsService,
              private popverCtrl:PopoverController) { }

  ngOnInit() {

  }

  async addViewAttendees(session:any){
    const modal= await this.modalCtrl.create({
      component:AttendeesListComponent,
      componentProps:{session:session,editAttendance:this.editAttendance},
      cssClass:"custom-modal"
    })
    modal.present()
    modal.onDidDismiss().then(()=>{
      this.updateView.emit();
    })
  }

  async updateSchedule(session:any) {
    const modal= await this.modalCtrl.create({
      component:CalendarSharedComponent,
      componentProps:{session:session}
    })

    modal.present()
  }

  async setStage(session:any) {
    const alert = await this.alrtCtrl.create({
      header:"Confirm",
      message:`Are you sure you want to set ${session.name} as completed?`,
      buttons:[
        {
          text:"Confirm",
          handler:()=>{
            this.programService.updateSession({"id":session.id,"stage_id":19}).subscribe(async(res:any)=>{
              if(res.faultString){
                const alert = await this.alrtCtrl.create({
                  header:"Error",
                  message:"Unable to change session status, Please contact administrator",
                  buttons:[
                    {
                      text:"Ok",
                      role:"cancel"
                    }
                  ]
                })
                alert.present();
                console.log(res.faultString)
              }else{
               this.updateView.emit()
              }
            })
          }
        },{
            text:"cancel",
            role:"cancel"
        }
      ]
    })
    alert.present()

  }

  async openMenu(event:any,session:any) {
    const popOver = await this.popverCtrl.create({
      component:SessionMenuComponent,
      event:event,
      componentProps:{session:session,updateView:this.updateView}
    })
    popOver.present()
  }

  protected readonly menubar = menubar;
  isMenubarVisible: any;
}
