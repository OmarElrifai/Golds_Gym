import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {SalesService} from "../service/sales.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../../@shared/shared.service";
import {DateFormaterService} from "../../../@shared/services/date-formater.service";


@Component({
  selector: 'app-add-edit-sales',
  templateUrl: './add-edit-sales.component.html',
  styleUrls: ['./add-edit-sales.component.scss'],
})
export class AddEditSalesComponent  implements OnInit {


  invoiceDateVisible:any;
  startDateVisible:any;
  @Input() sale:any
  employee:any;
  productsCategories:any = [];
  products: any = [];
  programs:any= [];
  customers:any ;
  paymentsTerms: any;
  pricelists:any = [];

  salesForm = new FormGroup({
    id: new FormControl(null,Validators.required),
    name: new FormControl("",Validators.required),
    amount_total: new FormControl(null,Validators.required),
    partner_id : new FormControl([],Validators.required),
    order_type : new FormControl([],Validators.required),
    product_id : new FormControl(null,Validators.required),
    program_id : new FormControl(null,Validators.required),
    date_order : new FormControl(null,Validators.required),
    start_date : new FormControl(null,Validators.required),
    invoice_date : new FormControl(null,Validators.required),
    payment_term_id : new FormControl(null,Validators.required),
    payment_ref : new FormControl(null,Validators.required),
    last_so_gt0 : new FormControl(null,Validators.required),
    user_id : new FormControl(parseInt(this.shared.user_id),Validators.required),
    sales_member_id : new FormControl(parseInt(this.shared.user_id),Validators.required),
    company_id : new FormControl(null,Validators.required),
    cat_id : new FormControl(null,Validators.required),
    pricelist_id : new FormControl(null,Validators.required),
  });

  orders:any = [];
  ordersCounter= 0;
  orderDateVisible: any;

  constructor(
    private modalCtrl:ModalController,
    private salesService:SalesService,
    private alertCtrl:AlertController,
    private shared:SharedService,
    private dateFormaterService:DateFormaterService
    ) {

  }

  ngOnInit() {
    console.log("sale: ",this.sale)
    this.employee = this.shared.employee;

    if(this.sale){
      this.salesForm.setValue(this.sale);
      this.salesForm.controls.partner_id.setValue(this.sale.partner_id[0])
      this.salesForm.controls.company_id.setValue(this.sale.company_id[0])
      this.salesForm.controls.pricelist_id.setValue(this.sale.pricelist_id[0])
      this.salesForm.controls.cat_id.setValue(this.sale.cat_id[0])
      this.salesForm.controls.product_id.setValue(this.sale.product_id[0])
      this.salesForm.controls.program_id.setValue(this.sale.program_id[0])
      this.salesForm.controls.payment_term_id.setValue(this.sale.payment_term_id[0])
      let catId:any = this.salesForm.controls.cat_id.value;
      let productId:any = this.salesForm.controls.product_id.value;

      this.salesService.getOdooProducts(catId).subscribe((data:any)=>{
        this.products = data.data
      })

      this.salesService.getOdooEnrollmentList(this.sale.invoice_date,catId,productId).subscribe((data:any)=>{
        this.programs = data.data;
      })
    }
    this.salesService.getOdooCustomers().subscribe((data:any)=>{
      this.customers = data.data;
    })
    this.salesService.getOdooProductsCategories().subscribe((data:any)=>{
      this.productsCategories = data.data
    })

    this.salesService.getOdooPaymentTerms().subscribe((data:any)=>{
      this.paymentsTerms = data.data
    })
    this.salesService.getOdooPriceList(this.employee.company_id[0]).subscribe((data:any)=>{
      this.pricelists = data.data
    })

  }

  makeInvoiceDateVisible(){
    this.invoiceDateVisible = true
  }

  makeStartDateVisible(){
    this.startDateVisible = true
  }

  makeOrderDateVisible(){
    this.orderDateVisible = true
  }





  onInvoiceDateSubmit(event:any){
    if(event.detail.value){
      let date:any = event.detail.value.split("T")[0]
      this.salesForm.controls.invoice_date.setValue(date)
      console.log(event);
      this.invoiceDateVisible = false
    }else{
      let invoiceDate:any = new Date();
      let day = this.dateFormaterService.getDay(invoiceDate.getDate());
      let month = this.dateFormaterService.getMonth(invoiceDate.getMonth());
      let year = invoiceDate.getFullYear();
      invoiceDate = year + "-" + month + "-" +day;
      this.salesForm.controls.invoice_date.setValue(invoiceDate);
      this.invoiceDateVisible = false

    }
  }

  onOrderDateSubmit(event:any){
    if(event.detail.value){
      let date:any = event.detail.value.split("T")[0]
      this.salesForm.controls.date_order.setValue(date)
      console.log(event);
      this.orderDateVisible = false
    }else{
      let date:any = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
      this.salesForm.controls.date_order.setValue(date)
      this.orderDateVisible = false

    }
  }

  onInvoiceDateCanceled(){
    this.invoiceDateVisible = false
  }

  onStartDateCanceled(){
    this.startDateVisible = false
  }

  onOrderDateCanceled(){
    this.orderDateVisible = false
  }

  updateProducts(event:any) {
    this.salesService.getOdooProducts(event.detail.value).subscribe((data:any)=>{
      this.products = data.data
    })
  }

  getAllowedPrograms(){
    this.salesService.getOdooEnrollmentList(this.salesForm.controls.invoice_date.value,this.salesForm.controls.cat_id.value,this.salesForm.controls.product_id.value).subscribe((data:any)=>{
      this.programs = data.data;
    })
  }

  setStartDate(event:any) {
    this.salesService.getStartDate(event.detail.value).subscribe((startDate:any)=>{
      this.salesForm.controls.start_date.setValue(startDate.data[0].date_start)
    });
  }

  async submit() {
    this.salesForm.controls.sales_member_id.setValue(parseInt(this.shared.employee.id))
    this.salesForm.controls.user_id.setValue(parseInt(this.shared.user_id))
    if(this.sale){
      this.salesService.updateSale(this.salesForm.value).then(async (res: any) => {
        if (res.data) {
          const alrt = await this.alertCtrl.create({
            header: 'Ok',
            message: "Sale has been updated Successfully",
            buttons: [{
              text: "ok",
              handler: async () => {
                await this.modalCtrl.dismiss(null, "confirmed")
              }
            }]
          })
          alrt.present();

        } else {
          const alrt = await this.alertCtrl.create({
            header: 'Error',
            message: res.faultString,
            buttons: [{
              text: "ok",
              role: "cancel"
            }]
          })
          alrt.present();
          await this.modalCtrl.dismiss()
        }

      }).catch(async (err) => {
        const alrt = await this.alertCtrl.create({
          header: 'Error',
          message: "Unable to update sale, please contact administrator",
          buttons: [{
            text: "ok",
            role: "cancel"
          }]
        });
        alrt.present();
        console.log(err)
        await this.modalCtrl.dismiss()
      })
    }else{
      this.salesForm.controls.name.setValue(this.generateSaleName())
      this.salesForm.controls.company_id.setValue(this.employee.company_id[0]);
      console.log("sale: ", this.salesForm.value)
      let orderDate:any = new Date();
      let day = this.dateFormaterService.getDay(orderDate.getDate());
      let month = this.dateFormaterService.getMonth(orderDate.getMonth());
      let year = orderDate.getFullYear();
      orderDate = year + "-" + month + "-" +day;
      this.salesForm.controls.date_order.setValue(orderDate);
      this.salesService.createSale(this.salesForm.value).then(async (res: any) => {
        if (res.data) {
          const alrt = await this.alertCtrl.create({
            header: 'Ok',
            message: "Sale has been created Successfully",
            buttons: [{
              text: "ok",
              handler: async () => {
                await this.modalCtrl.dismiss(null, "confirmed")
              }
            }]
          })
          alrt.present();

        } else {
          const alrt = await this.alertCtrl.create({
            header: 'Error',
            message: res.faultString,
            buttons: [{
              text: "ok",
              role: "cancel"
            }]
          })
          alrt.present();
          await this.modalCtrl.dismiss()
        }

      }).catch(async (err) => {
        const alrt = await this.alertCtrl.create({
          header: 'Error',
          message: "Unable to create sale, please contact administrator",
          buttons: [{
            text: "ok",
            role: "cancel"
          }]
        });
        alrt.present();
        console.log(err)
        await this.modalCtrl.dismiss()
      })
    }

  }

  generateSaleName(){
    return "S"+Date.now().toString().slice(9,Date.now().toString().length);
  }



}
