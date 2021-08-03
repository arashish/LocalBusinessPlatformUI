import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
  item_id: number;
  name: string;
  description: string;
  category: string;
  inventoryqty: number;
  price: number;
}

const ELEMENT_DATA: ItemFields[]= [
  {item_id:1, name:'Baby Shampoo', description: 'No chemicals no cry', category: 'Shampoo', inventoryqty: 50, price: 17.50}
];

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
  displayedColumns: string[] = ['item_id', 'name', 'description', 'category', 'inventoryqty', 'price'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<ItemFields>();

  constructor(private service: ApiService ,private loginComponent:LoginComponent, private tempdata:TempdataService, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
      //this.userData = this.tempdata.getloginData();             
      let resp = this.service.home();
      resp.subscribe(data=>{
        this.userData = data;
        this.userData = JSON.parse(this.userData);

        this.user = this.userData.user;
        this.store = this.userData.store;

        this.tempdata.setLoginData(this.user); //login credentials are stored in LoginData tempvariable
        this.tempdata.setStoreData(this.store); //Store data will be stored in StoreData tempvariable
        
        console.log(this.dataSource);
        // this.id = this.userData.id;
        // this.firstname = this.userData.firstname;
        // this.lastname = this.userData.lastname;
        // this.username = this.userData.username;
        // this.password = this.userData.password;
        // this.usertype = this.userData.usertype;
        // this.active = this.userData.active;
        // this.registrationdate = this.userData.registrationdate;
      })
  }


  createStore(){
    this.dialog.open(CreateStoreComponent);
  }

  addItem(){
    this.dialog.open(AddItemComponent);
  }





}
