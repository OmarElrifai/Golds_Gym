import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../../../@shared/services/config.service";

@Injectable({
  providedIn: 'root'
})
export class CheckInOutService {
  headers = {
    "Content-Type": "application/json",
  }
  constructor(public http: HttpClient, public config:ConfigService) {
    this.headers
  }

  checkIn(date:any, user_id:any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.checkIn, {
          "paramlist": {
            data: {
              user_id: user_id,
              check_in: date
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
  checkOut(date:any, user_id:any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.checkOut, {
          "paramlist": {
            data: {
              user_id: user_id,
              check_out: date
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
