import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../../../../../@shared/services/config.service";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private attendance:any
  headers = {
    "Content-Type": "application/json",
  }
  //   = new Observable(observable =>{
  //   const attendance = [
  //     {
  //       employeeId:2,
  //       employeeName:"Mohamed Asran",
  //       checkIn:"2023-07-06 13:16:05",
  //       checkOut:"2023-07-06 13:17:06",
  //
  //     },
  //     {
  //       employeeId:2,
  //       employeeName:"Mohamed Asran",
  //       checkIn:"2023-07-07 13:16:05",
  //       checkOut:"2023-07-07 13:17:06",
  //
  //     },
  //     {
  //       employeeId:1,
  //       employeeName:"Mohamed Shafee2",
  //       checkIn:"2023-07-06 13:16:05",
  //       checkOut:"2023-07-06 13:17:06",
  //
  //     },
  //     {
  //       employeeId:3,
  //       employeeName:"Yasmin Khaled",
  //       checkIn:"2023-07-06 13:16:05",
  //       checkOut:"2023-07-06 13:17:06",
  //
  //     },
  //     {
  //       employeeId:1,
  //       employeeName:"Mohamed Shafee2",
  //       checkIn:"2023-07-07 13:16:05",
  //       checkOut:"2023-07-07 13:17:06",
  //
  //     },
  //     {
  //       employeeId:3,
  //       employeeName:"Yasmin Khaled",
  //       checkIn:"2023-07-07 13:16:05",
  //       checkOut:"2023-07-07 13:17:06",
  //
  //     }
  //   ]
  //
  //   observable.next(attendance);
  // })

  private penalties = new Observable(observable =>{
    const penalties = [
      {
        employeeId:1,
        employeeName:"Mohamed Asran",
        checkIn:"2023-07-06 13:16:05",
        checkOut:"2023-07-06 13:17:06",
        amount:200
      },
      {
        employeeId:1,
        employeeName:"Mohamed Asran",
        checkIn:"2023-07-07 13:16:05",
        checkOut:"2023-07-07 13:17:06",
        amount:100
      }

    ]

    observable.next(penalties);
  })


  constructor(private http: HttpClient,private config:ConfigService) {

  }

  getAttendanceForUser(id:any ,date:any){
    return this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.getAttendance, {
          "paramlist": {
            data: {
              user_id: id,
              date: date
            }
          }
        },
        { headers: this.headers }
      )
    // return this.attendance.pipe(map((attendance:any) =>{
    //   return attendance.filter((attendance:any)=>{
    //     return attendance.employeeId == id && attendance.checkIn.substring(0,7) == date;
    //   })
    // }))
  }
  getAllAttendance(dateFrom:any,dateTo:any,id:any){
    return this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.attendanceReview, {
          "paramlist": {
            data: {
              user_id: id,
              date_from: dateFrom,
              date_to: dateTo
            }
          }
        },
        { headers: this.headers }
      )
  }

  getPenalties(dateFrom:any,dateTo:any,id:any){
    return this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.getPenalty, {
          "paramlist": {
            data: {
              user_id: id,
              date_from: dateFrom,
              date_to: dateTo
            }
          }
        },
        { headers: this.headers }
      )
    }


}
