import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  id: string ="";
  firstname: string ="";
  lastname: string ="";
  username: string ="";
  password: string ="";
  usertype: string ="";
  active: string ="";
  registrationdate: string ="";

  constructor(private service:ApiService, private router: Router, private tempData: TempdataService) { }

  ngOnInit(): void {
  }

  SignUp(){
    let resp = this.service.signup(new User(this.id,this.firstname, this.lastname, this.username, this.password, this.usertype, this.active, this.registrationdate));
    resp.subscribe(data=>{
      this.tempData.setResoponseStatus(data);
      alert(data);
      this.router.navigate(["/login"])
    })
  }

}
