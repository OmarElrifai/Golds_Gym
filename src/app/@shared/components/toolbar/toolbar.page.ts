import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {PopoverController} from "@ionic/angular";
import {ToolbarMenuComponent} from "./toolbar-menu/toolbar-menu.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.page.html',
  styleUrls: ['./toolbar.page.scss'],
})
export class ToolbarPage implements OnInit {

  @Input() routeBackPath: any;
  @Input() title: any
  @Input() isSearchBarVisible:any;
  @Input() isMenuVisible = true;
  @Output() backButtonAction = new EventEmitter();
  @Output() handleInputEvent = new EventEmitter();
  constructor(private router:Router, private popoverCtrl:PopoverController) { }

  ngOnInit() {
  }

  async openMenu(event:any){
    const popover = await this.popoverCtrl.create({
      component:ToolbarMenuComponent,
      event:event
    })
    await popover.present();
  }

  backButtonFunction(){
    this.backButtonAction.emit()
  }

  handleInput(event: any) {
    console.log(event)
    this.handleInputEvent.emit(event);
  }
}
