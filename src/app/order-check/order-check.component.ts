import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CalculateReviews } from '../models/calculateReviews';
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

  constructor(route:ActivatedRoute, private router: Router, private service: ApiService, private tempData:TempdataService, public dialog: MatDialog) { 
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



}
