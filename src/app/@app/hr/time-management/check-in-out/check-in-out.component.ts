import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonContent, PopoverController} from "@ionic/angular";
import jsQR from "jsqr";
import {WorldTimeAPIService} from "../../../../@shared/services/world-time-api.service";
import {CheckInOutService} from "./check-in-out.service";
import {SharedService} from "../../../../@shared/shared.service";
import {thunderstorm} from "ionicons/icons";
import {Camera, CameraResultType} from "@capacitor/camera";

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.scss'],
})
export class CheckInOutComponent  implements OnInit {

  @ViewChild('video') video!:ElementRef;
  @ViewChild('canvas') canvas!:ElementRef;
  @ViewChild('content') content!:IonContent;
  // @ViewChild('fileinput', { static: false }) fileinput: ElementRef;
  @Input() id:any;
  @Input() checkType:any;
  public videoElement :any;
  public canvasContext :any;
  public mediaStream:any;
  public ionContentHeight:any;
  public canvasElement:any;
  private sound=new Audio("assets/bell.mp3");
  private isSupported: any;
  private user_id = localStorage.getItem("user_id")
  private scanResult: any;

  constructor(
    private popoverCtrl:PopoverController,
    private worldTimeAPIService:WorldTimeAPIService,
    private checkInOutService:CheckInOutService,
    private shared:SharedService,
    private alertCtrl:AlertController
    ) { }
  //
  ngOnInit() {
  }
  //
  ionViewDidEnter(){
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
    this.adjustIonContentHeight();
    this.openVideo();

  }

  ionViewWillLeave(){
    this.closeCheckOut();
  }
  adjustIonContentHeight(){
    let element
    for (const [key, value] of Object.entries(this.content)) {
      // print key and value on console
      if(key == "el"){
        element = value
      }
    }
    let width = element.clientWidth;
    let height = width-105;
    this.ionContentHeight=height+"px";

  }
  async openVideo(){
    this.mediaStream = await navigator.mediaDevices.getUserMedia(
      {video:{facingMode:"environment"}}
    )
    this.videoElement.srcObject=this.mediaStream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }

  scan(){
    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
      this.canvasElement.width=this.videoElement.videoWidth;
      this.canvasElement.height=this.videoElement.videoHeight;
      this.canvasContext.drawImage(this.videoElement,0,0,this.canvasElement.width,this.canvasElement.height);
      const imageData =this.canvasContext.getImageData(0,0,this.canvasElement.width,this.canvasElement.height);
      const code = jsQR(imageData.data,imageData.width,imageData.height,{
        inversionAttempts:"dontInvert"
      });
      this.scanResult = code?.data;
      if(code){
        this.clockNow(this.scanResult.split('&&')[1])
      }else {
        requestAnimationFrame(this.scan.bind(this));
      }
    }else {
      requestAnimationFrame(this.scan.bind(this));
    }


  }

  clockNow(time:any) {
    this.worldTimeAPIService.fetchTimeOnline().subscribe((res:any)=>{
      console.log('time: ',time)
      console.log('currenttimeparsed: ',res.time)
      let currentTime = new Date(res.time),
        attendanceTime = new Date(time);
      let timeDiff = (+currentTime - +attendanceTime),
        minInMillSeconds = 70000
      if (timeDiff < minInMillSeconds) {
        let clockMethod = this.checkType == "out" ?
          this.checkInOutService.checkOut(this.formatDate(new Date()), this.user_id)
          : this.checkInOutService.checkIn(this.formatDate(new Date()), this.user_id);
        clockMethod.then(async (res: any) => {
          // this.util.dismissLoading()
          if (res.data == true || typeof res.data == "number") {
            const alert = await this.alertCtrl.create({
              header:"Success",
              message:`You clocked ${this.checkType} successfully`,
              buttons:[
                {
                  text:"OK",
                  handler:()=>{
                    this.popoverCtrl.dismiss();
                  }
                }
              ]
            })
            alert.present();
            this.sound.play()
          } else {
            let error = res.faultString ? res.faultString.split("doo.exceptions.ValidationError: ") : res.data
            if (error[0].indexOf("Cannot create new attendance") != -1){
              const alert = await this.alertCtrl.create({
                header:"Warning",
                message:`You already clocked ${this.checkType}`,
                buttons:[
                  {
                    text:"OK",
                    handler:()=>{
                      this.popoverCtrl.dismiss();
                    }
                  }
                ]
              })
              alert.present();
            }else{
              const alert = await this.alertCtrl.create({
                header:"Error",
                message:error,
                buttons:[
                  {
                    text:"OK",
                    handler:()=>{
                      this.popoverCtrl.dismiss();
                    }
                  }
                ]
              })
              alert.present();
            }
            // this.util.showAlert(this.transVal["Error"], this.transVal[error] != undefined ? this.transVal[error] : error)
          }
        }).catch(async e => {
          // this.util.dismissLoading()
          const alert = await this.alertCtrl.create({
            header:"Error",
            message:`Check ${this.checkType} error, please contact administrator to fix the issue`,
            buttons:[
              {
                text:"OK",
                handler:()=>{
                  this.popoverCtrl.dismiss();
                }
              }
            ]
          })
          alert.present();
          console.log(e);
          // this.util.showAlert(this.transVal["Error"], this.transVal[`Your check ${this.clockType} Error please try again`])
        })
      } else {
        this.alertCtrl.create({
          header:"Error",
          message:`Check ${this.checkType} error, invalid Check ${this.checkType} date`,
          buttons:[
            {
              text:"OK",
              handler:()=>{
                this.popoverCtrl.dismiss();
              }
            }
          ]
        }).then((alert:any)=>{
          alert.present();
        })
      }
    })

  }

  checkTime(time:any):any {
    console.log('time: ',time)
    return this.worldTimeAPIService.fetchTimeOnline().subscribe((res:any)=>{
      console.log('time: ',time)
      console.log('currenttimeparsed: ',res.time)
      let currentTime = new Date(res.time),
        attendanceTime = new Date(time);
      let timeDiff = (+currentTime - +attendanceTime),
        minInMillSeconds = 70000
      if (timeDiff < minInMillSeconds) {
        return true
      } else {
        return false
      }
    })

  }


  // checkTime(time:any):any {
  //   console.log('time: ',time)
  //   return this.worldTimeAPIService.fetchTimeOnline().subscribe((res:any)=>{
  //     console.log('time: ',time)
  //     console.log('currenttimeparsed: ',res.time)
  //     let currentTime = new Date(res.time),
  //       attendanceTime = new Date(time);
  //     let timeDiff = (+currentTime - +attendanceTime),
  //       minInMillSeconds = 70000
  //     if (timeDiff < minInMillSeconds) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   })
  //
  // }


  formatDate(date:Date){
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
  closeCheckOut(){
    this.mediaStream.getTracks().forEach(function(track:any) {
      track.stop();
    });

  }



}
