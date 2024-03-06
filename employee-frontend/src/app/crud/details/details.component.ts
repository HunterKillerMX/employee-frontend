import { Component, Input } from '@angular/core';

import { Employee } from '../employee';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input("employee") employee!: Employee;
  @Input('master') masterName = '';
  
}
