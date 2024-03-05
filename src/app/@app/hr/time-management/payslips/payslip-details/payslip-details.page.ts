import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-payslip-details',
  templateUrl: './payslip-details.page.html',
  styleUrls: ['./payslip-details.page.scss'],
})
export class PayslipDetailsPage implements OnInit {

  payslip:any;
  constructor(private router:Router) { }

  ngOnInit() {
    // @ts-ignore
    this.payslip = this.router.getCurrentNavigation().extras.state.payslip;
  }

}
