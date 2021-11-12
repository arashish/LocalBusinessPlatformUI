import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss']
})
export class RatingListComponent implements OnInit {

  constructor(private tempData: TempdataService, private dialog: MatDialog, private dialogRef: MatDialog) { }

  searchDatas: any;
  reviews: any;

  reviewerUsername!: string;
  comment!: string;
  ratingValue!: string;
  reviewDate!: string;


  ngOnInit(): void {
    this.searchDatas = this.tempData.getSearchData();
    for  (var searchData of this.searchDatas){
        if (searchData.store.email == this.tempData.getMessageUsername())
          {
            this.reviews = searchData.review;
               break;
          }
    }
  }

}
