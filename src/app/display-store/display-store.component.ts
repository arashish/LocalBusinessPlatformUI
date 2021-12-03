import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageWindowComponent } from '../message-window/message-window.component';
import { RatingListComponent } from '../rating-list/rating-list.component';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-display-store',
  templateUrl: './display-store.component.html',
  styleUrls: ['./display-store.component.scss']
})
export class DisplayStoreComponent implements OnInit {

  constructor(private tempData: TempdataService, private dialog: MatDialog, private dialogRef: MatDialog) { }


  searchDatas: any;
  orderDatas: any;
  storeId!: number;
  storeName!: string;
  phone!: string;
  email!: string;

  street!: string;
  city!: string;
  state!: string;
  zipcode!: string;
  country!: string;
  registrationDate!: string;

  reviews: any;
  totalReviews: number = 0;
  ratingValue: number =0;

  ngOnInit(): void {
    this.reviews = "";
    this.totalReviews = 0;
    this.ratingValue = 0;

    if (this.tempData.getRequestFrom() == "search") {
      this.searchDatas = this.tempData.getSearchData();
      for  (var searchData of this.searchDatas){
          if (searchData.store.email == this.tempData.getMessageUsername())
            {
              this.storeId = searchData.store.storeId;
              this.storeName = searchData.store.storeName;
              this.phone = searchData.store.phone;
              this.email = searchData.store.email;
              this.street = searchData.store.street;
              this.city = searchData.store.city;
              this.state = searchData.store.state;
              this.zipcode = searchData.store.zipcode;
              this.country = searchData.store.country;
              this.registrationDate = searchData.store.registrationDate;
  
              this.reviews = searchData.review;
              for (var review of this.reviews)
                {
                  this.ratingValue = Number(review.ratingValue) + this.ratingValue;
                  this.totalReviews = this.totalReviews + 1;
                }
              this.ratingValue = this.roundToHalf(this.ratingValue / this.reviews.length);
            break;
            }
      }
      if (Number.isNaN(this.ratingValue)){
        this.ratingValue =0;
      }

    } else if (this.tempData.getRequestFrom() == "order") {
      this.orderDatas = this.tempData.getOrderData();
      for  (var orderData of this.orderDatas){
          if (orderData.store.email == this.tempData.getMessageUsername())
            {
              this.storeId = orderData.store.storeId;
              this.storeName = orderData.store.storeName;
              this.phone = orderData.store.phone;
              this.email = orderData.store.email;
              this.street = orderData.store.street;
              this.city = orderData.store.city;
              this.state = orderData.store.state;
              this.zipcode = orderData.store.zipcode;
              this.country = orderData.store.country;
              this.registrationDate = orderData.store.registrationDate;
  
              this.reviews = orderData.review;
              for (var review of this.reviews)
                {
                  this.ratingValue = Number(review.ratingValue) + this.ratingValue;
                  this.totalReviews = this.totalReviews + 1;
                }
              this.ratingValue = this.roundToHalf(this.ratingValue / this.reviews.length);
            break;
            }
      }
      if (Number.isNaN(this.ratingValue)){
        this.ratingValue =0;
      }
    }
  }

  messageWindow(storeUsername: string){
    this.tempData.setMessageUsername(storeUsername);
    this.tempData.setRequestFrom("DisplayStore");
    this.dialog.open(MessageWindowComponent);
  }

  roundToHalf(num: number){
    return Math.round(num * 2) /2.0; //rounds the nearest .5
  }

  ratingList(){
    if (this.totalReviews != 0) {
      this.tempData.setReviews(this.reviews);
      this.dialog.open(RatingListComponent, {height: '600px'});
    }
  }

}
