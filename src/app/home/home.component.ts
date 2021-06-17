import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name: any;

  constructor(private service: ApiService ,private loginComponent:LoginComponent) { }

  ngOnInit(): void {
    let resp = this.service.getInfo();
    resp.subscribe(data=>{
      this.name = data;
    })
  }

  getUser(){
    this.name = this.loginComponent.message;
    console.log(this.name);
  }



}
