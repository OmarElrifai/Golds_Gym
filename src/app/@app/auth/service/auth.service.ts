import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {ConfigService} from "../../../@shared/services/config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = {
    "Content-Type": "application/json",
    "Authorization":""
  }
  constructor(private http: HttpClient ,private config:ConfigService) { }

  loginUser(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.login, data,
        { headers: this.headers }).subscribe(res => {
          let user = JSON.parse(JSON.stringify(res))
          this.headers["Authorization"] = "Bearer " + user.token
          resolve(res);
        }, e => {
          reject(e)
        })
    })

  }
  setUserMac(user_id:any, mac:any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.set_mac, {
          "paramlist": {
            data: {
              user_id: user_id,
              mac: mac
            }
          }
        },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      }, e => {
        reject(e)
      })
    })
  }
  getProfile(user_id:any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.employeeModel
        + this.config.searchRead, {
          paramlist: {
            filter: [["user_id","=",2]],
            fields: []
          }
        },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      }, e => {
        reject(e)
      })
    })
  }


}
