import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../../../../../@shared/services/config.service";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private headers = {
    "Content-Type": "application/json",
  }

  constructor(private http:HttpClient, private config:ConfigService) { }

  getBalance(id:any){
    return this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.leavesBalance, {
          "paramlist": {
            data: {
              user_id: id,
            }
          }
        },
        { headers: this.headers }
      )
  }


}
