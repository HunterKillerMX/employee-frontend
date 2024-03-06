import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CrudModule } from './crud/crud.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrudModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Employee Administration App';
}
