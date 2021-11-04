import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageWindowComponent } from '../message-window/message-window.component';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-display-store',
  templateUrl: './display-store.component.html',
  styleUrls: ['./display-store.component.scss']
})
export class DisplayStoreComponent implements OnInit {

  constructor(private tempData: TempdataService, private dialog: MatDialog, private dialogRef: MatDialog) { }


  searchDatas: any;
  storeId!: number;
  storeName!: string;
  phone!: string;
  email!: string;

  street!: string;
  city!: string;
  state!: string;
  zipcode!: string;
  country!: string;
  registrationDate!: string;

  ngOnInit(): void {
    this.searchDatas = this.tempData.getSearchData();
    for  (var searchData of this.searchDatas){
        console.log(searchData);
        if (searchData.store.email == this.tempData.getMessageUsername())
          {
            this.storeId = searchData.store.storeId;
            this.storeName = searchData.store.storeName;
            this.phone = searchData.store.phone;
            this.email = searchData.store.email;
            this.street = searchData.store.street;
            this.city = searchData.store.city;
            this.state = searchData.store.state;
            this.zipcode = searchData.store.zipcode;
            this.country = searchData.store.country;
            this.registrationDate = searchData.store.registrationDate;
          }
    }
  }

  messageWindow(storeUsername: string){
    this.tempData.setMessageUsername(storeUsername);
    this.tempData.setRequestFrom("DisplayStore");
    this.dialog.open(MessageWindowComponent);
  }

}
