import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import { CustomCreateFormComponent } from 'src/app/@shared/components/custom-create-form/custom-create-form.component';
import { ProgramsService } from '../../@shared/services/programs.service';
import { Preferences } from '@capacitor/preferences';
import {CalendarSharedComponent} from "../../@shared/components/calendar/calendar-shared.component";
import {Router} from "@angular/router";
import {ProgramViewComponent} from "../../@shared/components/view-programs/program-view.component";

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {
  programs: any;
  constructor(
    private modalCtrl: ModalController,
    private programService: ProgramsService,
    private navCtrl:NavController,
    private router:Router
  ) {}

  public results: any;
  ngOnInit() {
    Preferences.get({ key: "app_user" }).then((user: any) => {
      const userID = JSON.parse(user.value).userID
      this.programService.getUserPrograms(userID).subscribe((res: any) => {
        console.log(res.data);
        this.programs = res.data;
        this.results = this.programs;
      });
    })
    console.log('---------- this should appear after user user id -------');

  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);

    this.results = this.programs.filter((contact: any) => {
      return (
        (contact.name &&
          contact.name.toLowerCase().indexOf(query) > -1) ||
        (contact.partner_id[1] && contact.partner_id[1].toLowerCase().indexOf(query) > -1) ||
        (contact.date_start && contact.date_start.toLowerCase().indexOf(query) > -1)
      );
    });

    console.log(this.results);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CustomCreateFormComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(
        '---------- close modal method with confirm role ------------'
      );
      console.log(data);
    }
  }
  async openCalendar(){
    const modal = await this.modalCtrl.create({
      component: CalendarSharedComponent,
    });
    modal.present();
  }
  async viewProgram(program:any){
    const modal = await this.modalCtrl.create({
      component:ProgramViewComponent,
      componentProps:{program:program}
    })
    modal.present();
  }
}
