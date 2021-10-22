import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { OrderShipComponent } from '../order-ship/order-ship.component';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-order-check',
  templateUrl: './order-check.component.html',
  styleUrls: ['./order-check.component.scss']
})
export class OrderCheckComponent implements OnInit {

  constructor(route:ActivatedRoute, private service: ApiService, private tempdata:TempdataService, public dialog: MatDialog) { }

  orderDatas: any;
  ngOnInit(): void {
    let resp = this.service.checkorder();
    resp.subscribe(data=>{
      console.log(data)
      this.orderDatas = data;
      this.tempdata.setOrderData(this.orderDatas); //Item data will be stored in ItemData tempvariable
    })
  }

  ShipOrder(orderId: number){
    this.tempdata.setOrderId(orderId);
    this.dialog.open(OrderShipComponent);
  }

}
