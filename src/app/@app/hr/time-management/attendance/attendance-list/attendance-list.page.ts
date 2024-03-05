import { Component, OnInit,Input } from '@angular/core';
import {PickerController} from "@ionic/angular";
import {AttendanceService} from "../services/attendance/attendance.service";
import {SharedService} from "../../../../../@shared/shared.service";

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.page.html',
  styleUrls: ['./attendance-list.page.scss'],
})
export class AttendanceListPage implements OnInit {

  public pickedDate:any;
  public attendance:any;
  public penalties:any;
  public dateFrom:any;
  public dateTo:any;
  @Input() toolbarTitle:any;
  @Input() isManager:any;
  @Input() viewPenalties:any;
  private user_id = localStorage.getItem("user_id")


  constructor(private pickerCtrl:PickerController,private attendanceService:AttendanceService) { }

  ngOnInit() {
  }

  async openDatePicker(){
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'month',
          options: [
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
            },{
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
            },{
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
          name: 'year',
          options: [
            {
              text: '2024',
              value: '2024',
            },
            {
              text: '2023',
              value: '2023',
            },
            {
              text: '2022',
              value: '2022',
            },
            {
              text: '2021',
              value: '2021',
            },
            {
              text: '2020',
              value: '2020',
            },{
              text: '2019',
              value: '2019',
            },
            {
              text: '2018',
              value: '2018',
            },
            {
              text: '2017',
              value: '2017',
            },
            {
              text: '2016',
              value: '2016',
            },{
              text: '2015',
              value: '2015',
            },
            {
              text: '2014',
              value: '2014',
            },
            {
              text: '2013',
              value: '2013',
            },
            {
              text: '2012',
              value: '2012',
            },
            {
              text: '2011',
              value: '2011',
            },
            {
              text: '2010',
              value: '2010',
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
            this.pickedDate = `${value.year.value}-${value.month.value}`;
            var firstDay = this.getFirstAndLastDay(value.year.value,value.month.value)[0];
            var lastDay = this.getFirstAndLastDay(value.year.value,value.month.value)[1];
            this.dateFrom = `${this.pickedDate}-${firstDay}`;
            this.dateTo = `${this.pickedDate}-${lastDay}`;
            if(this.isManager) {

              this.attendanceService.getAllAttendance(this.dateFrom,this.dateTo,this.user_id).subscribe((attendance: any) => {
                this.attendance = JSON.parse(JSON.stringify(attendance)).data;
              })
            }else if(this.viewPenalties){
              this.attendanceService.getPenalties(this.dateFrom,this.dateTo,this.user_id).subscribe((penalties: any) => {
                this.penalties = penalties;
              })
            }else{
              this.attendanceService.getAttendanceForUser(this.user_id, this.pickedDate).subscribe((attendance: any) => {
                this.attendance = JSON.parse(JSON.stringify(attendance)).data;
              })
            }
          },
        },
      ],
    });

    await picker.present();
  }

  getFirstAndLastDay(year:any,month:any) {
    var date = new Date();
    var firstDay = '' + new Date(year, parseInt(month)-1, 1).getDate()
    var lastDay = '' + new Date(year, parseInt(month), 0).getDate();
    if (firstDay.length < 2)
      firstDay = "0" + firstDay
    if (lastDay.length < 2)
      lastDay = "0" + lastDay
    return [firstDay, lastDay]
  }
}
