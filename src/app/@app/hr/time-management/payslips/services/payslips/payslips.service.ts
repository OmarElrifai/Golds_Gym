import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../../../../../@shared/services/config.service";

@Injectable({
  providedIn: 'root'
})
export class PayslipsService {

  private headers = {
    "Content-Type": "application/json",
  }
  constructor(private http:HttpClient,private config:ConfigService) { }

  getPayslips(id:any){
    return this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.searchPayslip, {
          "paramlist": {
            data: {
              user_id: id
            }
          }
        },
        { headers: this.headers }
      )
  }

}
