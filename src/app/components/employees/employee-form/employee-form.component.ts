import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Service/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { isDate } from 'util';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  EmployeeCRUD = 'Employee CRUD'
  
  constructor(private employeeService: EmployeeService,
    private toastr: ToastrService) { }

    controls = this.employeeService.SelectedEmployee;
  ngOnInit() {
    this.employeeService.GetData();
    this.ResetFormEmployee();
  }

  ResetFormEmployee(formEmployee?: NgForm) {
    if (formEmployee != null) {
      formEmployee.reset();
      this.employeeService.SelectedEmployee = {
        $key: null,
        fullName: '',
        office: '',
        position: '',
        salary: 0
      }
    }
  }

  OnSubmitForm(formEmployee: NgForm) {
    if(formEmployee.valid) {
      if (formEmployee.value.$key == null) {
        this.employeeService.InsertEmployee(formEmployee.value);
        this.toastr.success('Employee SuccessFully Registred')
      } else {
        this.employeeService.UpdateEmployee(formEmployee.value);
        this.toastr.info('Employee Updated');
      }
    }
    this.ResetFormEmployee(formEmployee);
  }


}
