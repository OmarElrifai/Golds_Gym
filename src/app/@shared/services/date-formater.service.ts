import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormaterService {

  constructor() { }

  dateToStringConverter(date:any) {
    let day = this.getDay(date.getDate());
    let month = this.getMonth(date.getMonth());
    let year = date.getFullYear();
    let hours = this.getHour(date.getHours());
    let minutes = this.getMinutes(date.getMinutes());
    return  year + "-" + month + "-" + day + " " + hours+":"+minutes;
  }

  getMonth(month:any){
    return month >= 10 ? (month+1): "0" + (month+1);
  }

  getDay(day:any){
    return day >= 10 ? day:"0" + day ;
  }

  getHour(hour:any){
    return hour >= 10 ? (hour+1): "0" + (hour+1);
  }

  getMinutes(minutes:any){
    return minutes >= 10 ? minutes:"0" + minutes ;
  }
  createDate(date:any){
    let day = this.getDay(date.getDate());
    let month = this.getMonth(date.getMonth());
    let year = date.getFullYear();
    return  year + "-" + month + "-" +day;
  }
  // stringToDateConverter(date:any) {
  //   if (typeof date === "object") {
  //     let day = date.getDate() < 10 ? (date.getMonth()) + "0" : date.getMonth();
  //     let month = date.getMonth() < 10 ? (date.getMonth() + 1) + "0" : date.getMonth() + 1;
  //     let year = date.getFullYear();
  //     let dateString = new Date(year + "-" + month + "-" + day);
  //     return dateString
  //   } else {
  //     return date
  //   }
  // }
}
