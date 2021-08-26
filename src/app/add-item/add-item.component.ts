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

  items!: any;

  isUpdateButtonVisible!: boolean;
  isDeleteButtonVisible!: boolean;
  isSaveButtonVisible!: boolean;

  item_nameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  descriptionFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  categoryFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  inventoryqtyFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),])
  priceFormControl = new FormControl('',[Validators.required, Validators.pattern("/^-?\d*[.,]?\d{0,2}$/"),])


  constructor(private service:ApiService, private router: Router, private tempData: TempdataService, private dialog: MatDialog, private dialogRef: MatDialog, private http: HttpClient) 
    {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {return false;}; //to refresh the redirected page
    }

  ngOnInit(): void {
      //preloads the data if the item already exists
      if (this.tempData.getItemData().length != 0){
        this.items = this.tempData.getItemData();
        for  (var item of this.items){
          if (this.tempData.getRowNumber() == item.itemId) {
            this.itemId = item.itemId;
            this.itemName = item.itemName;
            this.description = item.description;
            this.category = item.category;
            this.inventoryQty = item.inventoryQty;
            this.price = item.price;
            this.itemImage = item.itemImage;
              if (this.itemImage != null){
                this.selectedFile = new File([this.dataURItoBlob(this.itemImage)], "NotAvailable.Jpg", { type: 'image/jpeg' }); //new Blob([this.itemImage], { type: 'application/image' });
                this.url = 'data:image/jpeg;base64,' + this.itemImage;
              }
            this.storeId = item.storeId;
            this.isUpdateButtonVisible = true;
            this.isDeleteButtonVisible = true;
            this.isSaveButtonVisible = false;
            this.tempData.setRowNumber(0); //reset
            break;
          } else {
            this.isUpdateButtonVisible = false;
            this.isDeleteButtonVisible = false;
            this.isSaveButtonVisible = true;
          }
        } 
      } else {
        this.isUpdateButtonVisible = false;
        this.isDeleteButtonVisible = false;
        this.isSaveButtonVisible = true;
      }
  }

  fileToUpload: any | null = null;

  isCreateStore!: boolean;
 
	url: any; 
	msg = "";
  selectedFile!: File;
	
	handleFileInput(event: any) {
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
      this.storeId = this.tempData.getStoreData().storeId; //Id of the store will be used to create an item
      const uploadItemData = new FormData();
      //Image file and Item data are sent together
       uploadItemData.append('imageFile', this.selectedFile, this.selectedFile.name);
      //uploadItemData.append('imageFile', new Blob([this.selectedFile],{type: "application/image"}));
      
      const itemWrapper = new ItemWrapper(this.itemId, this.itemName, this.description, this.category, this.inventoryQty, this.price, this.itemImage, this.storeId);
      uploadItemData.append('itemWrapper', new Blob([JSON.stringify(itemWrapper)],
        {
            type: "application/json"
        }));
      
      this.itemImage = uploadItemData;
      let resp = this.service.addItem(uploadItemData);
      resp.subscribe(data=>{
        this.tempData.setResoponseStatus(data);
        this.tempData.setMessage("The item has been successfully saved!");
        this.dialogRef.closeAll();
        this.dialog.open(MessageComponent);
        this.router.navigate(['/home']);
      })
    }
  }

  DeleteItem(){
    if (this.itemId != null){
      console.log(this.itemId);
      let resp = this.service.deleteItem(this.itemId);
      resp.subscribe(data=>{
        this.tempData.setResoponseStatus(data);
        this.tempData.setMessage("The item has been successfully deleted!");
        this.dialogRef.closeAll();
        this.dialog.open(MessageComponent);
        this.router.navigate(['/home']);
      })
    }
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }



 
}
