import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Event, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MessageComponent } from '../message/message.component';
import { Item } from '../models/Item';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  item_id: string="";
	item_name: string="";
	description: string="";
	category: string="";
	inventoryqty: string="";
	price: string="";

  user_id: string="";

  item_nameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  descriptionFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  categoryFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  inventoryqtyFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),])
  priceFormControl = new FormControl('',[Validators.required, Validators.pattern("/^-?\d*[.,]?\d{0,2}$/"),])


  constructor(private service:ApiService, private router: Router, private tempData: TempdataService, private dialog: MatDialog, private dialogRef: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
  }

  AddItem(){
    if (!this.item_name || !this.description || !this.category || !this.inventoryqty || !this.price) {
        this.tempData.setMessage("Please fill out all the information and resubmit again!");
        this.dialog.open(MessageComponent);
    } else {
      this.user_id = this.tempData.getloginData().id; //Id of the user will be used to create a store
      console.log(this.user_id);  
      let resp = this.service.addItem(new Item(this.item_id, this.item_name, this.description, this.category, this.inventoryqty, this.price));
      resp.subscribe(data=>{
        this.tempData.setResoponseStatus(data);
        this.tempData.setMessage("The store has been successfully created!");
        this.dialogRef.closeAll();
        this.dialog.open(MessageComponent);
        this.router.navigate(["/home"])
      })
    }
  }

  fileToUpload: any | null = null;

  // handleFileInput(files: FileList) {
  //   console.log("Test");
  //   console.log(files);
  //   this.fileToUpload = files.item(0);
 
  // }
 
  //url; //Angular 8
	url: any; //Angular 11, for stricter type
	msg = "";
	
	//selectFile(event) { //Angular 8
	handleFileInput(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'Image not selected!';
			return;
		}
		
		var reader = new FileReader();

		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}



 
}
