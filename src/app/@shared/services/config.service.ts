import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public baseurl = "http://localhost:4000/api/"//prdouction
  public publisedbaseUrl = "http://localhost:4000/api/"//prdouction
  // public localBaseUrl = "http://167.172.164.200:8816/api/"//prdouction
  public odooUrl = "http://167.172.164.200"//prdouction
  public odooPort = 8816 //prdouction
  // public odooDBName = "goldgymtest" //prdouction
  /* testing env */
  /* public baseurl = "http://207.154.195.214:4002/api/" //testing
  public publisedbaseUrl = "http://207.154.195.214:4002/api/" //testing
  public localBaseUrl = "http://207.154.195.214:4002/api/" //testing
  public odooUrl = "http://207.154.195.214" //testing
  public odooPort = 8030//testing
  public odooDBName = "arope_hr2"//testing */
  public login = this.baseurl + "login"
  public allMethode = this.baseurl + "call_method/"
  /* Models names */
  public employeeModel = "hr.employee/"
  public leavesModel = "hr.leave/"
  public leavesTypeModel = "hr.leave.type/"
  public attendanceModel = "hr.attendance/"
  public partnerModel = "res.partner/"
  public userModel = "res.users/"
  public taskModel = "project.task/"
  public productModel = "product.template/"
  public productCategory = "product.category/"
  public paymentTerm = "account.payment.term/"
  public priceList = "product.pricelist/"
  public projectModel = "project.project/"
  public scheduleModel = "planning.slot/"
  public searchRead = "search_read"
  public searchCount = "search_count"
  public create = "create"
  public delete = "unlink"
  public write = "write"
  public getDataCount = "get_data_count_by_user"
  public getUserActivities = "get_activity_by_user"
  public getModalId = "get_model_id"
  public searchLeaves = "search_leaves"
  public leavesTypes = "get_types"
  public createLeave = "create_leave"
  public updateLeave = "update_leave"
  public deleteLeave = "delete_leave"
  public toApproveLeaves = "get_child_leaves"
  public leavesBalance = "get_leave_balance"
  public updateLeaveState = "update_leave_state"
  public approveLeave = "approve_child_leaves"
  public rejectLeave = "refuse_child_leaves"
  public searchPayslip = "search_payslip"
  public getAttendance = "get_attendance"
  public checkIn = "check_in"
  public checkOut = "check_out"
  public getProfile = "get_profile"
  public updateProfile = "update_profile"
  public employeeChart = "employee_chart"
  public getPenalty = "get_penality"
  public attendanceReview = "attendance_review"
  public wifiName = "HQ-AP"
  public registerToken = "register_token"
  public sentNotfication="sentNotfication"
  public changePassword="change_user_pass"
  public set_mac="set_mac"
  public activitiesModal = "mail.activity/"
  public activitiesTypeModal = "mail.activity.type/"
  public ibsApiModal = "ibs.api/"
  public tipsModal = "tips.days/"
  public hrApiModel = "hr.apis/"
  public salesOrderModel = "sale.order/"
  constructor() { }

}
