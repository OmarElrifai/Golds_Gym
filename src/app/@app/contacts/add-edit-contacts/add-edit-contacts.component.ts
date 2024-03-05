import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactsService} from "../service/contacts.service";
import {AlertController, ModalController} from "@ionic/angular";
import {text} from "ionicons/icons";
import {resolve} from "@angular/compiler-cli";

@Component({
  selector: 'app-add-edit-contacts',
  templateUrl: './add-edit-contacts.component.html',
  styleUrls: ['./add-edit-contacts.component.scss'],
})
export class AddEditContactsComponent  implements OnInit {

  public photoEditable:any = true;
  public photoExist:any = false;
  @ViewChild("fileReader") fileReader! : ElementRef;
  public contactForm = new FormGroup({
    name: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    street: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    image_1920:new FormControl('',Validators.required),
  })
  constructor(private contactService: ContactsService, private modalController:ModalController,private alrtController: AlertController) { }

  ngOnInit() {}

  editPhoto(){
    this.fileReader.nativeElement.click();
  }

  deletePhoto(){
    this.contactForm.controls.image_1920.setValue(null);
    this.photoExist = false;
  }
  async upload(event:any){
    const file = event.target.files[0];
    const base64:any = await this.base64Photo(file);
    this.contactForm.controls.image_1920.setValue(base64.split("base64,")[1]);
    this.photoExist = true;
  }
  base64Photo(file:any){
    return new Promise((resolve,reject)=>{
      const fileReader:any = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = ()=>{
        resolve(fileReader.result)
      }
      fileReader.onError = ()=>{
        reject(fileReader.result)
      }
    })
  }
  submit(){
    this.contactService.createContact(this.contactForm.value).subscribe(async(res:any)=>{
      if(res.data){
        const alert = await this.alrtController.create({
          header:"Success",
          message:"Contact have been created successfully",
          buttons:[{
            text:"Ok",
            role:"cancel",
            handler:()=>{
              this.modalController.dismiss(null,"confirm")
            }
          }]
        });
        alert.present();
      }else{
        const alert = await this.alrtController.create({
          header:"Error",
          message:"Unable to create contact, please contact administrator",
          buttons:[{
            text:"Ok",
            role:"cancel"
          }]
        });
        alert.present();
        this.modalController.dismiss()
      }
    })
  }


}
