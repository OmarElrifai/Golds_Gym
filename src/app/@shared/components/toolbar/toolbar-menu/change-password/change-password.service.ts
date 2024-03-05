import { Injectable } from '@angular/core';
import {ConfigService} from "../../../../services/config.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private headers = {
    "Content-Type": "application/json",
  }
  constructor(private config:ConfigService, private http:HttpClient) { }

  changePassword(user_id:any, currentPass:any, newPass:any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.changePassword, {
          "paramlist": {
            data: {
              "user_id": user_id,
              "old_pass": currentPass,
              "new_pass":newPass
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

}
