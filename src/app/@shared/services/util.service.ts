import { Injectable } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {SharedService} from "../shared.service";
import {AuthService} from "../../@app/auth/service/auth.service";
import {Preferences} from "@capacitor/preferences";
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isModal = ""

  isLoading = false;
  langSubject = new BehaviorSubject("")
  pageClass = ""
  constructor(
    public navCntrl: NavController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public alertContrl: AlertController,
    public navControl: NavController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public shared: SharedService,
    private authService:AuthService,
    // private trans: TranslateService
  ) { }
  popBack() {
    this.navCntrl.pop();
  }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
  async showAlert(header:any, message:any) {
    const alert = await this.alertContrl.create({
      header: header,
      message: message,
      backdropDismiss: false,
      buttons: ['ok']
    });
    await alert.present();
  }
  async showApiAlert(header:any, message:any) {
    const alert = await this.alertContrl.create({
      header: header,
      message: message,
      backdropDismiss: false,
    });
    await alert.present();
  }

  async ResponseAlert(response:any,successMessage:any,successCallBack:any,failureMessage:any){
    if(response.data){
      const alert = await this.alertContrl.create({
        header:"Success",
        message:successMessage,
        buttons:[{
          text:"Ok",
          handler:successCallBack()
        }]
      });
      alert.present();
    }else{
      const alert = await this.alertContrl.create({
        header:"Error",
        message:failureMessage,
        buttons:[{
          text:"Ok",
          role:"cancel"
        }]
      });
      alert.present();
      console.log(response.faultString)
    }
  }
  async showConfirmAlert(header:any, message:any, successMessage:any) {
    const confirm = await this.alertContrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.showAlert("Smart HR", successMessage);
          },
        },
      ],
    });
    await confirm.present();
  }

  deleteAlert(header:any, message:any) {
    return new Promise((resolve) => {
      let self = this;
      async function asyncCall(self:any) {
        const confirm = await self.alertContrl.create({
          header: header,
          message: message,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {

              },
            },
            {
              text: 'OK',
              handler: () => {
                resolve('ok')
              },
            },
          ],
        });
        await confirm.present();
      }
      asyncCall(self);
    })
  }


  async logout(header:any, message:any, color:any) {
    let transVal: any
    // this.trans.get([
    //   "Cancel",
    //   "OK"
    // ]).subscribe((res:any) => {
    //   transVal = res
    // })
    const confirm = await this.alertContrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: transVal["Cancel"],
          role: 'cancel',
          handler: () => { },
        },
        {
          text: transVal["OK"],
          handler: async () => {
            await Preferences.remove({ key: 'app_user' });
            await this.router.navigateByUrl('/auth');
            confirm.dismiss()
          },
        },
      ],
    });
    await confirm.present();
  }
  async loading(message = "") {
    if (this.isLoading) return;
    this.isLoading = true;
    return await this.loadingCtrl.create({
      // duration: 5000,
      message: message
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss()
        }
      });
    });
  };
  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss();
  }
  getParams(key:any) {
    return new Promise((resolve, reject) => {
      this.activatedRoute.queryParams.subscribe(params => {
        // @ts-ignore
        if (this.router.getCurrentNavigation().extras.state) {
          // @ts-ignore
          resolve(this.router.getCurrentNavigation().extras.state[key]);
        }
        else {
          reject('no-params');
        }
      });
    });
  }
  formatDate(date:any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hours = '' + d.getHours(),
      min = '' + d.getMinutes(),
      seconds = '' + d.getSeconds()
    if (hours.length < 2)
      hours = '0' + hours
    if (min.length < 2)
      min = '0' + min
    if (seconds.length < 2)
      seconds = '0' + seconds
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    var ymd = [year, month, day].join('-'),
      hms = [hours, min, seconds].join(':')
    return ymd + " " + hms;
  }
  formatDateYYYMMDD(date:any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }
  changeLanguage(lang:any) {
    localStorage.setItem("lang", lang)
    this.langSubject.next(lang)
  }
}
