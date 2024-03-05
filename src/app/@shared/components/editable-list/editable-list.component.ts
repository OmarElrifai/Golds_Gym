import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-editable-list',
  templateUrl: './editable-list.component.html',
  styleUrls: ['./editable-list.component.scss'],
})
export class EditableListComponent  implements OnInit {

  @Input() list:any;
  @Input() choiceListBehaviour:any;
  private ordersCounter = 0;
  choicelist: any=[];


  constructor() { }

  ngOnInit() {
    this.choiceListBehaviour.subscribe((item:any)=>{
      if(item){
        this.choicelist.push(item);
        console.log("---------> choicelist:    === ",this.choicelist);
      }
    })
  }

  addOrder(){

    this.ordersCounter ++;
    const order = {
      id:this.ordersCounter,
      item_id:null
    }
    this.list.push(order)
  }

  updateOrder(event:any,id:any){
    console.log("event: ",event.detail)
    this.list.map((order:any)=>{
      order.id == id? order.item_id=event.detail.value:null;
    })
    console.log("update Order in list: ",this.list);

  }


}
