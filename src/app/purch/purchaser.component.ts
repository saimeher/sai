import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormControl } from '@angular/forms';
import { ModalComponent } from '../modal.component';
import { FormGroup, FormArray, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-purchaser',
  templateUrl: './purchaser.component.html',
  styleUrls: ['./purchaser.component.css']
})
export class PurchaserComponent implements OnInit {
  purchase_form: FormGroup;
 

  stock_balance;
  error = false;
  errorMessage = '';
  rem_length;
  data;
  dat;
  dat3;
  insert = {};
  item;
  value1;
  array;
  check_list = [];
  @ViewChild('popup1') popup1: Popup;
  // public data;
  public filterQuery = "";
  public filterQuery1 = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";


  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    public fb: FormBuilder,
    toasterService: ToasterService,
  public popup : Popup) {
    
    this.stockBalance();
  }

  //  a: any;
  //  events={};
  ngOnInit() {
    this.purchase_form = this.fb.group({
      item:['',Validators.required],
      quantity:['',Validators.required],
      // items: this.fb.array([]),
    });
    this.stockBalance();
  }

  stockBalance() {
    this._apiService.stockBalance().subscribe(stockbalance => {
      if (stockbalance) {

        this.stock_balance = stockbalance.data.data;
        console.log(this.stock_balance);
      }
    })
  }
  check = false;
  checkedValues(item) {
    this.check_list;
    this.check_list.push(item);

    console.log(this.check_list);
    if (!this.check) {
      console.log(item);
    }
    if (this.check) {
      console.log('uncheckde');
    }
  }

  selectedItems = [];
  clickedItem(val, event) {
    if (event) {
      this.selectedItems.push(val);
      // this.purchase_form.valueChanges.subscribe(()=>{
      //   this.purchase_form.markAsDirty();
      // }
     
      // )
      console.log(this.selectedItems);
    } else {
      var index = this.selectedItems.indexOf(val);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      }
    }

  }
  purchasepop(){
  
    this.popup.options = {
      header: "Success!",
      color: "#34495e", // red, blue.... 
      widthProsentage: 50, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: false, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "ok", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "btn btn-info", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "bounceInDown",// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
  };
  this.popup1.show();
    // this.purchase_form.patchValue({

    // })
  }
  ok() {
    console.log('hello');
    this.popup1.hide();
 }
 quantity:'';
 purchasersubmit()
 { 
   
  console.log();
   console.log(this.purchase_form.value);
   this._apiService.purchaserlist(this.purchase_form.value).subscribe(dat=>
    {
      this.dat=dat;
    })
 }
}
