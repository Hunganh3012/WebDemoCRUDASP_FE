import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../service/employee/employee.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { NgForm } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { empty } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  isVisibleAdd = false;
  isVisibleEdit = false;
  commonFilter:any;
  index=0;
  listEmpSelect: number[];
  listId:any=[];
  Swal = require('sweetalert2');
  today = new Date();
  detail:any;
  allChecked = false;
  indeterminate = false;
  checked = false;
  listOfCurrentPageData: readonly Employee[] = [];
  requestData:any=[];
  setOfCheckedId = new Set<number>();
  timeDefaultValue = setHours(new Date(), 0);
  constructor(public empService: EmployeeService,
              private toastr: ToastrService,
            ) { }
  @ViewChild(EmployeeFormComponent) emp:EmployeeFormComponent;
  ngOnInit(): void {
    this.empService.getEmployee().subscribe(data =>{
      this.empService.listEmployee=data;

      
    });
    
  }
  showModal(): void {
    this.isVisibleAdd = true;
  }
  
  handleOk(): void {

  
    this.isVisibleAdd = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleAdd = false;
  }
  handleCancelEdit():void{
    this.isVisibleEdit = false;

  }
  Searchpopup(){
      if(this.emp.isSlide==='off')
      {
       this.emp.hideShowSlide();
      }
  }
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) > 0;

  populateEmployee(id:number) {
    //Sửa
    this.isVisibleEdit=true;
      this.empService.getdetailEmployee(id).subscribe((data:any)=>{
         this.detail=data;
        console.log(this.detail);
        
      })
      // this.empService.employeeData=selectEmployee;
      // if(this.emp.isSlide==='off')
      // {
      //  this.emp.hideShowSlide();
      // }
  }
  submitAdd(form:NgForm){
      if(this.empService.employeeData.id==0)
      this.SaveEmployee(form);
    else
    this.UpdateEmployee(form);

    this.isVisibleAdd=false;
    }
  submitEdit(form:NgForm){
      if(this.detail.id==0)
      this.SaveEmployee(form);
    else
    this.UpdateEmployee(form);

    // this.isVisibleEdit=false;
    }



    SaveEmployee(myForm:NgForm)
  {
    this.empService.saveEmployee().subscribe(data=>{
      this.resetForm(myForm)
      this.empService.getEmployee().subscribe(d=>{
        this.empService.listEmployee=d;
      })
      this.toastr.success('Lưu thành công', 'Thông báo', {timeOut: 5000})
      
      this.isVisibleAdd = false;
    })

  }
  UpdateEmployee(myForm:NgForm){
      this.empService.updateEmployee(this.detail.id,this.detail).subscribe(data=>{
        this.empService.getEmployee().subscribe(data=>{
          this.empService.listEmployee=data
        })
        console.log(this.empService.listEmployee);

        this.toastr.success('Sửa thành công thành công', 'Thông báo', {timeOut: 5000})
        this.isVisibleEdit = false;
      })


    
  }
  resetForm(myForm:NgForm)
  {
    myForm.form.reset(myForm.value);
    this.empService.employeeData= new Employee();
  }
  Delete(){
        Swal.fire({
          title: 'Bạn chắc chắn xóa',
          text: "Thông tin sẽ được xóa vĩnh viện",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Chắc chắn xóa!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.listEmpSelect=[];
            this.setOfCheckedId.forEach(item=>{
              this.listEmpSelect.push(item);
            });
            console.log(this.listEmpSelect);
            this.empService.deleteList(this.listEmpSelect).subscribe(res=>{
              this.empService.getEmployee().subscribe(data=>{
                      this.empService.listEmployee=data;
                    })
                    this.setOfCheckedId.clear();
                    
            })
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
    

  }
  Deleteonly(id :number){
    Swal.fire({
      title: 'Bạn chắc chắn xóa',
      text: "Thông tin sẽ được xóa vĩnh viện",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chắc chắn xóa!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        
        this.empService.deleteEmployee(id).subscribe(res=>{
            this.empService.getEmployee().subscribe(data=>{
              this.empService.listEmployee=data;
            })

        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      
      }
    })
  
  }

 reload(){
    this.empService.listEmployee=[];
    this.listEmpSelect=[];  
 }


  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Employee[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
    // console.log($event)
  }
 
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ ischecked }) => !ischecked);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;  };
  
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ ischecked }) => !ischecked)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }


}
