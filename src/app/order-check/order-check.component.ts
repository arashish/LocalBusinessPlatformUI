import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AboutComponent } from '../footer/about/about.component';
import { ContactUsComponent } from '../footer/contact-us/contact-us.component';
import { MessageComponent } from '../message/message.component';
import { Order } from '../models/Order';
import { OrderShipComponent } from '../order-ship/order-ship.component';
import { RatingListComponent } from '../rating-list/rating-list.component';
import { RatingWindowComponent } from '../rating-window/rating-window.component';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-order-check',
  templateUrl: './order-check.component.html',
  styleUrls: ['./order-check.component.scss']
})
export class OrderCheckComponent implements OnInit {

  constructor(route:ActivatedRoute, private router: Router, private service: ApiService, public tempData:TempdataService, public dialog: MatDialog) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {return false;}; //to refresh the redirected page
  }

  orderDatas: any;
  reviews: any;
  totalReviews: number = 0;
  ratingValue: number =0;
  cLoop: boolean = false;

  ngOnInit(): void {
    let resp = this.service.checkorder();
    resp.subscribe(data=>{
      console.log(data)
      this.orderDatas = data;
      this.tempData.setOrderData(this.orderDatas); //Item data will be stored in ItemData tempvariable
    })
  }

  ShipOrder(orderId: number){
    this.tempData.setOrderId(orderId);
    this.dialog.open(OrderShipComponent);
  }

  orderId: string = "";
  customerId :string = "";
  storeId: string = "";
  itemId :string = "";
  itemPrice :string = "";
  orderQty :string = "";
  orderStatus :string = "";
  orderDate :string = "";
  paymentMethod :string = "";
  shipMethod :string = "";

  pickedUpOrder(orderId: number){
    for  (var orderData of this.orderDatas){
      if (orderData.order.orderId === orderId) {
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
        
        let totalCash: number = Number(orderData.order.itemPrice) * Number(orderData.order.orderQty);

        const pipe = new DatePipe('en-US');
        const now = Date.now();
        const PickedUpDate: string = pipe.transform(now, 'MM/dd/yyyy') as string;
        let resp = this.service.shiporder(new Order(this.orderId, this.customerId, this.storeId, this.itemId, this.itemPrice, this.orderQty, "Order Picked Up", this.orderDate, this.paymentMethod, this.shipMethod, PickedUpDate, "", ""));
        resp.subscribe(data=>{
          this.tempData.setResoponseStatus(data);
          this.tempData.setMessage("The order status has been set to 'picked up'! Make sure to collect $" + totalCash.toFixed(2) + " from the buyer.");
          this.tempData.setOrderCheckNotifications(Number(this.tempData.getOrderCheckNotifications()) -1);
          this.dialog.closeAll();
          this.dialog.open(MessageComponent);
          // this.tempData.setMessage("Would you like to leave a feedback to the buyer?");
          // this.dialog.open(ConfirmBoxComponent);
          this.router.navigate(['/ordercheck']);
        }, err => {
          if (err instanceof HttpErrorResponse) {
            this.tempData.setMessage("Error: This order status cannot be changed. Please check your inventory!");
            this.dialog.open(MessageComponent);
          }
        })

      
        break;
      }
    }
  }

  LeaveFeedback(email : string){
    this.tempData.setMessageUsername(email);
    this.dialog.open(RatingWindowComponent);
  }

  roundToHalf(num: number){
    return Math.round(num * 2) /2.0; //rounds the nearest .5
  }

  ratingList(reviews: any){
    this.tempData.setRequestFrom("ordercheck");
    this.tempData.setReviews(reviews);
    this.dialog.open(RatingListComponent, {height: '600px'});
  }
 
  calcTotalReviews(){
    this.totalReviews = this.totalReviews + 1;
  }

  calcTotalRatingValue(ratingValue: number){
    this.ratingValue = this.ratingValue + ratingValue;
  }

  completeLoop(){
    this.cLoop = true;
  }

  ratingValueArray: any =[];
  totalReviewsArray: any =[];

  calcTotal(index: number){
    this.ratingValue = this.roundToHalf(this.ratingValue / this.totalReviews);
    if (Number.isNaN(this.ratingValue)){
      this.ratingValue =0;
    }

    if (Number.isNaN(this.totalReviews)){
      this.totalReviews =0;
    }
    // this.ratingValueArray.push(this.ratingValue);
    // this.totalReviewsArray.push(this.totalReviewsArray);
    this.ratingValueArray[index] = this.ratingValue;
    this.totalReviewsArray[index] = this.totalReviews;

    this.ratingValue = 0; //reset
    this.totalReviews = 0;  //reset
  }

  footerPage(pageName: string){
    console.log(pageName);
    if (pageName=="about"){
      this.dialog.open(AboutComponent, {height: '600px',width: '450px'});
    }else if (pageName=="contactus"){
      this.dialog.open(ContactUsComponent, {height: '350px',width: '650px'});
    }    
  }


}
