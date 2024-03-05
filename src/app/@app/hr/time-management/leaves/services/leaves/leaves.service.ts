import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {SharedService} from "../../../../../../@shared/shared.service";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../../../../../@shared/services/config.service";
import {actions, HrHomePageData} from "../../../../hrHomePageData";

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  private headers = {
    "Content-Type": "application/json",
  }

  private toBeSubmitted:any=[];
  private pending:any=[];
  private approved:any=[];
  private rejected:any=[];
  private user_id = localStorage.getItem("user_id")



  public toBeSubmittedObservable:any = new BehaviorSubject(null)
  public pendingObservable:any = new BehaviorSubject(null)
  public approvedObservable:any = new BehaviorSubject(null)
  public rejectedObservable:any = new BehaviorSubject(null)
  public leavesToApproveObservable:any = new BehaviorSubject([])

  constructor(private http:HttpClient ,private config:ConfigService, private sharedService:SharedService) {

  }


  createLeave(leaveData:any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.leavesModel
        + this.config.create, {
          paramlist: {
            data: leaveData
          }
        },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
        this.assignLeavesForEachTab()
      }, e => {
        reject(e)
      })
    })
  }

  assignLeavesForEachTab(){
    console.log("called")
    this.approved =[];
    this.rejected =[];
    this.pending =[];
    this.toBeSubmitted =[];
    let user_id : any = this.user_id
    // this.getUserLeaves(parseInt(user_id)).subscribe((leaves:any)=>{
    //   leaves.data.forEach((leave:any) => {
    //     if (leave.state == "validate"){
    //       this.approved.push(leave)
    //     }
    //
    //     else if (leave.state == "refuse")
    //       this.rejected.push(leave)
    //
    //     else if (leave.state == "confirm" || leave.state == "validate1")
    //       this.pending.push(leave)
    //
    //     else if (leave.state == "draft")
    //       this.toBeSubmitted.push(leave)
    //   })
    //
    //   this.approvedObservable.next(this.approved)
    //   this.rejectedObservable.next(this.rejected)
    //   this.pendingObservable.next(this.pending)
    //   this.toBeSubmittedObservable.next(this.toBeSubmitted)
    //
    // })


  }
  getUserLeaves(user_id:any) {
    return this.http.post(
      this.config.allMethode
      + this.config.leavesModel
      + this.config.searchRead, {
        paramlist: {
          filter: [["user_id","=",user_id]],
          columns:[
            "id",
            "display_name",
            "number_of_days",
            "holiday_status_id",
            "date_from",
            "request_date_from_period",
            "date_to",
            "request_date_from",
            "request_date_to",
            "request_hour_from",
            "request_hour_to",
            "request_unit_half",
            "request_unit_hours",
            "state",
            "name",
            "private_name",
            "user_id",
            "employee_id"]

        }
      },
      { headers: this.headers }
    )
  }

  getDraftLeaves(user_id:any) {
    return this.http.post(
      this.config.allMethode
      + this.config.leavesModel
      + this.config.searchRead, {
        paramlist: {
          filter: [["user_id","=",user_id],["state","=","draft"]],
          columns:[
            "id",
            "display_name",
            "number_of_days_display",
            "holiday_status_id",
            "date_from",
            "request_date_from_period",
            "date_to",
            "request_date_from",
            "request_date_to",
            "request_hour_from",
            "request_hour_to",
            "request_unit_half",
            "request_unit_hours",
            "state",
            "name",
            "private_name",
            "user_id",
            "employee_id"]

        }
      },
      { headers: this.headers }
    )
  }

  getConfirmedLeaves(user_id:any) {
    return this.http.post(
      this.config.allMethode
      + this.config.leavesModel
      + this.config.searchRead, {
        paramlist: {
          filter: [["user_id","=",user_id],["state","=","confirm"]],
          columns:[
            "id",
            "display_name",
            "number_of_days_display",
            "holiday_status_id",
            "date_from",
            "request_date_from_period",
            "date_to",
            "request_date_from",
            "request_date_to",
            "request_hour_from",
            "request_hour_to",
            "request_unit_half",
            "request_unit_hours",
            "state",
            "name",
            "private_name",
            "user_id",
            "employee_id"]

        }
      },
      { headers: this.headers }
    )
  }

  getValidateLeaves(user_id:any) {
    return this.http.post(
      this.config.allMethode
      + this.config.leavesModel
      + this.config.searchRead, {
        paramlist: {
          filter: [["user_id","=",user_id],["state","=","validate"]],
          columns:[
            "id",
            "display_name",
            "number_of_days_display",
            "holiday_status_id",
            "date_from",
            "request_date_from_period",
            "date_to",
            "request_date_from",
            "request_date_to",
            "request_hour_from",
            "request_hour_to",
            "request_unit_half",
            "request_unit_hours",
            "state",
            "name",
            "private_name",
            "user_id",
            "employee_id"]

        }
      },
      { headers: this.headers }
    )
  }

  getRefusedLeaves(user_id:any) {
    return this.http.post(
      this.config.allMethode
      + this.config.leavesModel
      + this.config.searchRead, {
        paramlist: {
          filter: [["user_id","=",user_id],["state","=","refuse"]],
          columns:[
            "id",
            "display_name",
            "number_of_days_display",
            "holiday_status_id",
            "date_from",
            "request_date_from_period",
            "date_to",
            "request_date_from",
            "request_date_to",
            "request_hour_from",
            "request_hour_to",
            "request_unit_half",
            "request_unit_hours",
            "state",
            "name",
            "private_name",
            "user_id",
            "employee_id"]

        }
      },
      { headers: this.headers }
    )
  }

  getLeavesToApprove() {
    let leavesToApprove:any[] = [];
    this.http.post(
      this.config.allMethode
      + this.config.leavesModel
      + this.config.searchRead, {
        paramlist: {
          filter:[["manager_id","=",this.sharedService.employee.id],["state","=","confirm"]],
          columns: ["display_name","state","holiday_status_id","date_from","date_to","number_of_days_display","private_name","display_name"]
        }
      },
      { headers: this.headers }
    ).subscribe((leaves:any)=>{
      leavesToApprove = leaves.data;
      this.leavesToApproveObservable.next(leavesToApprove);
    });


  }


  getLeavesTypes() {
    return this.http.post(
      this.config.allMethode
      + this.config.leavesTypeModel
      + this.config.searchRead, {
        paramlist: {
          filter:["|",["requires_allocation","=","no"],["has_valid_allocation","=",true]],
          columns: ["name"]
        }
      },
      { headers: this.headers }
    )

  }
  updateLeave(leaveData:any) {
    return new Promise((resolve, reject)=>{
      this.http.post(this.config.allMethode
        + this.config.leavesModel
        + this.config.write, {
          paramlist: {
            filter:[leaveData.id],
            data: leaveData
          }
        },
        { headers: this.headers }).subscribe(res => {
        let user = JSON.parse(JSON.stringify(res))
        resolve(res);
        this.assignLeavesForEachTab()
      }, e => {
        reject(e)
      })
    })

  }

  updateLeaveState(leave_id:any, state:any, user_id:any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.updateLeaveState, {
          paramlist: {
            data: {
              leave_id: leave_id,
              state: state,
              user_id: user_id
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

  deleteLeave(id:any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.deleteLeave, {
          paramlist: {
            data: {
              rec_id: id
            }
          }
        },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
        this.assignLeavesForEachTab()
      }, e => {
        reject(e)
      })
    })
  }

  approveLeave(leave_id:any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.leavesModel
        + this.config.write, {
          paramlist: {
            filter: [leave_id],
            data:{state:"validate"}
          }
        },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
        this.getLeavesToApprove();
      }, e => {
        reject(e)
      })
    })
  }

  rejectLeave(leave_id:any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.hrApiModel
        + this.config.rejectLeave, {
          paramlist: {
            filter: [leave_id],
            data:{state:"refuse"}
          }
        },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
        this.getLeavesToApprove();
      }, e => {
        reject(e)
      })
    })
  }

}
