import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(route:ActivatedRoute, private service: ApiService , private tempdata:TempdataService, public dialog: MatDialog) { }

  cartItems!: any;
  
  ngOnInit(): void {
    this.cartItems = this.tempdata.getCartItems();
    console.log(this.cartItems);
  }

  Checkout(){
    
  }

  delete(){

  }
}
