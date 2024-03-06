import { Component, OnInit, Input, TemplateRef, inject } from '@angular/core';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CrudService } from '../crud.service';
import { Employee } from '../employee';
import { Router, RouterLink } from '@angular/router';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  standalone: true,
  template: `<button (click)="crudService.delete(employee.id)" class="button-7">Delete</button><button (click)="openUpdate(employee)" class="button-7">Update</button>`,
})
export class CustomButtonComponent implements ICellRendererAngularComp {
  router!: Router
  @Input() employee!: Employee;
  @Input() crudService!: CrudService;
  private modalService = inject(NgbModal);
	closeResult = '';

  agInit(params: ICellRendererParams): void {};

  openUpdate(content: TemplateRef<Employee>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  refresh(params: ICellRendererParams) {
    return true;
  };
}

@Component({
  selector: 'app-create-parent',
  standalone: true,
  imports: [CreateComponent],
  template: `
    <app-create/>
  `
})
export class CreateParentComponent {
  master = 'Master';
}

@Component({
  selector: 'app-update-parent',
  standalone: true,
  imports: [UpdateComponent],
  template: `
    <app-update [employee] = "employee"/>
  `
})
export class UpdateParentComponent {
  @Input("employee") employee!: Employee;
  master = 'Master';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AgGridAngular,
    RouterLink,
    CreateParentComponent,
    UpdateParentComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  employees: Employee[] = [];

  constructor(public crudService: CrudService) { }

  private modalService = inject(NgbModal);
	closeResult = '';

  colDefs: ColDef[] = [
    { field: "name" },
    { field: "position" },
    { field: "hiringDate", valueFormatter: p => new Date(p.value).toISOString().slice(0,10)},
    { field: "salary", valueFormatter: p => '$' + Math.floor(p.value).toLocaleString()},
    { field: "action", cellRenderer: CustomButtonComponent }
  ];  

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  ngOnInit() {
    this.crudService.getAll().subscribe((data: Employee[])=>{
      console.log(data);
      this.employees = data;
    });
  }
}
