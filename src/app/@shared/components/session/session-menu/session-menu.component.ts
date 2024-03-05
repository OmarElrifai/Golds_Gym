import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarSharedComponent} from "../../calendar/calendar-shared.component";
import {AlertController, ModalController, PopoverController} from "@ionic/angular";
import {ProgramsService} from "../../../services/programs.service";

@Component({
  selector: 'app-session-menu',
  templateUrl: './session-menu.component.html',
  styleUrls: ['./session-menu.component.scss'],
})
export class SessionMenuComponent  implements OnInit {

  @Input() event:any;
  @Input() session:any;
  @Output() updateView = new EventEmitter()
  constructor(private modalCtrl:ModalController,
              private alrtCtrl:AlertController,
              private programService:ProgramsService,
              private popverCtrl:PopoverController) { }

  ngOnInit() {}

  async updateSchedule(session:any) {
    this.popverCtrl.dismiss();
    const modal= await this.modalCtrl.create({
      component:CalendarSharedComponent,
      componentProps:{session:session}
    })

    modal.present()
  }

  async setStage(session:any) {
    this.popverCtrl.dismiss();
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
}
