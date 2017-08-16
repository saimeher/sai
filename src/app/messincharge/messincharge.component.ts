import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import {  FormControl } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { ModalComponent } from '../modal.component';



@Component({
  selector: 'app-messincharge',
  templateUrl: './messincharge.component.html',
  styleUrls: ['./messincharge.component.css']
})
export class MessinchargeComponent implements OnInit {
     itemaddForm: FormGroup;
     itemoutForm:FormGroup;
     addmore_length;
     insert_date;
     out_date;
     data1;
     data2;
     mid;
     error = false;
     errorMessage = '';
     item;
     out;
     d;
     

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    public fb: FormBuilder,) { };
    @ViewChild('modal1') modal1: ModalComponent;
    // users: Array<any> = [

    //     { username: 'Potato' },
    //     {
    //         username: 'Rava' 
    //     },
    //     { username: 'Onions' },
    // ];
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
       this.itemoutForm = this.fb.group({
      out_date:['',Validators.required],
      slot:['',Validators.required],
       activeList1: this.fb.array([]),
    });
      //  let user = response.json();
      // this.d = localStorage.setItem('reg_no');
    
      this.addactiveList1();
    
        this.addactiveList();
        this.getlists();
   
    
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
        this.addmore_length = this.rem_length-1;
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

  // this.insert['insert_date'] = this.insert_date;
      this.insert['type']= "IN";
      // this.mid['mid'] = it.mid;
       this.insert['reg_no'] = localStorage.getItem('reg_no');
    const p = Object.assign({}, this.insert, this.itemaddForm.value);
            console.log(p);
  
    console.log(this.itemaddForm.value);
  this._apiService.insertlist(p).subscribe(data=>{
    this.data=data;
     console.log(this.data);
     this.itemaddForm.reset();
  })
  }
addactiveList1() {

        const control = <FormArray>this.itemoutForm.controls['activeList1'];
        const addrCtrl = this.initLink1();
        control.push(addrCtrl);

        console.log(control.length);
        this.addmore_length = (control.length);

    }
      removeList1(i: any) 
       {
        console.log(i);
        // this.addmore_length=i;
        const control = <FormArray>this.itemoutForm.controls['activeList1'];
        this.rem_length = ((<FormArray>this.itemoutForm.controls['activeList1']).length);
        console.log(this.rem_length);

        //const addrCtrl = this.initLink();
        control.removeAt((<FormArray>this.itemoutForm.controls['activeList1']).length - 1);
        this.addmore_length = this.rem_length-1;
        console.log(this.addmore_length);
          }
      initLink1() {
        return this.fb.group({
             name: ['', Validators.required],
            quantity: ['', Validators.required] 
        });
    }    
      itemoutform()
      {
        console.log(this.itemoutForm.value)
        this.insert['type'] ="Out"
        //  this.out['out'] = this.out_date;
        this.insert['reg_no'] = localStorage.getItem('reg_no');
         console.log(this.out_date)
        console.log(this.itemoutForm.value,this.insert)
        const p = Object.assign({}, this.insert, this.itemoutForm.value);
            console.log(p);

        this._apiService.itemoutlist(p).subscribe(data=>{
    this.data=data;
     this.itemoutForm.reset();
    
        });
      }
    getuser($event)
    {
      let value=$event.target.value;
    }

    addnewitem()
    {
      this.modal1.show();
    }
    submit()
    {
      console.log(this.item)
      let value={
        'item':this.item
      };
    this._apiService.addnewitem(value).subscribe(data2=>{
      this.data2=data2;
      this.getlists();
    })
    this.modal1.hide();
    }

    getlists(){
       this._apiService.getlist().subscribe(data1=>{
    this.data1=data1.data;
     console.log(this.data1);
  })
    }
close()
{
  this.modal1.hide(); 
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

    //  disableDays: this.service.holidays,
    disableUntil: { year: 0, month: 0, day: 0 }
    // disableUntil: {year: , month: 5 , day: 17}

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
    //  this.out_date = event.formatted
     this.out_date = event.date.year+'-'+event.date.month+'-'+event.date.day;
    console.log(this.out_date, 'from date test');
     
      console.log('this.out_date')
    // this.out_date = event.formatted
  }
}
