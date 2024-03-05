import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ModalController} from '@ionic/angular';
import {BehaviorSubject, Subscription} from 'rxjs';
import { SharedService } from 'src/app/@shared/shared.service';
import { ContactsService } from '../../service/contacts.service';
import { CustomCreateFormComponent } from 'src/app/@shared/components/custom-create-form/custom-create-form.component';
import {HrHomePageData} from "../../../hr/hrHomePageData";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../../@shared/services/util.service";
import {ProgramsService} from "../../../../@shared/services/programs.service";
import {ProgramViewComponent} from "../../../../@shared/components/view-programs/program-view.component";

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.page.html',
  styleUrls: ['./single-contact.page.scss'],
})
export class SingleContactPage implements OnInit, OnDestroy {
  private contactId:any;
  contactData: any;
  observableSub!: Subscription;
  editable:any;
  fields: any;
  @ViewChild("fileUploader") fileUploader!:ElementRef;
  public imageUrl: any;
  public segments = HrHomePageData.contactSegments;
  public contact :any;
  public contactSubject =new BehaviorSubject(null);
  public segmentValue = "profile";
  public checkType:any;
  public programs:any;
  public contactForm = new FormGroup({
    name: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    street: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    image_1920: new FormControl('',Validators.required),
  });
  constructor(
    private router: Router,
    private shared: SharedService,
    private modalCtrl: ModalController,
    private contactService: ContactsService,
    private route:ActivatedRoute,
    private alrtController:AlertController,
    private programService:ProgramsService,
  ) {

  }

  ngOnInit() {
   const contactID = this.route.snapshot.paramMap.get("id") || "";
    this.contactId = parseInt(contactID);
    const navigation = this.router.getCurrentNavigation();
    const state:any = navigation?.extras?.state;
    const contactId = state?.contactId;
    console.log("navigation Object:  ",contactId)
    this.setContactsAndSales()
  }

  setContactsAndSales(){
    this.contactService.getSingleContact(this.contactId).subscribe((contact:any)=>{
      console.log("contact: ",contact);
      this.contact = contact.data[0];
      this.setContactForm();
      this.programService.getClientPrograms(this.contactId).subscribe((res:any)=>{
        console.log(res.data)
        this.programs=res.data;
      })

    })
  }
  setContactForm(){
    this.contactForm.controls.name.setValue(this.contact?.name);
    this.contactForm.controls.email.setValue(this.contact?.email)
    this.contactForm.controls.city.setValue(this.contact?.city);
    this.contactForm.controls.phone.setValue(this.contact?.phone);
    this.contactForm.controls.street.setValue(this.contact?.street);
    this.contact?.image_1920 ? this.contactForm.controls.image_1920.setValue(this.contact?.image_1920):null;
  }
  onSegmentChange(segmentChange:any){
    console.log(segmentChange)
    this.segmentValue = segmentChange
  }

  submit(){
    console.log(this.contactForm.value)
    this.contactService.updateContact(this.contactId,this.contactForm.value).subscribe(async(res:any)=>{
      if(res.data){
        const alert = await this.alrtController.create({
          header:"Success",
          message:"Contact Updated Successfully",
          buttons:[{
            text:"Ok",
            handler:()=>{
              this.contactService.getSingleContact(parseInt(this.contactId)).subscribe((contact:any)=>{
                this.contactSubject.next(contact.data[0])
                this.contactSubject.subscribe((contact:any)=>{
                  console.log("contact: ",contact);
                  this.contact = contact;
                  this.setContactForm();
                })
                // this.contact = contact.data[0];
                this.programService.getClientPrograms(this.contactId).subscribe((res:any)=>{
                  console.log(res.data)
                  this.programs=res.data;
                })
              })

            }
          }]
        });
        alert.present();
      }else{
        const alert = await this.alrtController.create({
          header:"Error",
          message:"Unable to update contact, please contact administrtor ",
          buttons:[{
            text:"Ok",
            role:"cancel"
          }]
        });
        alert.present();
        console.log(res.faultString)
      }
    },async (error) => {
        const alert = await this.alrtController.create({
          header:"Error",
          message:"Unable to update contact, please contact administrtor ",
          buttons:[{
            text:"Ok",
            role:"cancel"
          }]
        });
        alert.present();
        console.log(error.message)
    });
    this.editable = false;
  }
  edit(){
    this.editable = true;
  }
  cancel() {
    this.editable = false;
  }



  ngOnDestroy(): void {
  }

  editPhoto(){
    this.fileUploader.nativeElement.click();

  }

  deletePhoto(){
    let value:any = false
    this.contactForm.controls.image_1920.setValue(value)
  }
   async upload(event: any) {
    const file = event.target.files[0];
    const base64:any = await this.convertBase64(file) ;
    this.contactForm.controls.image_1920.setValue(base64.split("base64,")[1]);
    console.log(this.contactForm.controls.image_1920.value)
  }

  convertBase64(file:any)  {
    return new Promise(async(resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = async() => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  async viewProgram(cardData: any) {
    const modal = await this.modalCtrl.create({
      component:ProgramViewComponent,
      componentProps:{program:cardData,isViewMode:true,clientID:this.contactId}
    })
    modal.present();
  }
}
