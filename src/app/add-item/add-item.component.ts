import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Event, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MessageComponent } from '../message/message.component';
import { ItemWrapper } from '../models/ItemWrapper';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  itemId: string="";
	itemName: string="";
	description: string="";
	category: string="";
	inventoryQty: string="";
	price: string="";
  itemImage: any="";
  storeId: string="";

  user_id: string="";

  item_nameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  descriptionFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  categoryFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  inventoryqtyFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),])
  priceFormControl = new FormControl('',[Validators.required, Validators.pattern("/^-?\d*[.,]?\d{0,2}$/"),])


  constructor(private service:ApiService, private router: Router, private tempData: TempdataService, private dialog: MatDialog, private dialogRef: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
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
  selectedFile!: File;
	
	//selectFile(event) { //Angular 8
	handleFileInput(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'Image not selected!';
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = (_event) => {this.msg = "";this.url = reader.result;}
    this.selectedFile = event.target.files[0];
	}

  AddItem(){
    if (!this.itemName || !this.description || !this.category || !this.inventoryQty || !this.price) {
        this.tempData.setMessage("Please fill out all the information and resubmit again!");
        this.dialog.open(MessageComponent);
    } else {
      this.storeId = this.tempData.getStoreData().store_id; //Id of the store will be used to create an item
      const uploadItemData = new FormData();
      //Image file and Item data are sent together
      uploadItemData.append('imageFile', this.selectedFile, this.selectedFile.name);
      const itemWrapper = new ItemWrapper(this.itemId, this.itemName, this.description, this.category, this.inventoryQty, this.price, this.itemImage, this.storeId);
      uploadItemData.append('itemWrapper', new Blob([JSON.stringify(itemWrapper)],
        {
            type: "application/json"
        }));
      
      this.itemImage = uploadItemData;
      let resp = this.service.addItem(uploadItemData);
      resp.subscribe(data=>{
        this.tempData.setResoponseStatus(data);
        this.tempData.setMessage("The item has been successfully created!");
        this.dialogRef.closeAll();
        this.dialog.open(MessageComponent);
        this.router.navigate(["/home"])
      })
    }
  }



 
}
