import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AddItemComponent } from '../add-item/add-item.component';
import { ApiService } from '../api.service';
import { CreateStoreComponent } from '../create-store/create-store.component';
import { LoginComponent } from '../login/login.component';
import { Store } from '../models/store';
import { User } from '../models/User';
import { UserData } from '../models/UserData';
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

const ELEMENT_DATA: ItemFields[]= [
  {itemId:1, name:'Baby Shampoo', description: 'No chemicals no cry', category: 'Shampoo', inventoryQty: 50, price: 17.50}
];

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

  id: string ="";
  firstname: string ="";
  lastname: string ="";
  username: string ="";
  password: string ="";
  usertype: string ="";
  active: string ="";
  registrationdate: string ="";

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
     
     
            this.tempdata.setLoginData(this.user); //login credentials are stored in LoginData tempvariable
            this.tempdata.setStoreData(this.store); //Store data will be stored in StoreData tempvariable
            this.tempdata.setItemData(this.item); //Item data will be stored in ItemData tempvariable
            
            this.dataSource= this.item;
     
            console.log(this.userData);
            this.retrievedImages = this.tempdata.getItemData();
            
            for  (var image of this.retrievedImages){
              this.retrievedImage = image.itemImage;
            }
     
            //let objectURL = 'data:image/jpeg;base64,' + this.retrievedImage;
            //this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            this.retrievedImage = 'data:image/jpeg;base64,' + this.retrievedImage;
           //this.user_id = this.tempData.getloginData().id; //Id of the user will be used to create a store
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

}
