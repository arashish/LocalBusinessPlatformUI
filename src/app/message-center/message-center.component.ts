import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.scss']
})
export class MessageCenterComponent implements OnInit {

  constructor(private service:ApiService, private tempdata:TempdataService, private router: Router, private dialog: MatDialog) { }

  user: any;

  ngOnInit(): void {
    this.user = this.tempdata.getloginData();
  }

  inbox(){
    console.log("clicked inbox");
  }

  sent(){
    console.log("clicked sent");
  }

  deleted(){
    console.log("clicked deleted");
  }

}
