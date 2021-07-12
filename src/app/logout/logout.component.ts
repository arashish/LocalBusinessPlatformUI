import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private service:ApiService, private tempdata:TempdataService, private router: Router) { }

  ngOnInit(): void {
    this.tempdata.setToken(null);
    this.router.navigate(["/"]);
  }

}
