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
  public token: string="";

  id: string ="";
  firstname: string ="";
  lastname: string ="";
  username: string ="";
  password: string ="";
  usertype: string ="";
  active: string ="";
  registrationdate: string ="";

  constructor(private service: ApiService ,private loginComponent:LoginComponent, private tempdata:TempdataService) { 
  }

  ngOnInit(): void {
      //this.userData = this.tempdata.getloginData();             
      console.log(this.tempdata.getToken());
      this.token = this.tempdata.getToken();
      let resp = this.service.home(this.token);
      resp.subscribe(data=>{
        this.userData = data;
        this.userData = JSON.parse(this.userData);
        this.tempdata.setLoginData(this.userData);
        // this.id = this.userData.id;
        // this.firstname = this.userData.firstname;
        // this.lastname = this.userData.lastname;
        // this.username = this.userData.username;
        // this.password = this.userData.password;
        // this.usertype = this.userData.usertype;
        // this.active = this.userData.active;
        // this.registrationdate = this.userData.registrationdate;

        console.log(this.firstname);

      })
  }


  createStore(){

  }





}
