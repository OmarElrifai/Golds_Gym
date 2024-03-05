import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProgramsService} from "../../services/programs.service";
import {AlertController, ModalController, PickerController} from "@ionic/angular";
import { CalendarComponent, CalendarMode, QueryMode, Step } from 'ionic2-calendar';
import {Router} from "@angular/router";
import {Preferences} from "@capacitor/preferences";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskDetailsComponent} from "./task-details/task-details.component";
import {DateFormaterService} from "../../services/date-formater.service";

@Component({
  selector: 'app-shared-calendar',
  templateUrl: './calendar-shared.component.html',
  styleUrls: ['./calendar-shared.component.scss'],
})
export class CalendarSharedComponent  implements OnInit {

  @ViewChild(CalendarComponent) myCalendar!: CalendarComponent;
  eventSource: any = [];
  sessions:any = [];
  viewTitle: any;
  creatingNewTask:any;
  isToday: boolean;
  selectedTime :any;
  @Input() routeBackPath:any;
  @Input() session:any;
  sessionTime = new FormGroup({
    startTime : new FormControl('', Validators.required ),
    endTime : new FormControl('', Validators.required)
  })
  calendar = {
    mode: 'month' as CalendarMode,
    queryMode: 'local' as QueryMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      },
    },
    formatDay: "'Day' dd",
    formatDayHeader: "'Day' EEE",
    formatDayTitle: "'Day' MMMM dd, yyyy",
    formatWeekTitle: "'Week' w",
    formatWeekViewDayHeader: "'Day' EEE d",
    formatHourColumn: "'hour' ha",
    showEventDetail: false,
    startingDayMonth: 2,
    startingDayWeek: 2,
    allDayLabel: 'testallday',
    noEventsLabel: 'None',
    timeInterval: 15,
    autoSelect: false,
    locale: 'zh-CN',
    dir: 'rtl',
    scrollToHour: 3,
    preserveScrollPosition: true,
    lockSwipeToPrev: true,
    lockSwipeToNext: true,
    lockSwipes: true,
    startHour: 0,
    endHour: 24,
    sliderOptions: {
      spaceBetween: 10,
    },
  };
  constructor(private programService: ProgramsService,
              private modalCtrl:ModalController,
              private alrtCtrl:AlertController,
              private router:Router,
              private pickerCtrl:PickerController,
              private dateFormater:DateFormaterService) {
    this.isToday = false;
  }
  ngOnInit(): void {
    const extras:any = this.router.getCurrentNavigation()?.extras;
    const state:any = extras?.state;
    const session = state?.session;
    if(session){
      this.session = session;
      this.routeBackPath = "/programs/program-view"
    }
    Preferences.get({ key: 'app_user' })
      .then((user: any) => {
        const userID = JSON.parse(user.value).userID;
        this.programService.getUserSessions(userID).subscribe((res: any) => {
          console.log("events:     ",res.data)
          this.eventSource = this.createEvents(res.data);
          this.myCalendar.loadEvents();
        });
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });
  }

  createEvents(data: any[]): any[] {
    return data.map((session) => {
      const startTime = new Date(session.session_time);
      const endTime = new Date(session.date_deadline);
      endTime.setHours(endTime.getHours() + 4); // Set end time to one hour later

      return {
        name: session.name,
        startTime: startTime,
        endTime: endTime,
        allDay: false,
        attend_ids:session.attend_ids,
        enrolled_ids:session.enrolled_ids,
        id: session.id,
        project_id: session.project_id,
        partner_id:session.partner_id,
        create_date: session.create_date,
        company_id:session.company_id
      };
    });
  }

  // loadEvents() {
  //   this.eventSource = this.createRandomEvents();
  // }

  loadDynamicEvents() {
    let startTime = new Date('2023-01-20T03:00:40');
    let endTime = new Date('2023-01-22T05:39:22');

    this.eventSource.push({
      title: 'test',
      startTime: startTime,
      endTime: endTime,
      allDay: false,
    });
    this.myCalendar.loadEvents();
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title;
    console.log(
      'view title changed: ' + title + ', this.viewTitle: ' + this.viewTitle
    );
  }

  onEventSelected(event: any) {
    console.log("event: ",event)
  }

  changeMode(mode: any) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }



  onCurrentDateChanged(ev: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    ev.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === ev.getTime();
    console.log('Currently viewed date: ' + ev);
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 100; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    return events;
  }

  onRangeChanged(ev: any) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
    this.eventSource = this.createRandomEvents();
  }

  onDayHeaderSelected = (ev: {
    selectedTime: Date;
    events: any[];
    disabled: boolean;
  }) => {
    console.log(
      'Selected day: ' +
      ev.selectedTime +
      ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) +
      ', disabled: ' +
      ev.disabled
    );
  };

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  async onTimeSelected(ev: any) {
    // this.router.getCurrentNavigation()?.extras.state?.isCreatingNewTask
    if(ev.events.length>0){
      ev.events.map((event:any)=>{
        event.session_time = this.dateFormater.dateToStringConverter(event.startTime);
        event.date_deadline = this.dateFormater.dateToStringConverter(event.endTime);
      })
      const modal = await this.modalCtrl.create({
        component:TaskDetailsComponent,
        componentProps:{sessions:ev.events}
      })
      await modal.present();
    }else if(ev.events.length == 0 && this.session){
      this.selectedTime = `${ev.selectedTime.getFullYear()}-${ev.selectedTime.getMonth()<=10 ? '0'+(ev.selectedTime.getMonth()+1):ev.selectedTime.getMonth()+1}-${ev.selectedTime.getDate()<=10 ? '0'+ev.selectedTime.getDate():ev.selectedTime.getDate()}`
      console.log(ev)
      // this.session.session_time =
      // this.programService.updateSession(this.session)
    }

  }


  submitTime() {
    let startTime:any = `${this.selectedTime} ${this.sessionTime.controls.startTime.value}`
    let endTime:any = `${this.selectedTime} ${this.sessionTime.controls.endTime.value}`
    this.session.session_time = startTime;
    this.session.date_deadline = endTime;
    let sessionDTO = {
      id:this.session.id,
      session_time:this.session.session_time,
      date_deadline:this.session.date_deadline
    }
    console.log("session:  ",this.session)
    this.programService.updateSession(sessionDTO).subscribe(async(res:any)=>{
      if(res.data){
        this.modalCtrl.dismiss(null,"confirmed")
      }else{
        const alert = await this.alrtCtrl.create({
          header:"Error",
          message:"Unable to schedule session, please contact administrator",
          buttons:[
            {
              text:"Ok",
              role:"cancel"
            }
          ]
        })
        alert.present();
        console.log(res.faultString)
      }
    })

  }

  closeModal() {
    this.modalCtrl.dismiss()
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
          handler: (value) => {
            this.sessionTime.controls.startTime.setValue(`${value.hours.value}:${value.minutes.value}:00`)
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
            this.sessionTime.controls.endTime.setValue(`${value.hours.value}:${value.minutes.value}:00`)
          },
        },
      ],
    });

    await picker.present();
  }

}
