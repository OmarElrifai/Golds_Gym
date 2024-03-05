import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProgramsService} from "../../../../services/programs.service";

@Component({
  selector: 'app-view-attendees',
  templateUrl: './view-attendees.component.html',
  styleUrls: ['./view-attendees.component.scss'],
})
export class ViewAttendeesComponent  implements OnInit {

  @Input() session:any;
  atendees = new BehaviorSubject(null)
  attendeesList:any = [];
  constructor(private programService:ProgramsService) { }

  ngOnInit() {
    console.log("session",this.session);
    this.atendees = this.programService.getAttendeesList(this.session.attend_ids);
    this.atendees.subscribe((customer:any)=>{
      if(customer){
        this.attendeesList.push(customer)
      }
      console.log(this.attendeesList)
    })
  }

  ionViewWillLeave(){
    // this.customers.unsubscribe()
    this.programService.clearListOfAttendees()

  }
}
