import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cover-photo',
  templateUrl: './cover-photo.component.html',
  styleUrls: ['./cover-photo.component.scss'],
})
export class CoverPhotoComponent  implements OnInit {

  @Input() photo:any;

  constructor() { }

  ngOnInit() {
  }

}
