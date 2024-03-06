import { Component, OnInit, Input  } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  standalone: true,
  imports: [
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  employeeForm!: FormGroup;
  @Input('master') masterName = '';
  ngOnInit() {
      this.employeeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.pattern('[0-9]{2}-[0-9]{2}-[0-9]{4}')]),
      hiringDate: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.pattern('[0-9]')]),    
    })
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ){ }
  submitForm() {
    this.crudService.create(this.employeeForm.value).subscribe(res => {
      console.log('Employee created!');
      this.router.navigateByUrl('/crud/home/');
    });
  }
}
