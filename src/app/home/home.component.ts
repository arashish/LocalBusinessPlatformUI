import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public userData: any;

  constructor(private service: ApiService ,private loginComponent:LoginComponent, private tempdata:TempdataService) { }

  ngOnInit(): void {
       this.userData = this.tempdata.getloginData();
  }

  getUser(){

  }



}
