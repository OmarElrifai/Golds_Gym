import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss'],
})
export class AttendeesComponent  implements OnInit {
  @Input() attendeesList: any;
  @Input() sessionTime: any;

  constructor() { }

  ngOnInit() {}

}
