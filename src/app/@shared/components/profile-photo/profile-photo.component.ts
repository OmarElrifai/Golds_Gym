import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss'],
})
export class ProfilePhotoComponent  implements OnInit {

  @Input() editable:any;
  @Input() photoExist:any;
  @Input() imageSrc:any;
  @Output() editPhotoEvent = new EventEmitter();
  @Output() deletePhotoEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  editPhoto(){
    this.editPhotoEvent.emit()
  }

  deletePhoto(){
    this.deletePhotoEvent.emit()
  }


}
