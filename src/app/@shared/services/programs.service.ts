import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {ConfigService} from "./config.service";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  callMethodURL = `${environment.connectToOdooNodeURL}/call_method`;
  listOfAttendees = new BehaviorSubject(null);
  listOfEnrolled = new BehaviorSubject(null);
  constructor(private http: HttpClient,private config:ConfigService) { }

  getUserPrograms(userID:any) {
    return this.http.post(`${this.config.allMethode}${this.config.projectModel}${this.config.searchRead}`, {
      paramlist: {
        filter: [['user_id', '=', userID]],
        filters: ['id', 'name', 'partner_id', 'date_start', 'date','tasks'],
      },
    });
  }

  getTrainerSchedule(userID:any,dateFrom:any,dateTo:any){
    return this.http.post(`${this.config.allMethode}${this.config.scheduleModel}${this.config.searchRead}`, {
      paramlist: {
        filter: [['user_id', '=', userID],['start_datetime', '>', dateFrom],['start_datetime', '<', dateTo]],
        filters: ['user_id', 'role_id', 'start_datetime'],
      },
    });
  }

  getClientPrograms(clientID:any) {
    return this.http.post(`${this.config.allMethode}${this.config.projectModel}${this.config.searchRead}`, {
      paramlist: {
        filter: [['enrolled_ids', '=', clientID]],
        filters: ['id', 'name', 'partner_id', 'date_start', 'date','tasks'],
      },
    });
  }

  getSingleSession(sessionID:any) {
    return this.http.post(`${this.config.allMethode}${this.config.taskModel}${this.config.searchRead}`, {
      paramlist: {
        filter: [['id', '=', [sessionID]]],
        filters: ['id', 'project_id', 'partner_id','session_time', 'attend_ids','enrolled_ids' ,'date_deadline', 'name','user_ids','create_date','company_id'],
      },
    });
  }

  getUserSessions(userID: any) {
    return this.http.post(`${this.config.allMethode}${this.config.taskModel}${this.config.searchRead}`, {
      paramlist: {
        filter: [['user_ids', '=', [userID]]],
        filters: ['id', 'project_id', 'partner_id','session_time', 'attend_ids','enrolled_ids' ,'date_deadline', 'name','user_ids','create_date','company_id'],
      },
    });
  }

  getCompletedUserSessions(userID: any,projectID:any) {
    return this.http.post(`${this.config.allMethode}${this.config.taskModel}${this.config.searchRead}`, {
      paramlist: {
        filter: [['user_ids', '=', [userID]],['project_id','=',[projectID]],['stage_id','=',19]],
        filters: ['id', 'project_id', 'partner_id','session_time', 'attend_ids','enrolled_ids' ,'date_deadline', 'name','user_ids','create_date','company_id'],
      },
    });
  }

  getUserSessionsForProgram(userID: any,projectID:any) {
    return this.http.post(`${this.config.allMethode}${this.config.taskModel}${this.config.searchRead}`, {
      paramlist: {
        filter: [['user_ids', '=', [userID]],['project_id','=',[projectID]],['stage_id','=',18]],
        filters: ['id', 'project_id', 'partner_id','session_time', 'attend_ids', 'enrolled_ids' ,'date_deadline', 'name','create_date','company_id'],
      },
    });
  }

  getCompletedClientSessions(clientID: any,projectID:any) {
    return this.http.post(`${this.config.allMethode}${this.config.taskModel}${this.config.searchRead}`, {
      paramlist: {
        filter: [['attend_ids', '=', [clientID]],['project_id','=',[projectID]],['stage_id','=',19]],
        filters: ['id', 'project_id', 'partner_id','session_time', 'attend_ids','enrolled_ids' ,'date_deadline', 'name','user_ids','create_date','company_id'],
      },
    });
  }

  getAttendeesList(list:any){
      console.log("list----------",list);
      console.log("listofattendees----------",this.listOfAttendees);
      list.map((id:any)=>{
        this.getCustomer(id).subscribe((customer:any)=>{
          this.listOfAttendees.next(customer)
        })
      })

      return this.listOfAttendees;

  }



  clearListOfAttendees(){
    this.listOfAttendees = new BehaviorSubject(null)
  }


  getEnrolledList(list:any){
    list.map((id:any)=>{
      this.getCustomer(id).subscribe((customer:any)=>{
        this.listOfEnrolled.next(customer)
      })
    })

    return this.listOfEnrolled;

  }



  clearListOfEnrolled(){
    this.listOfEnrolled = new BehaviorSubject(null)
  }

  getCustomer(id:any){
    return this.http.post(`${this.config.allMethode}${this.config.partnerModel}${this.config.searchRead}`, {
      paramlist: {
        filter: [["id","=",id]],
        filters: ['id', 'name','image_1920'],
      }
    })
  }
  getUsersList(){
    return this.http.post(`${this.config.allMethode}${this.config.userModel}${this.config.searchRead}`, {
      paramlist: {
        filter: [],
        filters: ['id', 'name'],
      },
    });
  }

  updateSession(session:any){
    return this.http.post(`${this.config.allMethode}${this.config.taskModel}${this.config.write}`,{
      paramlist: {
        filter: [session.id],
        data:session,
      },
    })
  }

}
