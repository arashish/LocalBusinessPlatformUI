import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MessageComponent } from '../message/message.component';
import { Order } from '../models/Order';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private tempdata:TempdataService, private service: ApiService, private router: Router, public dialog: MatDialog) { }

  userData: any;
  cartItems: any;
  subTotal: number =0;
  
  orders: any =[];
 
  ngOnInit(): void {
      this.userData = this.tempdata.getloginData();

      this.cartItems = this.tempdata.getCartItems();


    for (let cartItem of this.cartItems){
      var calcPrice = cartItem.price;
      var calcOrderQty = cartItem.orderQty;
      var calcTotalPrice = calcPrice * calcOrderQty;
      this.subTotal = this.subTotal + calcTotalPrice;

   
      const pipe = new DatePipe('en-US');
      const now = Date.now();
      const orderDate: string = pipe.transform(now, 'MM/dd/yyyy') as string;
      this.orders.push(new Order("", this.tempdata.getloginData().id, cartItem.storeId, cartItem.itemId, cartItem.price, cartItem.orderQty, "Order Submitted", orderDate,"",""));
    
    }

    this.subTotal.toFixed(2);
  }

  placeyourorder(){
    console.log(this.orders);
    let resp = this.service.createorder(this.orders);
    resp.subscribe(data=>{
      this.tempdata.setResoponseStatus(data);
      this.tempdata.setMessage("Your items has been place for order. Please check your order section to get the order status");
      this.dialog.open(MessageComponent);
      this.router.navigate(["/home"])
    })
 
  }

}
