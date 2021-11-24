import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DisplayStoreComponent } from '../display-store/display-store.component';
import { RatingWindowComponent } from '../rating-window/rating-window.component';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  constructor(private router: Router, private service: ApiService, private tempData:TempdataService, public dialog: MatDialog) { }

  order!: string;
  orderDatas: any;

  ngOnInit(): void {
    this.orderDatas = this.tempData.getOrderData();
    
    let resp = this.service.orderstatus();
    resp.subscribe(data=>{
      console.log(data)
      this.orderDatas = data;
      this.tempData.setOrderData(this.orderDatas);
      //this.tempData.setOrderData(this.orderDatas); //Item data will be stored in ItemData tempvariable
    })
  }

  LeaveFeedback(email : string){
    this.tempData.setMessageUsername(email);
    this.dialog.open(RatingWindowComponent);
  }

  displayStore(storeUsername: string){
    this.tempData.setMessageUsername(storeUsername);
    this.tempData.setRequestFrom("order");
    this.dialog.open(DisplayStoreComponent);
  }

}
