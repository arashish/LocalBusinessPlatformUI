import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:string="";
  password:string="";
  message:any;

  constructor(private service:ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  doLogin(){
    let resp = this.service.login(this.username,this.password);
    resp.subscribe(data=>{
      this.message = data;
      this.router.navigate(["/home"])
    })
  }

}
