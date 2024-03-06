import { Component, OnInit, Input, input  } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Employee } from '../employee';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  standalone: true,
  imports: [
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  employeeForm!: FormGroup;
  @Input("employee") employee!: Employee;
  @Input('master') masterName = '';
  ngOnInit() {
      this.employeeForm = this.fb.group({
      name: new FormControl(this.employee.name, [Validators.required]),
      position: new FormControl(this.employee.position, [Validators.pattern('[0-9]{2}-[0-9]{2}-[0-9]{4}')]),
      hiringDate: new FormControl(this.employee.hiringDate, [Validators.required]),
      salary: new FormControl(this.employee.salary, [Validators.pattern('[0-9]')]),    
    })
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ){ }
  submitForm() {
    this.crudService.update(this.employee.id,this.employeeForm.value).subscribe(res => {
      console.log('Employee created!');
      this.router.navigateByUrl('/crud/home/');
    });
  }
}
