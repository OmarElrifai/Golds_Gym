import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Preferences} from "@capacitor/preferences";
import {Router} from "@angular/router";
import {IonSelect, ModalController, PopoverController} from "@ionic/angular";
import {ChangeLanguageComponent} from "./change-language/change-language.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss'],
})
export class ToolbarMenuComponent  implements OnInit {

  @ViewChild('lang') langSelect!:IonSelect;
  constructor(private router:Router, private modalCtrl:ModalController, private popoverCtrl:PopoverController) { }

  ngOnInit() {}


  async changeLanguage(){
    // this.popoverCtrl.dismiss().then(async ()=>{
    //   const popover = await this.modalCtrl.create({component:ChangeLanguageComponent})
    //   popover.present();
    // })

      this.langSelect.open()

  }

  languageSelected(event:any){
    console.log(event.detail.value)
  }
  async changePassword(){
    this.popoverCtrl.dismiss().then(async ()=>{
      const popover = await this.popoverCtrl.create({component:ChangePasswordComponent})
      popover.present();
    })
  }
  async logoutUser(){
  await Preferences.remove({ key: 'app_user' });
  this.popoverCtrl.dismiss();
  await this.router.navigateByUrl('/auth');
  }
}
