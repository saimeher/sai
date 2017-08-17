import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormControl } from '@angular/forms';
import { ModalComponent } from '../modal.component';
import { FormGroup, FormArray, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';


@Component({
  selector: 'app-messincharge',
  templateUrl: './messincharge.component.html',
  styleUrls: ['./messincharge.component.css']
})
export class MessinchargeComponent implements OnInit {
  objectKeys = Object.keys;

  itemaddForm: FormGroup;
  itemoutForm: FormGroup;
  addmore_length;
  insert_date;
  out_date;
  data1;
  mid;
  data2;
  stock_data;
  stock_balance;
  error = false;
  errorMessage = '';
  rem_length;
  data;
  insert = {};
  item;
  @ViewChild('modal1') modal1: ModalComponent;
  // public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    public fb: FormBuilder, ) {

  };

  slots: Array<any> = [

    { name: 'Breakfast' },
    { name: 'Lunch' },
    { name: 'Snacks' },
    { name: 'Dinner' },
  ];
  units: Array<any> = [
    
        { u: 'kgs' },
        { u: 'litres'},
        { u: 'packets'},
        { u: 'gms'},
      ];

  ngOnInit() {
    this.itemaddForm = this.fb.group({
      insert_date: ['', Validators.required],
      activeList: this.fb.array([]),
    });
    this.itemoutForm = this.fb.group({
      out_date: ['', Validators.required],
      slot: ['', Validators.required],
      activeList1: this.fb.array([]),
    });
    this.addactiveList1();
    this.getlists();
    this.addactiveList();

    this.stockRegister();
    this.stockBalance();
  }
  addactiveList() {

    const control = <FormArray>this.itemaddForm.controls['activeList'];
    const addrCtrl = this.initLink();
    control.push(addrCtrl);

    console.log(control.length);
    this.addmore_length = (control.length);

  }

  removeList(i: any) {
    console.log(i);
    // this.addmore_length=i;
    const control = <FormArray>this.itemaddForm.controls['activeList'];
    this.rem_length = ((<FormArray>this.itemaddForm.controls['activeList']).length);
    console.log(this.rem_length);

    //const addrCtrl = this.initLink();
    control.removeAt(i);
    this.addmore_length = this.rem_length - 1;
    console.log(this.addmore_length);
  }

  initLink() {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      units:['',Validators.required],
      price: ['', Validators.required]

    });
  }

  itemaddform() {
    // this.insert['insert_date'] = this.insert_date;
    this.insert['type'] = "IN";
    this.insert['reg_no'] = localStorage.getItem('reg_no');
    // this.mid['mid'] = it.mid;
    const p = Object.assign({}, this.insert, this.itemaddForm.value);
    console.log(p);

    console.log(this.itemaddForm.value);
    this._apiService.insertlist(p).subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.itemaddForm.reset();
      this.stockBalance();
      this.stockRegister();
    })
  }

  addactiveList1() {

    const control = <FormArray>this.itemoutForm.controls['activeList1'];
    const addrCtrl = this.initLink1();
    control.push(addrCtrl);

    console.log(control.length);
  }

  removeList1(i: any) {
    const control = <FormArray>this.itemoutForm.controls['activeList1'];
    this.rem_length = ((<FormArray>this.itemoutForm.controls['activeList1']).length);
    console.log(this.rem_length);

    control.removeAt((<FormArray>this.itemoutForm.controls['activeList1']).length - 1);
    this.addmore_length = this.rem_length - 1;
    console.log(this.addmore_length);
  }
  initLink1() {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      units: ['',Validators.required]
    });
  }

  itemoutform() {
    this.insert['type'] = "Out"
    this.insert['reg_no'] = localStorage.getItem('reg_no');
    console.log(this.itemoutForm.value, this.insert)
    const p = Object.assign({}, this.insert, this.itemoutForm.value);
    console.log(p);

    this._apiService.itemoutlist(p).subscribe(data => {
      this.data = data;
      this.itemoutForm.reset();
      this.stockBalance();
      this.stockRegister();
    });
  }


  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mmm-dd',
    editableDateField: false,
    disableWeekends: false,
  };

  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mmm-dd',
    editableDateField: false,
    disableWeekends: false,
    disableUntil: { year: 0, month: 0, day: 0 }
  };
  picker1day;
  picker1month;
  picker1year;

  onDateChanged(event: IMyDateModel) {
   
    this.insert_date = event.formatted;
    this.myDatePickerOptions2.disableUntil.year = event.date.year
    this.myDatePickerOptions2.disableUntil.month = event.date.month
    this.myDatePickerOptions2.disableUntil.day = event.date.day - 1
  }
  onDateChanged2(event: IMyDateModel) {
    console.log(this.out_date, 'from date test');
    this.out_date = event.formatted
  }

  stockRegister() {
    this._apiService.stockRegister().subscribe(stockdata => {
      if (stockdata) {


        this.stock_data = stockdata.data.data;
        console.log(this.stock_data);
      }
    })
  }


  stockBalance() {
    this._apiService.stockBalance().subscribe(stockbalance => {
      if (stockbalance) {

        this.stock_balance = stockbalance.data.data;
        console.log(this.stock_balance);
      }
    })
  }

  addnewitem() {
    this.modal1.show();
  }
  submit() {
    console.log(this.item)
    let value = {
      'item': this.item
    };
    this._apiService.addnewitem(value).subscribe(data2 => {
      this.data2 = data2;
      this.getlists();
    })
    this.modal1.hide();
  }
  close() {
    this.modal1.hide();
  }
  getlists() {
    this._apiService.getlist().subscribe(data1 => {
      this.data1 = data1.data;
      console.log(this.data1);
    })
  }

}
