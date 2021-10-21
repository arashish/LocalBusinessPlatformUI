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





  shippedDateFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  shipViaFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  shipTrackingFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])



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
    // const pipe = new DatePipe('en-US');
    // const now = Date.now();
    // const orderDate: string = pipe.transform(now, 'MM/dd/yyyy') as string;

    let resp = this.service.shiporder(new Order(this.orderId, this.customerId, this.storeId, this.itemId, this.itemPrice, this.orderQty, "Order Shipped", this.orderDate, this.paymentMethod, this.shipMethod, this.shippedDate,this.shipVia,this.shipTracking));
    resp.subscribe(data=>{
      this.tempData.setResoponseStatus(data);
      this.tempData.setMessage("The item has been successfully shipped!");
      this.dialogRef.closeAll();
      this.dialog.open(MessageComponent);
      this.router.navigate(['/ordercheck']);
    })


  }

}
