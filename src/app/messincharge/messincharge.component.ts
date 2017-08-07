import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import {  FormControl } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';


@Component({
  selector: 'app-messincharge',
  templateUrl: './messincharge.component.html',
  styleUrls: ['./messincharge.component.css']
})
export class MessinchargeComponent implements OnInit {
    itemaddForm: FormGroup;
     addmore_length;
     insert_date;
    error = false;
    errorMessage = '';

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    public fb: FormBuilder,) { };
    users: Array<any> = [

        { username: 'Potato' },
        {
            username: 'rava' 
        },
        { username: 'onions' },
    ];
slots: Array<any> = [

        { name: 'Breakfast' },
        { name: 'Lunch'  },
        { name: 'Snacks' },
        { name :'Dinner'},
    ];

  ngOnInit() {
    this.itemaddForm = this.fb.group({
      insert_date:['',Validators.required],
       activeList: this.fb.array([]),
    });
    
        this.addactiveList();
    this._apiService.getlist().subscribe(data=>{
    this.data=data;
     console.log(this.data);
  })
    
  }
 addactiveList() {

        const control = <FormArray>this.itemaddForm.controls['activeList'];
        const addrCtrl = this.initLink();
        control.push(addrCtrl);

        console.log(control.length);
        this.addmore_length = (control.length);

    }
    rem_length;
removeList(i: any) 
{
        console.log(i);
        // this.addmore_length=i;
        const control = <FormArray>this.itemaddForm.controls['activeList'];
        this.rem_length = ((<FormArray>this.itemaddForm.controls['activeList']).length);
        console.log(this.rem_length);

        //const addrCtrl = this.initLink();
        control.removeAt((<FormArray>this.itemaddForm.controls['activeList']).length - 1);
        this.addmore_length = this.rem_length;
        console.log(this.addmore_length);
}    
initLink() {
        return this.fb.group({
             name: ['', Validators.required],
            quantity: ['', Validators.required],
            price:['', Validators.required]
          
        });
    }
    data;
insert={};
itemaddform() {

  this.insert['insert_date'] = this.insert_date;
    
    // const p = Object.assign({}, this.insert, this.itemaddForm.value);
    //         console.log(p);
    console.log(this.itemaddForm.value);
  this._apiService.insertlist(this.itemaddForm.value).subscribe(data=>{
    this.data=data;
     console.log(this.data);
     this.itemaddForm.reset();
  })
  }
    getuser($event)
    {
      let value=$event.target.value;
    }
    
    public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    disableWeekends: false,

    //  disableDays: this.service.holidays,
    disableUntil: { year: 0, month: 0, day: 0 }
    // disableUntil: {year: , month: 5 , day: 17}

  };
  picker1day;
  picker1month;
  picker1year;

  onDateChanged(event: IMyDateModel) {

    this.insert_date = event.formatted;
    // this.itemaddForm.patchValue({ insert_date:'insert_date' });
    // this.itemaddForm.controls['insert_date'];
    this.myDatePickerOptions2.disableUntil.year = event.date.year
    this.myDatePickerOptions2.disableUntil.month = event.date.month
    this.myDatePickerOptions2.disableUntil.day = event.date.day - 1
  }
}
