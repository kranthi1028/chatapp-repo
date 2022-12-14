import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of , retry, throwError} from 'rxjs';
import { environment } from 'environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const url =  environment.URL + '/api/user/getusers'
     return this.http.get<any>(url).pipe(retry(1), catchError(this.handleError));
  }

    // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
