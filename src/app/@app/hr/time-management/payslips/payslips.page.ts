import { Component, OnInit } from '@angular/core';
import {PayslipsService} from "./services/payslips/payslips.service";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {SharedService} from "../../../../@shared/shared.service";

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.page.html',
  styleUrls: ['./payslips.page.scss'],
})
export class PayslipsPage implements OnInit {

  payslips:any;
  user_id = localStorage.getItem("user_id")

  constructor(private payslipsService:PayslipsService,private router:Router ,private sharedService:SharedService, private navContrl: NavController) {

  }

  ngOnInit() {
    this.payslipsService.getPayslips(this.user_id).subscribe((payslips:any) =>{
      this.payslips = payslips.data;
    })
  }

  reviewPayslip(payslip:any){
    this.navContrl.navigateForward("hr/payslips/payslip-details", { state: { payslip: payslip } });
  }

}
