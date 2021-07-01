import { Component, OnInit } from '@angular/core';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public message: string = "";
  constructor(private tempdata: TempdataService) { }

  ngOnInit(): void {
    this.message = this.tempdata.getMessage();

  }

}
