import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { SharedService } from 'src/app/@shared/shared.service';
import { register } from 'swiper/element/bundle';
import {AuthService} from "../auth/service/auth.service";
import {ModalController} from "@ionic/angular";
import {CalendarSharedComponent} from "../../@shared/components/calendar/calendar-shared.component";

register();
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public employee:any;
  constructor(private router:Router,public shared:SharedService,private auth:AuthService,private modalCtrl:ModalController) {

  }

  ngOnInit() {
    this.shared.getEmployee().then(()=>{
      this.employee = this.shared.employee
    })

  }

  async logoutUser() {
  await Preferences.remove({ key: 'app_user' });
  this.router.navigateByUrl('/auth')
  }

  async openCalendar() {
    const modal = await this.modalCtrl.create({
      component:CalendarSharedComponent,
      componentProps:{session:false,routeBackPath:'/home'}
    })
    modal.present();
  }
}
