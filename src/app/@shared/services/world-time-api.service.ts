import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class WorldTimeAPIService {

  constructor(private http:HttpClient, private configService:ConfigService) { }

  fetchTimeOnline(){
    return this.http.get((`${this.configService.baseurl}Fetch-server-time`))
  }
}
