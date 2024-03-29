import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MessageComponent } from '../message/message.component';
import { Order } from '../models/Order';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-order-ship',
  templateUrl: './order-ship.component.html',
  styleUrls: ['./order-ship.component.scss']
})
export class OrderShipComponent implements OnInit {





  shippedDateFormControl = new FormControl('',[Validators.required, Validators.pattern("(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9]{2}"),])
  shipViaFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z- ]*"),])
  shipTrackingFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z0-9 ]*"),])

  orderId!: string;
  customerId!: string;
  storeId!: string;
  itemId!: string;
  itemPrice!: string;
  orderQty!: string;
  orderStatus!: string;
  orderDate!: string;
  paymentMethod!: string;
  shipMethod!: string;
  shipTracking!: string;
  shipVia!: string;
  shippedDate!: string;


  order!: string;
  orderDatas: any;

  constructor(route:ActivatedRoute, private router: Router, private service: ApiService, private tempData:TempdataService, public dialog: MatDialog, private dialogRef: MatDialog) 
  { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {return false;}; //to refresh the redirected page
  }

  ngOnInit(): void {

    this.orderDatas = this.tempData.getOrderData();
    for  (var orderData of this.orderDatas){
      if (this.tempData.getOrderId() == orderData.order.orderId) {
        this.orderId = orderData.order.orderId;
        this.customerId = orderData.order.customerId;
        this.storeId = orderData.order.storeId;
        this.itemId = orderData.order.itemId;
        this.itemPrice = orderData.order.itemPrice;
        this.orderQty = orderData.order.orderQty;
        this.orderStatus = orderData.order.orderStatus;
        this.orderDate = orderData.order.orderDate;
        this.paymentMethod = orderData.order.paymentMethod;
        this.shipMethod = orderData.order.shipMethod;
       break;
      }
      
    } 

  }

  CompleteOrder(){
    if (this.shippedDateFormControl.hasError('pattern') || this.shipViaFormControl.hasError('pattern') || this.shipTrackingFormControl.hasError('pattern')) {
      this.tempData.setMessage("Please check your inputs and try again!");
      this.dialog.open(MessageComponent);
      return;
    }

    if (!this.shipVia || !this.shippedDate || !this.shipTracking){
      this.tempData.setMessage("Please fill out all the information and resubmit again!");
      this.dialog.open(MessageComponent);
    }else{
      const pipe = new DatePipe('en-US');
      const now = new Date(this.shippedDate);
      const shippedDate: string = pipe.transform(now, 'MM/dd/yyyy') as string;
      let resp = this.service.shiporder(new Order(this.orderId, this.customerId, this.storeId, this.itemId, this.itemPrice, this.orderQty, "Order Shipped", this.orderDate, this.paymentMethod, this.shipMethod, shippedDate,this.shipVia,this.shipTracking));
      resp.subscribe(data=>{
        this.tempData.setResoponseStatus(data);
        this.tempData.setMessage("The item has been successfully shipped!");
        this.tempData.setOrderCheckNotifications(Number(this.tempData.getOrderCheckNotifications()) -1);
        this.dialogRef.closeAll();
        this.dialog.open(MessageComponent);
        // this.tempData.setMessage("Would you like to leave a feedback to the buyer?");
        // this.dialog.open(ConfirmBoxComponent);
        this.router.navigate(['/ordercheck']);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          this.tempData.setMessage("Error: This item cannot be shipped. Please check your inventory!");
          this.dialog.open(MessageComponent);
        }
      })
    }
  }

}
