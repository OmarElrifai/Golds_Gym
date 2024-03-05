import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Preferences} from "@capacitor/preferences";
import {ProgramsService} from "../../../services/programs.service";
import {AlertController, ModalController} from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss'],
})
export class CreateSessionComponent  implements OnInit {

  @Input() session:any;

  sessionForm = new FormGroup({
    session_time: new FormControl(null,Validators.required),
    attend_ids: new FormControl(null,Validators.required),
    date_deadline: new FormControl(null,Validators.required)
  });

  constructor(private programServices:ProgramsService,
              private modalCtrl:ModalController,
              private alertCtrl:AlertController,
              private router:Router
              ) { }


  ngOnInit() {

  }

  openCalendar(session:any){
    this.router.navigate(['/calendar'],{state:{session:session}})
  }

  submit() {
    this.session.session_time = this.sessionForm.controls.session_time.value;
    this.session.attend_ids = this.sessionForm.controls.attend_ids.value;
    this.session.date_deadline = this.sessionForm.controls.date_deadline.value;
    this.programServices.updateSession(this.session).subscribe(async(res:any)=>{
      if(res.data){
        const alert = await this.alertCtrl.create({
          header:"Success",
          message:"Session has been updated",
          buttons:[
            {
              text:"Ok",
              role:"cancel",
              handler:()=>{
                this.modalCtrl.dismiss(null,"confirmed")
              }
            }
          ]
        })
        alert.present()
      }else{
        const alert = await this.alertCtrl.create({
          header:"Error",
          message:"Unable to update session, please contact administrator",
          buttons:[
            {
              text:"Ok",
              role:"cancel",
              handler:()=>{
                this.modalCtrl.dismiss()
              }
            }
          ]
        })
        alert.present();
        console.log(res.faultString)
      }
    },async error=>{
      const alert = await this.alertCtrl.create({
        header:"Error",
        message:"Unable to update session, please contact administrator",
        buttons:[
          {
            text:"Ok",
            role:"cancel",
            handler:()=>{
              this.modalCtrl.dismiss()
            }
          }
        ]
      })
      alert.present();
      console.log(error.message)
    })
  }
}
