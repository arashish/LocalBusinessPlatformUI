import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  constructor(private service:ApiService, private router: Router, private tempData: TempdataService, private dialog: MatDialog, private dialogRef: MatDialog, private http: HttpClient) { }

  items!: any;
  itemId: string="";
	itemName: string="";
	description: string="";
	category: string="";
	inventoryQty: string="";
	price: string="";
  itemImage: any="";
  storeId: string="";

  public item!: any;
  public url: any;


    ngOnInit(): void {
        this.items = this.tempData.getItemData(); //Item data will be stored in ItemData tempvariable
        for  (var item of this.items){
          if (this.tempData.getRowNumber() == item.itemId) {
            this.itemId = item.itemId;
            this.itemName = item.itemName;
            this.description = item.description;
            this.category = item.category;
            this.inventoryQty = item.inventoryQty;
            this.price = item.price;
            this.itemImage = item.itemImage;
              if (this.itemImage != null){
                this.url = 'data:image/jpeg;base64,' + this.itemImage;
              }
            this.storeId = item.storeId;
            this.tempData.setRowNumber(0); //reset
            break;
          } 
        } 
  } 

  AddToCart(){
    
  }
}
