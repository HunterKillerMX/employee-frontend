import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "http://localhost:5142";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer_random_bearer_token_goes_here=='
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(employee: any): Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiServer + '/api/v1/Employee/', JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  getById(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(this.apiServer + '/api/v1/Employee/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiServer + '/api/v1/Employee/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: string, employee: any): Observable<Employee> {
    return this.httpClient.put<Employee>(this.apiServer + '/api/v1/Employee/' + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string){
    return this.httpClient.delete<Employee>(this.apiServer + '/api/v1/Employee/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
