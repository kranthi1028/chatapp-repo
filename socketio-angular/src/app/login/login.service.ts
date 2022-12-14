import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  errorMessage:any;
  constructor(private http: HttpClient) { }

  public LoginUser(name: any): Observable<any> {
    //console.log("hello");
    
    const url = environment.URL+'/api/user/login'
    const data = {"username":name}
    return this.http.post<any>(url, data).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
            this.errorMessage = error.message;
            console.log("service error");
            
            console.error('There was an error!', error);

            // after handling error, return a new observable 
            // that doesn't emit any values and completes
            return of();
        }))
  } 
}
