import { Component, Input, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';
import { BehaviorSubject } from 'rxjs';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-attendees-list',
  templateUrl: './attendees-list.component.html',
  styleUrls: ['./attendees-list.component.scss'],
})
export class AttendeesListComponent  implements OnInit {

  @Input() session:any;
  @Input() editAttendance:any;
  attendees = new BehaviorSubject(null);
  enrolled = new BehaviorSubject(null);
  attendeesList:any = [];
  enrolledList:any = [];
  addedAttendees:any = [];
  customers = new BehaviorSubject(null);
  customersList:any = [];
  attendee: any;
  constructor(private programService:ProgramsService,private alrtController:AlertController) { }

  ngOnInit() {
      console.log("session",this.session);
      this.enrolled = this.programService.getEnrolledList(this.session.enrolled_ids);
      this.enrolled.subscribe((customer:any)=>{
        if(customer){
          this.enrolledList.push(customer)
        }
        console.log("enrolled:", this.enrolledList)
      })
      this.attendees = this.programService.getAttendeesList(this.session.attend_ids);
      this.attendees.subscribe((customer:any)=>{
        if(customer){
          this.attendeesList.push(customer)
        }
        console.log("attendees:", this.attendeesList)
      })

  }

  ionViewWillLeave(){
    this.programService.clearListOfAttendees()
    this.programService.clearListOfEnrolled()

  }

  async addAttendance(event:any) {
    console.log("Added Attendees: ",event.detail.value)
    const attendees:any = [];
    const isAttendeeExist = this.attendeesList.filter((attendee:any)=>{
      return attendee.data[0].id == event.detail.value;
    })
    attendees.push(event.detail.value)
    this.attendeesList.map((attendee:any)=>{
      attendees.push(attendee.data[0].id)
    })
    this.attendeesList = [];
    const session = {
      id: this.session.id,
      attend_ids: event.detail.value
    }
    this.programService.updateSession(session).subscribe(()=>{

      this.programService.getSingleSession(this.session.id).subscribe((session:any)=>{
        this.programService.clearListOfAttendees();
        this.attendees = new BehaviorSubject(null);
        this.attendees = this.programService.getAttendeesList(session.data[0].attend_ids);
        console.log("updated Attendees" , this.attendees)
        this.attendees.subscribe((customer:any)=>{
          if(customer){
            this.attendeesList.push(customer)
          }
          console.log("attendees:", this.attendeesList)
        })
      })
    })

  }


}
