import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordService} from "./change-password.service";
import {SharedService} from "../../../../shared.service";
import {UtilService} from "../../../../services/util.service";
import {AlertController, PopoverController} from "@ionic/angular";
import {text} from "ionicons/icons";
import {AuthService} from "../../../../../@app/auth/service/auth.service";
import {Preferences} from "@capacitor/preferences";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent  implements OnInit {
  changePassword :any = new FormGroup(
    {
      oldPassword:new FormControl("",Validators.required),
      newPassword:new FormControl("",Validators.required),
      repeatedPassword:new FormControl("",Validators.required)
    }
  );

  constructor(private popOverCtrl:PopoverController,private alertCtrl:AlertController,private changePasswordService:ChangePasswordService,private sharedService:SharedService,private authService:AuthService) {
  this.sharedService.getEmployee()
  }

  ngOnInit() {}

  async submit() {
    if (this.changePassword.valid) {
      if (this.changePassword.controls.newPassword.value == this.changePassword.controls.repeatedPassword.value) {
        this.changePasswordService.changePassword(this.sharedService.user_id, this.changePassword.controls.oldPassword.value, this.changePassword.controls.newPassword.value).then(async (res: any) => {
          if (JSON.parse(JSON.stringify(res)).data) {
            this.authService.loginUser({
              username: this.sharedService.employee.registration_number,
              password: this.changePassword.controls.newPassword.value
            }).then(async (loggedIn: any) => {
              let user = loggedIn;
              localStorage.setItem("token", user.token)
              localStorage.setItem("user_id", user.user.id)
              localStorage.setItem("login", "true")
              this.sharedService.user_id = user.user.id
              this.sharedService.user_token = user.token
              await Preferences.set({
                key: 'app_user',
                value: JSON.stringify({token:user.token,userID:user.user.id}),
              });
              const alert = await this.alertCtrl.create({
                header: "Okay",
                message: "Password has been updated successfully",
                buttons: [
                  {
                    text: 'Okay',
                    role:'cancel',
                    handler:()=>{
                      this.popOverCtrl.dismiss()
                    }
                  }
                ]
              })
              alert.present();
            })
          } else {
            const alert = await this.alertCtrl.create({
              header: "Error",
              message: "Password could not be changed, please contact administrator",
              buttons: [
                {
                  text: 'Okay',
                  role: 'cancel'
                }
              ]
            })
            alert.present();
            console.log(res)
          }
        }).catch(async(err)=>{
          const alert = await this.alertCtrl.create({
            header: "Error",
            message: "Password could not be changed, the server might be unreachable, please contact administrator",
            buttons: [
              {
                text: 'Okay',
                role: 'cancel'
              }
            ]
          })
          alert.present();
          console.log(err)
        })
      } else {
        const alert = await this.alertCtrl.create({
          header: "Error",
          message: "New and Repeated Passwords do not match",
          buttons: [
            {
              text: 'Okay',
              role: 'cancel'
            }
          ]
        })
        alert.present();
      }
    }
  }
}
