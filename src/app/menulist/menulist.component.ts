import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import {ModalComponent} from '../modal.component';
import { ReactiveFormsModule,FormsModule,Form,FormGroup,FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.css']
})
export class MenulistComponent implements OnInit {
  menulist_form:FormGroup;
  menulistitems_form:FormGroup;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,public fb:FormBuilder) {
      this.menulist_form=this.fb.group({
      breakfast: ['',Validators.required],
      lunch:['',Validators.required],
       snacks: ['',Validators.required],
       dinner: ['',Validators.required],
       day:['',Validators.required]

  })
       this.menulistitems_form=this.fb.group({
      breakfast: ['',Validators.required],
      lunch:['',Validators.required],
       snacks: ['',Validators.required],
       dinner: ['',Validators.required],
       id:this.id

  })
      
     };
 @ViewChild('modal1') modal1: ModalComponent;
    public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "name";
    public sortOrder = "asc";
    id;
    day;
    data2;
    users: Array<any> = [

        { username: 'Sunday'},
        { username: 'Monday'},
        { username: 'Tuesday'},
        { username: 'wednesday'},
        { username: 'Thursday'},
        { username: 'Friday'},
        { username: 'Saturday'},
    ]; 
    
    data1;

  ngOnInit() {
    this.getmenulist();
    
  }
  menulistitems(){
   
    this._apiService.menulist(this.menulist_form.value).subscribe(data1=>{
      this.data1=data1;
      this.menulist_form.reset();
      this.getmenulist();
    })
  }
  editmenulist(project)
  {
    this.modal1.show();
    this.id=project.id;
    this.day=project.mday;
    this.menulistitems_form.patchValue(project);
  }
  updatemenulist()
  {
    this._apiService.updatelist(this.menulistitems_form.value).subscribe(data2=>
    {
      this.data2=data2;
      this.getmenulist();
    })
    
    this.modal1.hide();
    
  }
  close()
  {
    this.modal1.hide();
  }
  getmenulist()
  {
  this._apiService.getmenulist().subscribe(data=>{
      this.data=data.data;
      console.log(data.data);
    })
  }


}
