import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CheckoutComponent } from '../checkout/checkout.component';
import { AboutComponent } from '../footer/about/about.component';
import { ContactUsComponent } from '../footer/contact-us/contact-us.component';
import { MessageComponent } from '../message/message.component';
import { Cart} from '../models/Cart';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(route:ActivatedRoute, private router: Router, private service: ApiService , public tempdata:TempdataService, public dialog: MatDialog) 
  { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {return false;}; //to refresh the redirected page
  }

  cartItems!: any;
  subTotalItems: number = 0;
  subTotal: number = 0;
  
  ngOnInit(): void {
    this.cartItems = this.tempdata.getCartItems();

    for (let cartItem of this.cartItems){
      var calcPrice = cartItem.price;
      var calcOrderQty = cartItem.orderQty;
      var calcTotalPrice = calcPrice * calcOrderQty;
      this.subTotal = this.subTotal + calcTotalPrice;
      this.subTotalItems = this.subTotalItems + calcOrderQty;
    }
  }

  checkout(){
    this.dialog.open(CheckoutComponent);
  }

  newCartItems: any = [ ];

  delete(itemId: number){
    console.log(itemId);
    this.cartItems = this.tempdata.getCartItems();

    for (let cartItem of this.cartItems){
      if (cartItem.itemId != itemId){
        this.newCartItems.push(new Cart(cartItem.itemId, cartItem.itemName, cartItem.itemImage, cartItem.description, cartItem.category, cartItem.orderQty, cartItem.price, cartItem.storeId, cartItem.storeName));
      }
    }
    this.tempdata.setCartItems(this.newCartItems);

    this.tempdata.setMessage("The item has been successfully deleted!");
    this.dialog.open(MessageComponent);
    this.router.navigate(['/cart']);

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
