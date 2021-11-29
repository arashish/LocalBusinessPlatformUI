import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DisplayStoreComponent } from '../display-store/display-store.component';
import { AboutComponent } from '../footer/about/about.component';
import { ContactUsComponent } from '../footer/contact-us/contact-us.component';
import { RatingWindowComponent } from '../rating-window/rating-window.component';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  constructor(private router: Router, private service: ApiService, public tempData:TempdataService, public dialog: MatDialog) { }

  order!: string;
  orderDatas: any;

  ngOnInit(): void {
    this.orderDatas = this.tempData.getOrderData();
    
    let resp = this.service.orderstatus();
    resp.subscribe(data=>{
      console.log(data)
      this.orderDatas = data;
      this.tempData.setOrderData(this.orderDatas);
      //this.tempData.setOrderData(this.orderDatas); //Item data will be stored in ItemData tempvariable
    })
  }

  LeaveFeedback(email : string){
    this.tempData.setMessageUsername(email);
    this.tempData.setRequestFrom("orderstatus");
    this.dialog.open(RatingWindowComponent);
  }

  displayStore(storeUsername: string){
    this.tempData.setMessageUsername(storeUsername);
    this.tempData.setRequestFrom("order");
    this.dialog.open(DisplayStoreComponent);
  }

  launchGoogle(link: string){
    window.open(link, "_blank");
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
