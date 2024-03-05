import {Injectable, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Preferences} from "@capacitor/preferences";
import {AuthService} from "../@app/auth/service/auth.service";
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class SharedService{
  public user_id: any;
  public user_token:any
  public employee: any
  public userProfile: any
  public deletedItem: boolean = false
  public teamMembers = []
  public haveTeam: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public allDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public allData: any
  public crmLeadId:any
  constructor(private auth:AuthService) {
    // this.getEmployee();
  }
  async getEmployee(){
    const { value } = await Preferences.get({ key: 'app_user' });
    if (value) {
      this.user_id = localStorage.getItem("user_id")
      this.auth.getProfile(this.user_id)
        .then((emp: any) => {
          //to store employee profile in shared service to use at any page or service
          this.employee = emp.data[0];
          console.log(emp)
        }).catch(res => {
          console.log(res)
      })
    }
  }

  sendMessageToWhatsapp() { }
}
