import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AddItemComponent } from '../add-item/add-item.component';
import { ApiService } from '../api.service';
import { CreateStoreComponent } from '../create-store/create-store.component';
import { DisplayStoreComponent } from '../display-store/display-store.component';
import { LoginComponent } from '../login/login.component';
import { Store } from '../models/store';
import { User } from '../models/User';
import { UserData } from '../models/UserData';
import { OrderItemComponent } from '../order-item/order-item.component';
import { RatingListComponent } from '../rating-list/rating-list.component';
import { SignupComponent } from '../signup/signup.component';
import { TempdataService } from '../tempdata.service';

export interface ItemFields{
  itemId: number;
  name: string;
  description: string;
  category: string;
  inventoryQty: number;
  price: number;
}

const ELEMENT_DATA: ItemFields[]= [];

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public userData: any;
  public token: string="";

  public user!:any;
  public store!:any;
  public item!: any;
  public messageCenter!: any;

  public items!: any;
  public searchDatas!:any;

  reviews: any;
  totalReviews: number = 0;
  ratingValue: number =0;

  id: string ="";
  firstname: string ="";
  lastname: string ="";
  username: string ="";
  password: string ="";
  usertype: string ="";
  active: string ="";
  registrationdate: string ="";

  categoryName: string="";
  itemName: string="";

  //defining the columns
  displayedColumns: string[] = ['itemId', 'name', 'description', 'category', 'inventoryQty', 'price', 'itemImage', 'storeId'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<ItemFields>();
  
  retrievedImage: any;
  retrievedImages: any;
  

  constructor(route:ActivatedRoute, private service: ApiService ,private loginComponent:LoginComponent, private tempdata:TempdataService, public dialog: MatDialog, private sanitizer:DomSanitizer) { 
    
  }

  ngOnInit(): void {
     this.loadOnstart();
  }

  loadOnstart(){
          let resp = this.service.home();
          resp.subscribe(data=>{
            this.userData = data;
            this.userData = JSON.parse(this.userData);
     
            this.user = this.userData.user;
            this.store = this.userData.store;
            this.item = this.userData.item;
            this.messageCenter = this.userData.messageCenter;
     
            this.tempdata.setLoginData(this.user); //login credentials are stored in LoginData tempvariable
            this.tempdata.setStoreData(this.store); //Store data will be stored in StoreData tempvariable
            this.tempdata.setItemData(this.item); //Item data will be stored in ItemData tempvariable
            this.tempdata.setMessageCenterData(this.messageCenter);
            
            this.dataSource= this.item;
     
            console.log(this.userData);
            this.retrievedImages = this.tempdata.getItemData();
            for  (var image of this.retrievedImages){
              this.retrievedImage = image.itemImage;
            }
            this.retrievedImage = 'data:image/jpeg;base64,' + this.retrievedImage;

            this.reviews = this.userData.review;
            for (var review of this.reviews)
              {
                this.ratingValue = Number(review.ratingValue) + this.ratingValue;
                this.totalReviews = this.totalReviews + 1;
              }
            
              this.ratingValue = this.roundToHalf(this.ratingValue / this.reviews.length);
            
            if (Number.isNaN(this.ratingValue))
            {
              this.ratingValue =0;
            }
            console.log(this.ratingValue);
          })
  }


  createStore(){
    this.dialog.open(CreateStoreComponent);
  }

  addItem(){
    this.dialog.open(AddItemComponent);
  }

  displayCell(numb : number){
    this.tempdata.setRowNumber(numb);
    this.dialog.open(AddItemComponent);
  }

  editStore(){
    this.dialog.open(CreateStoreComponent);
  }

  displayStore(storeUsername: string){
    this.tempdata.setMessageUsername(storeUsername);
    this.dialog.open(DisplayStoreComponent);
  }

  itemIsSearched: boolean = false;
  isWait: boolean = false;
  searchItem(){
    if (!this.categoryName){
      this.categoryName = "All Category";
    }
    this.isWait = true;
    let resp = this.service.searchItem(this.itemName,this.categoryName );
    resp.subscribe(data=>{
    this.searchDatas = data;
    this.tempdata.setSearchData(this.searchDatas); //Item data will be stored in ItemData tempvariable
    console.log(this.tempdata.getSearchData());
    this.retrievedImages = this.tempdata.getItemData();
    this.itemIsSearched = true;
    this.isWait = false;
    })
  }

  orderQty!: any;
  createRange(getNumber: number){
    var qty: number[] = [];
    for(var i = 1; i <= getNumber; i++){
       qty.push(i);
     }
     return qty;
  }

  orderItem(numb : number){
    console.log(numb);
    this.tempdata.setRowNumber(numb);
    this.dialog.open(OrderItemComponent);
  }

  ratingList(){
    this.tempdata.setReviews(this.reviews);
    if (this.totalReviews != 0) {
      this.dialog.open(RatingListComponent, {height: '600px'});
    }
  }

  roundToHalf(num: number){
    return Math.round(num * 2) /2.0; //rounds the nearest .5
  }
}
