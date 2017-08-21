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
  todaydate=new Date();
  public toasterconfig: ToasterConfig = 
  new ToasterConfig({

      // showCloseButton: true,
      // tapToDismiss   : true,
      timeout        : 5000

  });
  public toasterService: ToasterService;
  @ViewChild('modal1') modal1: ModalComponent;
  @ViewChild('popup2') popup2: Popup;
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
    toasterService: ToasterService)
     {
      this.toasterService = toasterService;
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
    const control = <FormArray>this.itemaddForm.controls['activeList'];
    this.rem_length = ((<FormArray>this.itemaddForm.controls['activeList']).length);
    console.log(this.rem_length);
    control.removeAt(i);
    this.addmore_length = this.rem_length - 1;
    console.log(this.addmore_length);
  }
  


  initLink() {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      units:['',Validators.required],
      receipt_no:['',Validators.required],
      price: ['', Validators.required],
      // insert_date:['',Validators.required],
      

    });
  }
  itemaddform() {
    this.insert['type'] = "IN";
    this.insert['reg_no'] = localStorage.getItem('reg_no');
    this.insert['insert_date1'] =this.insert_date;
    const p = Object.assign({}, this.insert, this.itemaddForm.value);
    console.log(p);

    console.log(this.itemaddForm.value);
    this._apiService.insertlist(p).subscribe(data => {

      this.onSaveComplete(data)
    },
    (error: any) => this.errorMessage = <any>error
  );
  }
  onSaveComplete(data): void {
    console.log(data);
    
    if (!data.success)
    {
        console.error('Savign failed');
        this.error = true;
        this.errorMessage = data.error;
    }
     else 
    {
        console.log('Saving successful');
        this.popToast();
        this.itemaddForm.reset();
        this.stockBalance();
        this.stockRegister();  
    }

}

    addactiveList1() {
  
      const control = <FormArray>this.itemoutForm.controls['activeList1'];
      const addrCtrl = this.initLink1();
      control.push(addrCtrl);
  
      console.log(control.length);
      this.addmore_length = (control.length);
  
    }
    removeList1(i: any) {
      console.log(i);
      const control = <FormArray>this.itemoutForm.controls['activeList1'];
      this.rem_length = ((<FormArray>this.itemoutForm.controls['activeList1']).length);
      console.log(this.rem_length);
      control.removeAt(i);
      this.addmore_length = this.rem_length - 1;
      console.log(this.addmore_length);
    }
    initLink1() {
     return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      units: ['',Validators.required],
    });
   }

  // itemoutform() {
  //   this.insert['type'] = "Out"
  //   this.insert['reg_no'] = localStorage.getItem('reg_no');
  //   console.log(this.itemoutForm.value, this.insert)
  //   const p = Object.assign({}, this.insert, this.itemoutForm.value);
  //   console.log(p);

  //   this._apiService.itemoutlist(p).subscribe(data => {
  //     this.data = data;
  //     this.popToast();
  //     this.itemoutForm.reset();
  //     this.stockBalance();
  //     this.stockRegister();
  //   });
  // }
  count : number =0;
 
   balance;
   itemoutform() {
     console.log(this.out_date);
    this.insert['type'] = "Out",
    this.insert['reg_no'] = localStorage.getItem('reg_no'),
    this.insert['out_date1'] = this.out_date;
    console.log(this.itemoutForm.value.activeList1[0].name,this.itemoutForm.value.activeList1[0].quantity,'test2')
      // ,this.itemoutForm.value.activeList1[1].name,this.itemoutForm.value.activeList1[1].quantity, 'test2')
     console.log(this.itemoutForm.value.activeList1.length,'test3');

     var arraydata=this.itemoutForm.value.activeList1;
     var  j = 0;
     var num=0;
     var numbers = [1, 2, 3];
     var sizeofitem=this.itemoutForm.value.activeList1.length;
     for (var _i = 0; _i < numbers.length; _i++) {
          num = num + numbers[_i];
     }

     console.log(num,'test6');
     
    //  for(var i = 0; i < sizeofitem; i++ ){
    //    if(arraydata[i].name){
    //     j = (j + parseInt(arraydata[i].quantity));
    //    }
    //    else{

    //    }
    //   }
      for(var i = 0; i < sizeofitem; i++ ){
         j = (j + parseInt(arraydata[i].quantity));
       }
      console.log(j, 'test4');
      console.log(this.count,'test5');
    const p = Object.assign({}, this.insert, this.itemoutForm.value);
    console.log(p,'test1');

    this._apiService.itemoutlist(p).subscribe(data => {
      
      this.outForm(data)
    },
    (error: any) => this.errorMessage = <any>error
    );
    }

   outForm(data): void {
    console.log(data);
    
    if (!data.data.success)
    {
        console.error('Saving failed');
        this.balance = data.data.data;
        console.log(data.data.data);
        // this.stock_data.forEach(element => {
        //   let i=0;
        //   if(element.id==this.balance[i]){
        //     console.log(this.balance[i]);
            
        //   }
        //   i++;
        // });
         this.goPopup2();
        //  this.popToast1();
        this.error = true;
        this.errorMessage = data.error;
    }
     else 
    {
        console.log('Saving successful');
        this.popToast();
        this.itemoutForm.reset();
        this.stockBalance();
        this.stockRegister(); 
    }

}

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mmm-dd',
    editableDateField: false,
    disableWeekends: false,
    disableSince: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth()+1, day: this.todaydate.getDate()+1 }

  };

  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mmm-dd',
    editableDateField: false,
    disableWeekends: false,
    disableSince: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth()+1, day: this.todaydate.getDate()+1 }
  };
  picker1day;
  picker1month;
  picker1year;
  

  onDateChanged(event: IMyDateModel) {
    this.insert_date = event.date.year+'-'+event.date.month+'-'+event.date.day;
    console.log(this.insert_date,'dtae test');
    // this.insert_date = event.formatted;
    // this.myDatePickerOptions2.disableUntil.year = event.date.year
    // this.myDatePickerOptions2.disableUntil.month = event.date.month
    // this.myDatePickerOptions2.disableUntil.day = event.date.day - 1
  }
  onDateChanged2(event: IMyDateModel) {
    this.out_date = event.date.year+'-'+event.date.month+'-'+event.date.day;
    console.log(this.out_date, 'from date test');
    // this.out_date = event.formatted
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
  popToast() {
    this.toasterService.pop('success', '', 'Successfully submitted your request');
  }
  popToast1() {
    this.toasterService.pop('warning', '', 'ERROR');
  }
  goPopup2() {
        //myModal.open()    

        this.popup2.options = {
            header           : "Warning!",
            color            : "#34495e",        // red, blue.... 
            widthProsentage  : 50,               // The with of the popou measured by browser width 
            animationDuration: 1,
            showButtons      : false,            // You can hide this in case you want to use custom buttons 
            animation        : "bounceInDown",   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
        };
        this.popup2.show(this.popup2.options);

        //this.popup1.show();

    }
    ok() {
      console.log('hello');
      this.popup2.hide();
  }

}
