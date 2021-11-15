import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginComponent } from '../login/login.component';
import { MessageComponent } from '../message/message.component';
import { Review } from '../models/Review';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-rating-window',
  templateUrl: './rating-window.component.html',
  styleUrls: ['./rating-window.component.scss']
})
export class RatingWindowComponent implements OnInit {

  constructor(private tempData: TempdataService, private router: Router, private service: ApiService, private dialog: MatDialog,  private dialogRef: MatDialogRef<LoginComponent>) { 

  }

  recipientUsernameFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),])

  revieweeUsername!: string;
  comment!: string;
  ratingValue!: string;
  revieweeName!: string;
  orderDatas: any;
  reviewerUsername!: string;
  reviewDate !: string;

  disableButton !: boolean;

  ngOnInit(): void {
    this.orderDatas = this.tempData.getOrderData();
    this.reviewerUsername = this.tempData.getloginData().username;
    console.log(this.tempData.getOrderData());
    for  (var orderData of this.orderDatas){
      console.log(orderData.customer.username);
      console.log(this.tempData.getMessageUsername);

        if (orderData.store.email == this.tempData.getMessageUsername()){ //when a buyer is reviewing the seller
            this.revieweeName = orderData.store.storeName;
            this.revieweeUsername = orderData.store.email;
        } else if (orderData.customer.username == this.tempData.getMessageUsername()) { // when a seller is reviewing the buyer
            this.revieweeName = orderData.customer.firstname + " " + orderData.customer.lastname;
            this.revieweeUsername = orderData.customer.username;
        }
    }
  }

  enableSubmitButton(){
    this.disableButton = true;
  }


  SendRating(){
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    this.reviewDate = pipe.transform(now, 'MM/dd/yyyy') as string;
    let resp = this.service.createreview(new Review("",this.reviewerUsername, this.revieweeUsername,this.comment, this.ratingValue, this.reviewDate));
    resp.subscribe(data=>{
      this.tempData.setResoponseStatus(data);
      this.tempData.setMessage("Thank you for your feedback!");
      this.dialogRef.close();
      this.dialog.open(MessageComponent);
      if (this.tempData.getRequestFrom() == "ordercheck"){
        this.router.navigate(['/ordercheck']);
      }
      //this.router.navigate(['/orderstatus']);
    })

  }

}
