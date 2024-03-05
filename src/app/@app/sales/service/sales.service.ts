import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {ConfigService} from "../../../@shared/services/config.service";
import {SharedService} from "../../../@shared/shared.service";

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private headers = {
    "Content-Type": "application/json",
  }
  userID = localStorage.getItem("user_id")
  constructor(private http: HttpClient, private configService:ConfigService,private shared:SharedService) {}

  getOdooSalesOrders() {

    return this.http.post(this.configService.allMethode
      + this.configService.salesOrderModel
      + this.configService.searchRead, {
      paramlist: {
        filter: [["sales_member_id", "=", this.shared.employee?.id || 0]],
        fields: ["name","product_id","company_id","amount_total","partner_id","sales_member_id","date_order","order_type","payment_term_id","payment_ref","last_so_gt0","cat_id","user_id","program_id","invoice_date","pricelist_id"]
      }
    });
  }
  getOdooSalesOrdersInTimeWindow(dateFrom:any ,dateTo:any) {

    return this.http.post(this.configService.allMethode
      + this.configService.salesOrderModel
      + this.configService.searchRead, {
      paramlist: {
        filter: [["sales_member_id", "=", this.shared.employee?.id || 0],["date_order",">",dateFrom],["date_order","<",dateTo]],
        fields: ["name","product_id","start_date","company_id","amount_total","partner_id","sales_member_id","date_order","order_type","payment_term_id","payment_ref","last_so_gt0","cat_id","user_id","program_id","invoice_date","pricelist_id"]
      }
    });
  }
  getOdooCustomers(){
    return this.http.post(this.configService.allMethode
    + this.configService.partnerModel
    + this.configService.searchRead,{
      paramlist: {
        filter: [],
        fields: ["name"]
      }
    } )
  }


  getOdooProductsCategories(){
    return this.http.post(this.configService.allMethode
      + this.configService.productCategory
      + this.configService.searchRead,{
        paramlist:{
          filter:[["parent_id.name","=","GYM"],["name","!=","Member Classes"]],
          fields:["name"]
        }
      }
    )
  }

  getOdooProducts(cat_id:any){
    return this.http.post(this.configService.allMethode
      + this.configService.productModel
      + this.configService.searchRead,{
        paramlist:{
          filter:[["categ_id","=",cat_id]],
          fields:["name"]
        }
      }
    )
  }

  getStartDate(id:any){
    return this.http.post(this.configService.allMethode
      + this.configService.projectModel
      + this.configService.searchRead,{
        paramlist:{
          filter:[["id","=",id]],
          fields:["date_start"]
        }
      }
    )
  }

  getOdooEnrollmentList(date:any,cat_id:any,product_id:any){
    return this.http.post(this.configService.allMethode
      + this.configService.projectModel
      + this.configService.searchRead,{
        paramlist:{
          filter:[["date_start","<",date],["cat_id","=",cat_id],["product_id","=",product_id]],
          fields:["name"]
        }
      }
    )
  }


  getOdooPaymentTerms(){
    return this.http.post(this.configService.allMethode
      + this.configService.paymentTerm
      + this.configService.searchRead,{
        paramlist:{
          filter:[],
          fields:["name"]
        }
      }
    )
  }

  getOdooPriceList(company_id:any){
    return this.http.post(this.configService.allMethode
      + this.configService.priceList
      + this.configService.searchRead,{
        paramlist:{
          filter:[["company_id","=",company_id]],
          fields:["name"]
        }
      }
    )
  }

  createSale(sale:any){
    console.log(sale)

    return new Promise((resolve, reject)=>{
      console.log(sale)
      this.http.post(this.configService.allMethode
      + this.configService.salesOrderModel
      + this.configService.create,{
        paramlist:{
          data:sale
        }
      },{headers:this.headers}
    ).subscribe((res:any)=>{
      resolve(res)
    },error => {
      reject(error)
    })

    })
  }

  updateSale(sale:any){
    return new Promise((resolve, reject)=>{
      console.log(sale)
      this.http.post(this.configService.allMethode
        + this.configService.salesOrderModel
        + this.configService.write,{
          paramlist:{
            filter:[sale.id],
            data:sale
          }
        },{headers:this.headers}
      ).subscribe((res:any)=>{
        resolve(res)
      },error => {
        reject(error)
      })

    })
  }
}
