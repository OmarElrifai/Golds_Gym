import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LeavesService} from "../../../services/leaves/leaves.service";
import {AlertController, ModalController, PickerController} from "@ionic/angular";
import {SharedService} from "../../../../../../../@shared/shared.service";

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent  implements OnInit {
  @Input() leave:any={};
  @Input() newLeave:any;
  public leavesType:any;
  public toCalendarVisible:boolean = false;
  public fromCalendarVisible: boolean = false;
  halfDaySelect: any = false
  typeUnitHour = ""
  selectedType:any
  leaveToEdit:any
  transValues:any
  requestFromInHours:any
  requestToInHours:any
  user_id:any = localStorage.getItem("user_id")
  isDateToVisible:any = true

  leavesForm = new FormGroup({

    id: new FormControl(null,Validators.required),
    holiday_status_id: new FormControl("",Validators.required),
    date_from: new FormControl("",Validators.required),
    date_to: new FormControl("",Validators.required),
    request_date_from: new FormControl("",Validators.required),
    request_date_from_period: new FormControl("am",Validators.required),
    request_date_to: new FormControl("",Validators.required),
    request_hour_from: new FormControl(false,Validators.required),
    request_hour_to: new FormControl(false,Validators.required),
    request_unit_half: new FormControl(false,Validators.required),
    request_unit_hours: new FormControl(false,Validators.required),
    state: new FormControl("draft",Validators.required),
    name: new FormControl(false,Validators.required),
    private_name: new FormControl(false,Validators.required),
    user_id: new FormControl(parseInt(this.user_id),Validators.required),
    employee_id: new FormControl(parseInt(this.sharedService.employee.id),Validators.required),
    // number_of_days: new FormControl(parseInt(this.sharedService.employee.id),Validators.required)

    // "holiday_status_id": 1,
    // "date_from": "2024-01-18 06:00:00",
    // "request_date_from_period": "am",
    // "date_to": "2024-01-19 15:00:00",
    // "request_date_from": "2024-01-18",
    // "request_date_to": "2024-01-19",
    // "request_hour_from": false,
    // "request_hour_to": false,
    // "request_unit_half": false,
    // "request_unit_hours": false,
    // "state": "draft",
    // "name": false,
    // "private_name": false,
    // "user_id": 2,
    // "employee_id":1

    // hourUnit: new FormControl(false,Validators.required),
    // halfDaySelect: new FormControl(false,Validators.required),
    // rec_id: new FormControl(false,Validators.required),

  });
  updatedDate: string = new Date(new Date().getFullYear()+"-"+new Date().getMonth()+1+"-"+new Date().getDate()).toString();
  constructor(private pickerCtrl:PickerController, private leaveService:LeavesService, private alertCtrl:AlertController, private modalCtrl:ModalController, private sharedService:SharedService) {
  }

  ngOnInit() {
    this.leaveService.getLeavesTypes().subscribe((types:any)=>{
      this.leavesType = types.data
    })
    this.setFormValues();
    console.log(this.leave)

  }
  setFormValues(){
    if(!this.newLeave){
      let leaveId:any = parseInt(this.leave.id);
      this.leavesForm.controls.id.setValue(leaveId)
      this.leavesForm.controls.holiday_status_id.setValue(this.leave.holiday_status_id[0]);
      this.leavesForm.controls.request_date_from.setValue(this.leave.request_date_from);
      this.leavesForm.controls.request_date_to.setValue(this.leave.request_date_to);
      this.leavesForm.controls.name.setValue(this.leave.private_name);
      this.leavesForm.controls.request_unit_hours.setValue(this.leave.request_unit_hours);
      this.leavesForm.controls.request_unit_half.setValue(this.leave.request_unit_half);
      // this.leavesForm.controls.halfDaySelect.setValue(null);
      // this.leavesForm.controls.hourUnit.setValue(null);
      this.leavesForm.controls.request_date_from_period.setValue(this.leave.request_date_from_period);
      this.leavesForm.controls.request_hour_from.setValue(this.leave.request_hour_from);
      this.leavesForm.controls.date_from.setValue(this.leave.date_from);
      this.leavesForm.controls.date_to.setValue(this.leave.date_to);
      this.leavesForm.controls.request_hour_to.setValue(this.leave.request_hour_to);
      this.leavesForm.controls.request_hour_to.setValue(this.leave.request_hour_to);
      // this.leavesForm.controls.request_unit_custom.setValue(this.leave.request_unit_custom);
      this.leavesForm.controls.state.setValue(this.leave.state);
      // this.leavesForm.controls.private_name.setValue(this.leave.private_name);
      // this.leavesForm.controls.rec_id.setValue(this.leave.id);
      this.leavesForm.controls.user_id.setValue(parseInt(this.user_id));
      let unpaid:any = 4
      if(this.leave.holiday_status_id == unpaid){
        this.isDateToVisible = false;
        this.toCalendarVisible = false
      }
    }

  }
  openFromCalendar(){
    this.fromCalendarVisible = true
  }
  submitFromCalendar(event:any){
    this.fromCalendarVisible = false;
    this.leavesForm.controls.request_date_from.setValue(`${event.detail.value.split("T")[0]}`);
    this.leavesForm.controls.date_from.setValue(`${event.detail.value.replace("T"," ")}`);
    this.requestFromInHours = event.detail.value.split("T")[1];
  }

  cancelFromCalendar(){
    this.fromCalendarVisible = false
  }

  openToCalendar(){
    this.toCalendarVisible = true
  }

  submitToCalendar(event:any){
    this.toCalendarVisible = false;
    this.leavesForm.controls.request_date_to.setValue(`${event.detail.value.split("T")[0]}`);
    this.leavesForm.controls.date_to.setValue(`${event.detail.value.replace("T"," ")}`);
    this.requestFromInHours = event.detail.value.split("T")[1];
  }

  cancelToCalendar(){
    this.toCalendarVisible = false;
  }
  onSubmit(){

    this.leavesForm.controls.private_name.setValue(this.leavesForm.controls.name.value)
    if(!this.newLeave){
      this.leaveService.updateLeave(this.leavesForm.value).then(async (res:any)=>{
        console.log(res.data)
        if(res.data){
          await this.createAlert('Okay','Leave has been updated Successfully','Ok','ok')
        }else{
          let error = res.faultString.split("doo.exceptions.ValidationError: ");
          await this.createAlert('Error',error,'Ok','cancel');
        }
      }).catch((err)=>{
        this.createAlert('Error','Unable to update please contact the administrator to fix the error','Ok','cancel')
        console.log(err)
      })
    }else{
      let request_date_from_period:any = false;

      if (!this.leavesForm.controls.request_date_to.value) {
        // @ts-ignore
        let toDate = new Date(this.leavesForm.controls.request_date_from.value)
        this.leavesForm.controls.request_date_to.setValue(this.formatDateYYYMMDD(toDate.setDate(toDate.getDate() + 1)))
      }
      if (this.typeUnitHour == 'day') {
        this.leavesForm.controls.request_unit_half.setValue(false)
        this.leavesForm.controls.request_unit_hours.setValue(false)
        this.leavesForm.controls.request_date_from_period.setValue(request_date_from_period)

      } else if (this.typeUnitHour == 'half_day') {
        this.leavesForm.controls.request_unit_half.setValue(true)
        this.leavesForm.controls.request_unit_hours.setValue(false)

      } else if (this.typeUnitHour == 'hour') {
        this.leavesForm.controls.request_unit_hours.setValue(true)
        this.leavesForm.controls.request_date_from_period.setValue(request_date_from_period)
      }
      if (this.leavesForm.controls.request_hour_from.value) {
        this.leavesForm.controls.request_hour_from.setValue(this.leavesForm.controls.request_hour_from.value)
        this.leavesForm.controls.request_hour_to.setValue(this.leavesForm.controls.request_hour_to.value)
      }
      this.leaveService.createLeave(this.leavesForm.value)
        .then((res: any) => {
          if (res.data) {
            this.createAlert('Success','Leave has been added successfully', "OK",'ok')
          } else {
            let error = res.faultString.split("doo.exceptions.ValidationError: ")
            this.createAlert("Error",error[1] != undefined ? error[1] : error[0], "OK",'cancel')
          }
        }).catch((e:any) => {
        this.createAlert("Error",'Unable to update, please contact administrator to fix the error', "OK",'cancel');
        console.log(e)
      })

    }
  }

  async openStartTimePicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'hours',
          options: [
            {
              text: '00',
              value: '00',
            },
            {
              text: '01',
              value: '01',
            },
            {
              text: '02',
              value: '02',
            },
            {
              text: '03',
              value: '03',
            },
            {
              text: '04',
              value: '04',
            },
            {
              text: '05',
              value: '05',
            },
            {
              text: '06',
              value: '06',
            },
            {
              text: '07',
              value: '07',
            },
            {
              text: '08',
              value: '08',
            },
            {
              text: '09',
              value: '09',
            },
            {
              text: '10',
              value: '10',
            },
            {
              text: '11',
              value: '11',
            },
            {
              text: '12',
              value: '12',
            },
            {
              text: '13',
              value: '13',
            },
            {
              text: '14',
              value: '14',
            },
            {
              text: '15',
              value: '15',
            },
            {
              text: '16',
              value: '16',
            },
            {
              text: '17',
              value: '17',
            },
            {
              text: '18',
              value: '18',
            },
            {
              text: '19',
              value: '19',
            },
            {
              text: '20',
              value: '20',
            },
            {
              text: '21',
              value: '21',
            },
            {
              text: '22',
              value: '22',
            },
            {
              text: '23',
              value: '23',
            },
            {
              text: '24',
              value: '24',
            }
          ],
        },{
          name:"minutes",
          options:[
            {
              text: '00',
              value: '00',
            },
            {
              text: '01',
              value: '01',
            },
            {
              text: '02',
              value: '02',
            },
            {
              text: '03',
              value: '03',
            },
            {
              text: '04',
              value: '04',
            },
            {
              text: '05',
              value: '05',
            },
            {
              text: '06',
              value: '06',
            },
            {
              text: '07',
              value: '07',
            },
            {
              text: '08',
              value: '08',
            },
            {
              text: '09',
              value: '09',
            },
            {
              text: '10',
              value: '10',
            },
            {
              text: '11',
              value: '11',
            },
            {
              text: '12',
              value: '12',
            },
            {
              text: '13',
              value: '13',
            },
            {
              text: '14',
              value: '14',
            },
            {
              text: '15',
              value: '15',
            },
            {
              text: '16',
              value: '16',
            },
            {
              text: '17',
              value: '17',
            },
            {
              text: '18',
              value: '18',
            },
            {
              text: '19',
              value: '19',
            },
            {
              text: '20',
              value: '20',
            },
            {
              text: '21',
              value: '21',
            },
            {
              text: '22',
              value: '22',
            },
            {
              text: '23',
              value: '23',
            },
            {
              text: '24',
              value: '24',
            },
            {
              text: '25',
              value: '25',
            },
            {
              text: '26',
              value: '26',
            },
            {
              text: '27',
              value: '27',
            },
            {
              text: '28',
              value: '28',
            },
            {
              text: '29',
              value: '29',
            },
            {
              text: '30',
              value: '30',
            },
            {
              text: '31',
              value: '31',
            },
            {
              text: '32',
              value: '32',
            },
            {
              text: '33',
              value: '33',
            },
            {
              text: '34',
              value: '34',
            },
            {
              text: '35',
              value: '35',
            },
            {
              text: '36',
              value: '36',
            },
            {
              text: '37',
              value: '37',
            },
            {
              text: '38',
              value: '38',
            },
            {
              text: '39',
              value: '39',
            },
            {
              text: '40',
              value: '40',
            },
            {
              text: '41',
              value: '41',
            },
            {
              text: '42',
              value: '42',
            },
            {
              text: '43',
              value: '43',
            },
            {
              text: '44',
              value: '44',
            },
            {
              text: '45',
              value: '45',
            },
            {
              text: '46',
              value: '46',
            },
            {
              text: '47',
              value: '47',
            },
            {
              text: '48',
              value: '48',
            },
            {
              text: '49',
              value: '49',
            },
            {
              text: '50',
              value: '50',
            },
            {
              text: '51',
              value: '51',
            },
            {
              text: '52',
              value: '52',
            },
            {
              text: '53',
              value: '53',
            },
            {
              text: '54',
              value: '54',
            },
            {
              text: '55',
              value: '55',
            },
            {
              text: '56',
              value: '56',
            },
            {
              text: '57',
              value: '57',
            },
            {
              text: '58',
              value: '58',
            },
            {
              text: '59',
              value: '59',
            },
            {
              text: '60',
              value: '60',
            }
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value:any) => {
            let hour:any = `${value.hours.value}:${value.minutes.value}`;
            this.leavesForm.controls.request_hour_from.setValue(hour)
          },
        },
      ],
    });

    await picker.present();
  }

  async openEndTimePicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'hours',
          options: [
            {
              text: '00',
              value: '00',
            },
            {
              text: '01',
              value: '01',
            },
            {
              text: '02',
              value: '02',
            },
            {
              text: '03',
              value: '03',
            },
            {
              text: '04',
              value: '04',
            },
            {
              text: '05',
              value: '05',
            },
            {
              text: '06',
              value: '06',
            },
            {
              text: '07',
              value: '07',
            },
            {
              text: '08',
              value: '08',
            },
            {
              text: '09',
              value: '09',
            },
            {
              text: '10',
              value: '10',
            },
            {
              text: '11',
              value: '11',
            },
            {
              text: '12',
              value: '12',
            }
          ],
        },{
          name:"minutes",
          options:[
            {
              text: '00',
              value: '00',
            },
            {
              text: '01',
              value: '01',
            },
            {
              text: '02',
              value: '02',
            },
            {
              text: '03',
              value: '03',
            },
            {
              text: '04',
              value: '04',
            },
            {
              text: '05',
              value: '05',
            },
            {
              text: '06',
              value: '06',
            },
            {
              text: '07',
              value: '07',
            },
            {
              text: '08',
              value: '08',
            },
            {
              text: '09',
              value: '09',
            },
            {
              text: '10',
              value: '10',
            },
            {
              text: '11',
              value: '11',
            },
            {
              text: '12',
              value: '12',
            },
            {
              text: '13',
              value: '13',
            },
            {
              text: '14',
              value: '14',
            },
            {
              text: '15',
              value: '15',
            },
            {
              text: '16',
              value: '16',
            },
            {
              text: '17',
              value: '17',
            },
            {
              text: '18',
              value: '18',
            },
            {
              text: '19',
              value: '19',
            },
            {
              text: '20',
              value: '20',
            },
            {
              text: '21',
              value: '21',
            },
            {
              text: '22',
              value: '22',
            },
            {
              text: '23',
              value: '23',
            },
            {
              text: '24',
              value: '24',
            },
            {
              text: '25',
              value: '25',
            },
            {
              text: '26',
              value: '26',
            },
            {
              text: '27',
              value: '27',
            },
            {
              text: '28',
              value: '28',
            },
            {
              text: '29',
              value: '29',
            },
            {
              text: '30',
              value: '30',
            },
            {
              text: '31',
              value: '31',
            },
            {
              text: '32',
              value: '32',
            },
            {
              text: '33',
              value: '33',
            },
            {
              text: '34',
              value: '34',
            },
            {
              text: '35',
              value: '35',
            },
            {
              text: '36',
              value: '36',
            },
            {
              text: '37',
              value: '37',
            },
            {
              text: '38',
              value: '38',
            },
            {
              text: '39',
              value: '39',
            },
            {
              text: '40',
              value: '40',
            },
            {
              text: '41',
              value: '41',
            },
            {
              text: '42',
              value: '42',
            },
            {
              text: '43',
              value: '43',
            },
            {
              text: '44',
              value: '44',
            },
            {
              text: '45',
              value: '45',
            },
            {
              text: '46',
              value: '46',
            },
            {
              text: '47',
              value: '47',
            },
            {
              text: '48',
              value: '48',
            },
            {
              text: '49',
              value: '49',
            },
            {
              text: '50',
              value: '50',
            },
            {
              text: '51',
              value: '51',
            },
            {
              text: '52',
              value: '52',
            },
            {
              text: '53',
              value: '53',
            },
            {
              text: '54',
              value: '54',
            },
            {
              text: '55',
              value: '55',
            },
            {
              text: '56',
              value: '56',
            },
            {
              text: '57',
              value: '57',
            },
            {
              text: '58',
              value: '58',
            },
            {
              text: '59',
              value: '59',
            },
            {
              text: '60',
              value: '60',
            }
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            let hour:any = `${value.hours.value}:${value.minutes.value}`;
            this.leavesForm.controls.request_hour_to.setValue(hour)
          },
        },
      ],
    });

    await picker.present();
  }

  async createAlert(header:any, message:any, buttonText:any,role:any){
    const alertCtrl = await this.alertCtrl.create({
      header:header,
      message:message,
      cssClass: 'custom-alert',
      buttons:[
        {
          text:buttonText,
          handler:async()=>{
            await this.alertCtrl.dismiss(null,role);
            if(role == 'ok'){
              await this.modalCtrl.dismiss(null,'reload');
            }
          }
        }

      ]
    })

    await alertCtrl.present()
  }
  formatDateYYYMMDD(date:any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  onLeaveTypeChanged() {
    let unpaid:any = 4
    if(this.leavesForm.controls.holiday_status_id.value == unpaid){
      this.isDateToVisible = false;
      this.toCalendarVisible = false
    }
  }
}
