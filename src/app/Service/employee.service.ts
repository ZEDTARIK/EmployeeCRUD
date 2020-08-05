import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Employee } from '../Class/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  EmployeeList: AngularFireList<any>;
  SelectedEmployee: Employee = new Employee();

  constructor(private firebase: AngularFireDatabase) { }

  GetData() {
    this.EmployeeList = this.firebase.list('EmployeeDB');
    return this.EmployeeList;
  }

  InsertEmployee(employee: Employee) {
    this.EmployeeList.push({
      fullName: employee.fullName,
      office: employee.office,
      position: employee.position,
      salary: employee.salary
    });
  }

  UpdateEmployee(employee: Employee) {
    this.EmployeeList.update(
      employee.$key, 
      {
      fullName: employee.fullName,
      office: employee.office,
      position: employee.position,
      salary: employee.salary
    });
  }

  DeleteEmployee(key: string) {
    this.EmployeeList.remove(key);
  }

}
