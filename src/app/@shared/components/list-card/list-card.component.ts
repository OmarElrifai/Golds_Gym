import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  @Input() cardData: any;
  @Input() isEditBtnVisible: any;
  constructor() {}

  ngOnInit() {

  }
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getDisplayValue(value: any): string {
    return value || 'N/A';
  }

  getValidImageSource(base64: string): string {
    return base64
      ? 'data:image/png;base64,' + base64
      : 'path/to/default/image.png';
  }
}
