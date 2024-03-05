import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {ConfigService} from "../../../@shared/services/config.service";
import {SharedService} from "../../../@shared/shared.service";

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  callMethodURL = environment.connectToOdooNodeURL;
  selectedContact :any  = new BehaviorSubject(null)

  constructor(private http:HttpClient,private configService:ConfigService, private sharedService:SharedService) {}

  getOdooContacts() {
    return this.http.post(
      this.configService.allMethode
      +   this.configService.partnerModel
      +   this.configService.searchRead,
      {
        paramlist: {
          filter: [],
          fields: [
            'id',
            'name',
            'contact_address_complete',
            'phone',
            'mobile',
            'avatar_256',
            'email',
          ],
        },
      }
    );
  }

  getContactSessions(contactID:Number) {
    return this.http.post(
      this.configService.allMethode
      +   this.configService.taskModel
      +   this.configService.searchRead,
      {
        paramlist: {
          filter: [['partner_id', '=', contactID]],
          filters: [
            'id',
            'project_id',
            'partner_id',
            'date_deadline',
            'name',
            'create_date',
          ],
        },
      }
    );
  }

  createContact(data:any){
    return this.http.post(
      this.configService.allMethode
      +   this.configService.partnerModel
      +   this.configService.create,
      {
        paramlist:{
          data:[data]
        }
      }
    );
  }

  getSalesOrdersForMember(partnerId:any) {
      return this.http.post(this.configService.allMethode
        + this.configService.salesOrderModel
        + this.configService.searchRead, {
        paramlist: {
          filter: [["partner_id", "=", partnerId]],
          fields: ["name","partner_id","state","type_name","order_line","sales_member_id"]
        }
      });
  }

  getSingleContact(id:any){
    return this.http.post(
      this.configService.allMethode
      +   this.configService.partnerModel
      +   this.configService.searchRead,
      {
        paramlist: {
          filter: [["id", "=", id]],
          fields: [
            "id",
            "name",
            "city",
            "street",
            "phone",
            "mobile",
            'image_1920',
            "email"]
        }
      });
  }

  updateContact(id:any,data:any){
    return this.http.post(
          this.configService.allMethode
      +   this.configService.partnerModel
      +   this.configService.write,{
            paramlist:{
              filter:[id],
              data:data
            }
      }
    )
  }

  delete(id:any){
    return this.http.post(
      this.configService.allMethode
      +   this.configService.partnerModel
      +   this.configService.write,{
        paramlist:{
          filter:[id]
        }
      }
    )
  }
}
