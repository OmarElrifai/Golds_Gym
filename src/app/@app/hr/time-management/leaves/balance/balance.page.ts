import { Component, OnInit } from '@angular/core';
import {BalanceService} from "../services/balance/balance.service";
import {SharedService} from "../../../../../@shared/shared.service";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {

  public balance:any;
  public tabs = [
    {
      text:"Balance",
      key:"balance"
    }
  ]
  private user_id = localStorage.getItem("user_id")


  constructor(private balanceService:BalanceService) { }

  ngOnInit() {
    this.balanceService.getBalance(this.user_id).subscribe((balance:any)=>{
      this.balance = balance.data;
    });

  }



}
