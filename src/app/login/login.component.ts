import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HomeComponent } from '../home/home.component';
import { TempdataService } from '../tempdata.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { DatePipe } from '@angular/common';
import { AboutComponent } from '../footer/about/about.component';
import { ContactUsComponent } from '../footer/contact-us/contact-us.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:string="";
  password:string="";

  errorResponse: boolean=false;
  errorMessage: string="";

  constructor(private service:ApiService, private tempdata:TempdataService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(SignupComponent);
  }

  doLogin(){
    let resp = this.service.login(this.username,this.password);
    resp.subscribe(data=>{
      this.tempdata.setToken(data);
      this.router.navigate(["/home"]);
      }, err => {
      if (err instanceof HttpErrorResponse) {
        //const errorMessages = new Array<{ propName: string; errors: string }>();
        if (err.status === 401) {
          this.errorMessage = ("Error: Invalid username or password!");
          this.errorResponse = true;
          // TODO: extract errors here and match onto the form
        }
      }

    })
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
