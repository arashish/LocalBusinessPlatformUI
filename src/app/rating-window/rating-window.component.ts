import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-rating-window',
  templateUrl: './rating-window.component.html',
  styleUrls: ['./rating-window.component.scss']
})
export class RatingWindowComponent implements OnInit {

  constructor(private tempData: TempdataService, private router: Router, private service: ApiService, private dialog: MatDialog) { }

  recipientUsernameFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),])

  recipientUsername!: string;
  comment!: string;
  currentRate!: number;
  name!: string;
  orderDatas: any;
  senderUsername!: string;

  ngOnInit(): void {
    this.orderDatas = this.tempData.getOrderData();
    this.senderUsername = this.tempData.getloginData().username;
    console.log(this.tempData.getOrderData());
    for  (var orderData of this.orderDatas){
      console.log(orderData.store.email);
      console.log(this.tempData.getMessageUsername());

        if (orderData.store.email == this.tempData.getMessageUsername())
          {
            this.name = orderData.store.storeName;
            this.recipientUsername = orderData.store.email;
          }
    }
  }


  SendRating(){
    console.log(this.senderUsername);
    console.log(this.recipientUsername);
    console.log(this.currentRate);
    console.log(this.comment);
  }

}
