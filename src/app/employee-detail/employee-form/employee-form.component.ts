import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import {NgForm} from '@angular/forms';
import { Employee } from 'src/app/shared/employee.model';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonFilter } from 'src/app/shared/commonFilter';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public empService:EmployeeService ,private toastr: ToastrService ) { }
  @ViewChild('checkbox1') checkBox:ElementRef;
  isCollapse:true;
  commonFilter= new CommonFilter();
  sub: Subscription;
  isSlide:string='off';
  ngOnInit(): void {
    this.empService.getDesignation().subscribe(data=>{
      this.empService.listDesignation=data;
        })
  }

  SaveEmployee(myForm:NgForm)
  {
    this.empService.saveEmployee().subscribe(data=>{
      this.resetForm(myForm)
      this.empService.getEmployee().subscribe(d=>{
        this.empService.listEmployee=d;
      })
      this.toastr.success('Lưu thành công', 'Thông báo', {timeOut: 5000})
      
    })
  }
  resetForm(myForm:NgForm)
  {
    myForm.form.reset(myForm.value);
    this.empService.employeeData= new Employee();
  }
  toggleCollapse(): void {
    // this.isCollapse = !this.isCollapse;
    // this.controlArray.forEach((c, index) => {
    //   c.show = this.isCollapse ? index < 6 : true;
    // });
  }
  hideShowSlide()
  {
    if(this.checkBox.nativeElement.checked)
    {
      this.checkBox.nativeElement.checked=false;
      this.isSlide='off';
    }
    else
    {
      this.checkBox.nativeElement.checked=true;
      this.isSlide='on';
    }
  }



  search(){
    this.searchEmployees()
  }
  clear(){
    this.commonFilter.Name='';
    this.commonFilter.LastName='';
    this.commonFilter.Email='';
    this.commonFilter.Gender='';
    this.empService.getEmployee().subscribe(data=>{
      this.empService.listEmployee=data;
    })
  }
  searchEmployees() { 
    this.empService.getEmpbyFilter(this.commonFilter).subscribe((data:any) => {
      this.commonFilter= data;
      console.log(data);
      if(data){
        this.empService.listEmployee=data
        console.log(this.empService.listEmployee);
        
      }else{
        this.empService.getEmployee().subscribe(data=>{
          this.empService.listEmployee=data;
        })
      }
      // this.empService.listEmployee=data.result ? this.empService.listEmployee : [];
      console.log(this.empService.listEmployee);  
    })
  }

  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) > 0;

}
