import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Segments } from 'src/app/@app/@interfaces/segments';

@Component({
  selector: 'app-segment-tabs',
  templateUrl: './segment-tabs.component.html',
  styleUrls: ['./segment-tabs.component.scss'],
})
export class SegmentTabsComponent  implements OnInit {
  @Input() segments: any = []
  @Input() customClass = false
  @Output() segmentChange: EventEmitter<any> = new EventEmitter()
  segmentValue: any
  constructor() { }
  ngOnInit() {
    let defaults = this.segments.filter((seg: { default: any; }) => { return seg.default })
    this.segmentValue = defaults[0].key
  }
  emitValue() {
    this.segmentChange.emit(this.segmentValue)
  }
}
