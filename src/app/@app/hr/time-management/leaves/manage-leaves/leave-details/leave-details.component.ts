import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {LeavesService} from "../../services/leaves/leaves.service";
import {SharedService} from "../../../../../../@shared/shared.service";
import {AddEditComponent} from "./add-edit/add-edit.component";

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss'],
})
export class LeaveDetailsComponent  implements OnInit {

  @Input() isManager:any;
  @Input() leave:any
  user_id = localStorage.getItem("user_id")

  constructor(private sharedService:SharedService, private modalCtrl:ModalController, private alertCtrl:AlertController, private leavesService:LeavesService) { }

  ngOnInit() {
    console.log(this.leave.state)
  }
  async submit(){
    this.leavesService.updateLeaveState(this.leave.id, "confirm", this.user_id).then(async (res:any)=>{
      if (res.faultString) {
        this.showAlert("Error", res.faultString)
      } else {
        const alert = await this.alertCtrl.create({
          header:"Ok",
          message:"Leave has been submitted",
          buttons:[{
            text:"Ok",
            handler:()=>{
              this.modalCtrl.dismiss(null,'reload');            }
          }]
        });
        alert.present();

      }
    }).catch(e => {
      this.showAlert("Error", "Leave submission error, please contact adminstrator");
      console.log(e)
    })
  }
  async delete(){
    this.leavesService.deleteLeave(this.leave.id).then(async (res:any)=>{
      if (res.faultString) {
        this.showAlert("Error", res.faultString)
      } else {
        const alert = await this.alertCtrl.create({
          header:"Ok",
          message:"Leave has been deleted",
          buttons:[
            {
              text:"Ok",
              handler:async()=>{
                this.modalCtrl.dismiss(null,'reload');              }
            }
          ]
        });
        alert.present();

      }
    }).catch(e => {
      this.showAlert("Error", "Leave deletion error, please contact adminstrator");
      console.log(e)
    })


  }
  async showAlert(header:any, message:any){
    const alert = await this.alertCtrl.create({
      header:header,
      message:message,
      buttons:[
        {
          text:"Ok",
          role:"cancel"
        }
      ]
    });
    alert.present();
  }
  async edit(){
    const editForm = await this.modalCtrl.create({
      component:AddEditComponent,
      componentProps:{leave:this.leave,newLeave:false},
      cssClass:'custom-modal'
    });
    await editForm.present();
    editForm.onDidDismiss().then(()=>{
      this.modalCtrl.dismiss(null,'reload');
    })
  }

  approve(){
    this.leavesService.approveLeave(this.leave.id).then((res:any)=>{
      if(res.data){
        this.showAlert("Success","Leave has been approved successfully").then(()=>{
          this.modalCtrl.dismiss(null,'reload');
        })
      }else{
        this.showAlert("Error",res.faultString)
      }

    }).catch((err)=>{
      this.showAlert("Error","Leave could not be approved, please contact administrator")
      console.log(err);
    })
  }

  reject(){
    this.leavesService.rejectLeave(this.leave.id).then((res:any)=>{
      if(res.data){
        this.showAlert("Success","Leave has been rejected").then(()=>{
          this.modalCtrl.dismiss(null,'reload');
        })
      }else{
        this.showAlert("Error",res.faultString)
      }

    }).catch((err)=>{
      this.showAlert("Error","Leave could not be rejected, please contact administrator")
      console.log(err);
    })
  }


}
