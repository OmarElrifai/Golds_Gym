/// <reference types="web-bluetooth" />
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/@shared/shared.service';
import { Device } from '@capacitor/device';
import {UtilService} from "../../../@shared/services/util.service";
import {AlertController} from "@ionic/angular";
import {AppComponent} from "../../../app.component";
import { BleClient } from '@capacitor-community/bluetooth-le';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),

    password: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required, Validators.required],
    }),
  });

  submit:boolean = false
  constructor(private app:AppComponent, private auth: AuthService,private router:Router,private shared: SharedService ,private utils:UtilService, private alertCtrl:AlertController) { }

  ngOnInit() {

  }

  async login() {
    if(this.loginForm.valid){
      this.auth.loginUser({
        username: this.loginForm.controls["username"].value,
        password: this.loginForm.controls["password"].value
      }).then(async (userObj: any) => {
        let user = userObj;
         const deviceUUID= await Device.getId();
        this.shared.user_id = user.user.id
        this.shared.user_token = user.token
        console.log(deviceUUID);
        for(var i = 0 ; i<10;i++){
          const deviceUUID= await Device.getId();
          console.log(deviceUUID);
        }
        this.auth.setUserMac(this.shared.user_id,deviceUUID.identifier).then(async (res: any) => {
          if (res.data !== "False Mac") {
            localStorage.setItem("token", user.token)
            localStorage.setItem("user_id", user.user.id)
            localStorage.setItem("login", "true")
            localStorage.setItem("login_name", this.loginForm.controls["username"].value)
            this.auth.getProfile(this.shared.user_id)
              .then(async (emp: any) => {
                //to store employee profile in shared service to use at any page or service
                if(emp.data){
                  this.shared.employee = emp.data[0];
                  await Preferences.set({
                    key: 'app_user',
                    value: JSON.stringify({token: user.token, userID: user.user.id}),
                  });
                  this.router.navigateByUrl("/home");
                  this.app.showInstallPromotion();
                }else{
                  let alert = await this.alertCtrl.create({
                    header: "Error",
                    message: "Couldn't load profile data, please contact administrator",
                    buttons: [
                      {
                        text: "Okay",
                        role: "cancel"
                      }
                    ]
                  })
                  alert.present();
                  console.log(emp.faultString)
                }
              }).catch(async (err: any) => {
              let alert = await this.alertCtrl.create({
                header: "Error",
                message: "Couldn't load profile data, please contact administrator",
                buttons: [
                  {
                    text: "Okay",
                    role: "cancel"
                  }
                ]
              })
              alert.present();
              console.log(err)
            });
          } else {
            let alert = await this.alertCtrl.create({
              header: "Error",
              message: "Sorry can't log you in, your account is logged in from another device, please contact administrator to remove old device",
              buttons: [
                {
                  text: "Okay",
                  role: "cancel"
                }
              ]
            })
            alert.present();
          }
        })


      }).catch(async (err:any)=>{
        let alert = await this.alertCtrl.create({
          header:"Error",
          message:"Invalid username or password",
          buttons:[
            {
              text:"Okay",
              role:"cancel"
            }
          ]
        })
        alert.present();
      })
      //   .subscribe(async (res: any) => {
      //   this.router.navigateByUrl('/home')
      //   await Preferences.set({
      //     key: 'app_user',
      //     value: JSON.stringify({token:res.token,userID:res.user.id}),
      //   });
      //   this.shared.employee = {
      //     id:res.user.id,
      //     name:"Mohamed Asran",
      //     profileImg:"/assets/moSalah.PNG",
      //     role:"HR Executive",
      //     employeePin:"admin",
      //     phone:"01096318473",
      //     email:"MA20@gmail.com",
      //     birthday:"2022-09-01",
      //     gender:"male"
      //   }
      // });
    }

    // await BleClient.initialize({ androidNeverForLocation: true });
    //
    // const device = await BleClient.requestDevice();
    // device.then(()=>{
    //
    // })
  }


}
