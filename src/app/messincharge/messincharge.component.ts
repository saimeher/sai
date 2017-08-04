import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import {  FormControl } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators, FormControlName } from '@angular/forms';


@Component({
  selector: 'app-messincharge',
  templateUrl: './messincharge.component.html',
  styleUrls: ['./messincharge.component.css']
})
export class MessinchargeComponent implements OnInit {
    taskForm: FormGroup;
     addmore_length;
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
        // { username: 'Meher' },
        // { username: 'manoj' },
        // { username: 'krishna' },
        // { username: 'Durga Prasad' }
    ];

  ngOnInit() {
    this.taskForm = this.fb.group({
      assigned_to: ['', Validators.required],
      task_name: ['', Validators.required]
     


    });
    this._apiService.getlist().subscribe(data=>{
    this.data=data;
     console.log(this.data);
  })
    
  }
 addactiveList() {

        const control = <FormArray>this.taskForm.controls['activeList'];
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
        const control = <FormArray>this.taskForm.controls['activeList'];
        this.rem_length = ((<FormArray>this.taskForm.controls['activeList']).length);
        console.log(this.rem_length);

        //const addrCtrl = this.initLink();
        control.removeAt((<FormArray>this.taskForm.controls['activeList']).length - 1);
        this.addmore_length = this.rem_length;
        console.log(this.addmore_length);
}    
initLink() {
        return this.fb.group({
             assigned_to: ['', Validators.required],
            task_name: ['', Validators.required],
            
      

        });
    }
    data;
save() {
  this._apiService.getlist().subscribe(data=>{
    this.data=data;
     console.log(this.data);
  })
 
     
    }
    
}
