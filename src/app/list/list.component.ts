import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  brews: any;

  constructor(private _http: ApiService) { }

  ngOnInit(): void {
    this._http.myMethod().subscribe(data => {
      this.brews = data;
      console.log(this.brews);
    });
  }

}
