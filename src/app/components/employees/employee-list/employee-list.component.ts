import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/Class/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] =[];

  constructor(private employeeService: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit() {
    var x = this.employeeService.GetData();
    x.snapshotChanges().subscribe(item => {
      this.employees = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y['$key'] = element.key;
        this.employees.unshift(y as Employee); // or push 
      })
    });
  }

  onEdit(employee: Employee) {
    this.employeeService.SelectedEmployee = Object.assign({}, employee);
  }


  onDelete(key: string) {
    this.employeeService.DeleteEmployee(key);
    this.toastr.warning('Employee Deleted !!');
  }

}
