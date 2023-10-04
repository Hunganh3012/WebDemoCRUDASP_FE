import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Designation, Employee } from 'src/app/shared/employee.model';
import { Subject,map } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private myHttp:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  designationUrl=environment.apiUrl+'Designation';
  employeeUrl=environment.apiUrl+'Employee'
  
  //lấy dữ liệu của danh sách Employee
  listEmployee:Employee[]=[];
  listDesignation:Designation[]=[]; 

  employeeData:Employee= new Employee();


  getEmployee():Observable<Employee[]>{
    return this.myHttp.get<Employee[]>(this.employeeUrl)
      
  }
  getdetailEmployee(id:number){
    return this.myHttp.get(`${this.employeeUrl}/${id}`);
  }
  saveEmployee()
  {
    return this.myHttp.post(this.employeeUrl,this.employeeData);
  }

  updateEmployee(id:number,data:any):Observable<Employee[]>{
    return this.myHttp.put<Employee[]>(`${this.employeeUrl}/${id}`,data)
  }
  deleteEmployee(id:number){
    return this.myHttp.delete(`${this.employeeUrl}/${id}`);
  }
  getDesignation():Observable<Designation[]>{
    return this.myHttp.get<Designation[]>(this.designationUrl)
  }

  //------------------------------------------------
  deleteList(listid:number[]){
    return this.myHttp.post(this.employeeUrl+ `/DeleteList`,listid,this.httpOptions)
  }

  getEmpbyFilter(filter:any){
    let query = Object.keys(filter || {}).map((key: any) => key + '=' + filter[key]).join('&');
    return this.myHttp.get(environment.apiUrl+`Employee?` + query);
  }

}

