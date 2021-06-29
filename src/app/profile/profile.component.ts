import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/user';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id: string ="";
  firstname: string ="";
  lastname: string ="";
  username: string ="";
  password: string ="";
  usertype: string ="";
  active: string ="";
  registrationdate: string ="";

  loginData: any;

  constructor(private service:ApiService, private tempdata:TempdataService, private router: Router) { }

  ngOnInit(): void {
    this.loginData = this.tempdata.getloginData();
    this.id = this.loginData.id;
    this.firstname = this.loginData.firstname;
    this.lastname = this.loginData.lastname;
    this.username = this.loginData.username;
    this.password = this.loginData.password;
    this.usertype = this.loginData.usertype;
    this.active = this.loginData.active;
    this.registrationdate = this.loginData.registrationdate;

    console.log(this.tempdata.getloginData());
    console.log(this.firstname);
  }

  Update(){
    let resp = this.service.updateProfile(this.tempdata.getToken(), new User(this.id,this.firstname, this.lastname, this.username, this.password, this.usertype, this.active, this.registrationdate));
    resp.subscribe(data=>{
      this.tempdata.setResoponseStatus(data);
      //alert(data);
      //this.router.navigate(["/login"])
    })
  }


}
