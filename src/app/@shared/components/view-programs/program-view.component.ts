import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProgramsService} from "../../services/programs.service";
import {Preferences} from "@capacitor/preferences";
import {ModalController, PickerController} from "@ionic/angular";
import { AttendeesListComponent } from './attendees-list/attendees-list.component';
import {TabSection} from "../../tabSection";
import {DateFormaterService} from "../../services/date-formater.service";

@Component({
  selector: 'app-program-view',
  templateUrl: './program-view.component.html',
  styleUrls: ['./program-view.component.scss'],
})
export class ProgramViewComponent  implements OnInit {

  @Input() program : any;
  @Input() isViewMode:any;
  @Input() clientID:any;
  sessions:any;
  completedSessions:any;
  results:any = [];
  userID:any;
  segmentValue = "sessions";
  segments:TabSection []=[];
  trainerDetails:any;
  private completedSessionsCount: any = 0;
  pickedDate: any;
  constructor(private router:Router,
              private programService:ProgramsService,
              private modalCtrl:ModalController,
              private pickerCtrl:PickerController,
              private dateFormater:DateFormaterService
              ) {
    const extras:any = this.router.getCurrentNavigation()?.extras;
    const state:any = extras?.state;
    const program:any = state?.program;
    this.program = program
  }

  ngOnInit() {
    this.setSessionsAndSchedule();
    this.setSegments();
  }

  setSegments(){
    if(this.isViewMode){
      this.segmentValue = "completed"
      this.segments = [
        {
          default: true,
          includeIcon: false,
          textRequired:true,
          iconFamily: "fad",
          icon: "person",
          key: "completed",
          text:`Completed(${this.completedSessionsCount})`
        }
      ]
    }else{
      this.segments = [
        {
          default: true,
          includeIcon: true,
          textRequired:true,
          iconFamily: "fad",
          icon: "barbell",
          key: "sessions",
          text:"Sessions"
        },
        {
          default: false,
          includeIcon: true,
          textRequired:true,
          icon: "checkbox",
          key: "completed",
          text:"Completed"
        },
        {
          default: false,
          includeIcon: true,
          textRequired:true,
          icon: "person",
          key: "schedule",
          text:"Schedule"
        }
      ];
    }
  }

  setSessionsAndSchedule() {
    let date = new Date;
    let month = this.dateFormater.getMonth(date.getMonth());
    let year = date.getFullYear();
    let convertedDate = year + "-" + month +"-";
    let dateFrom = convertedDate + this.getFirstAndLastDay(year,month)[0];
    let dateTo = convertedDate + this.getFirstAndLastDay(year,month)[1];
    Preferences.get({ key: "app_user" }).then((user: any) => {
      if(this.isViewMode){
        this.programService.getCompletedClientSessions(this.clientID,this.program.id).subscribe((res:any)=>{
          this.completedSessions = res.data;
          this.completedSessionsCount = this.completedSessions.length;
          this.results = this.completedSessions;
          this.setSegments();
        })
      }else{
        this.userID = JSON.parse(user.value).userID;
        this.programService.getUserSessionsForProgram(this.userID,this.program.id).subscribe((res:any)=>{
          this.sessions = res.data;
          this.segmentValue == "sessions" ? this.results = this.sessions:null;
        })
        this.programService.getCompletedUserSessions(this.userID,this.program.id).subscribe((res:any)=>{
          this.completedSessions = res.data;
          this.segmentValue == "completed" ? this.results = this.completedSessions:null;
          console.log("completedSessions:  ",this.completedSessions)
        })
        this.programService.getTrainerSchedule(this.userID,dateFrom,dateTo).subscribe((res:any)=>{
          this.trainerDetails = res.data;
          console.log("trainerDetails --- ",this.trainerDetails)
        })


      }


    })
  }

  ionViewWillEnter(){
    console.log("loaded: --------")
    const extras:any = this.router.getCurrentNavigation()?.extras;
    const state:any = extras?.state;
    const sessionStartTime = state?.startTime;
    const sessionEndTime = state?.startTime;
    console.log("state:---- ",state)
    if(sessionStartTime && sessionEndTime){
      console.log('sessionTime ----', sessionStartTime)
      console.log('sessionTime ----', sessionEndTime)
    }
  }
  updateView(event:any){
    this.segmentValue = event
    console.log("tab     ",this.segmentValue)
    if(this.segmentValue == "sessions"){
      this.results = this.sessions;
    }else{
      this.results = this.completedSessions;
    }
    console.log("result     " , this.results)
  }

  handleInput(event: any) {

    const query = event.target.value.toLowerCase();
    if(this.segmentValue == "sessions"){
      this.results = this.sessions.filter((session: any) => {
        return (
          (session.name &&
            session.name.toLowerCase().indexOf(query) > -1) ||
          (session.company_id[1] && session.company_id[1].toLowerCase().indexOf(query) > -1) ||
          (session.session_time && session.session_time.indexOf(query) > -1)
        );
      });
    }else{
      this.results = this.completedSessions.filter((session: any) => {
        return (
          (session.name &&
            session.name.toLowerCase().indexOf(query) > -1) ||
          (session.company_id[1] && session.company_id[1].toLowerCase().indexOf(query) > -1) ||
          (session.session_time && session.session_time.indexOf(query) > -1)
        );
      });
    }
  }

  closeProgramModel(){
    this.modalCtrl.dismiss();
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
          handler: (value:any) => {
            this.pickedDate = `${value.year.value}-${value.month.value}`;
            var firstDay = this.getFirstAndLastDay(value.year.value,value.month.value)[0];
            var lastDay = this.getFirstAndLastDay(value.year.value,value.month.value)[1];
            let dateFrom = `${this.pickedDate}-${firstDay}`;
            let dateTo = `${this.pickedDate}-${lastDay}`;
            console.log(dateFrom, "-", dateTo);
            this.programService.getTrainerSchedule(this.userID,dateFrom,dateTo).subscribe((res:any)=>{
              console.log(res);
              this.trainerDetails = res.data;
            })
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
