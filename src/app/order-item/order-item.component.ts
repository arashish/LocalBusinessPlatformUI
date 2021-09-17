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
  public searchDatas: any;
  public url: any;


    ngOnInit(): void {
        this.searchDatas = this.tempData.getSearchData(); //Item data will be stored in ItemData tempvariable
        console.log(this.searchDatas);
        for  (var searchData of this.searchDatas){
          if (this.tempData.getRowNumber() == searchData.item.itemId) {
            this.itemId = searchData.item.itemId;
            this.itemName = searchData.item.itemName;
            this.description = searchData.item.description;
            this.category = searchData.item.category;
            this.inventoryQty = searchData.item.inventoryQty;
            this.price = searchData.item.price;
            this.itemImage = searchData.item.itemImage;
              if (this.itemImage != null){
                this.url = 'data:image/jpeg;base64,' + this.itemImage;
              }
            this.storeId = searchData.item.storeId;
            this.tempData.setRowNumber(0); //reset
            break;
          } 
        } 
  } 

  AddToCart(){
    
  }
}
