import { Component } from '@angular/core';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private loginService: LoginService){}
name:any;
res:any;
uniqID:any;
errorMessage:any;
saveName(){
 // console.log(this.name);
  localStorage.setItem('name',this.name)

  //http call
   this.loginService.LoginUser(this.name).subscribe({
        next: data => {
            this.res = data;
            console.log("res",this.res);
            this.uniqID = data.data._id;
           console.log(this.uniqID);
            localStorage.setItem('uniqID',this.uniqID)
          //  console.log(localStorage.getItem('uniqID'));
            
        },
        error: error => {
            this.errorMessage = error.message;
            console.log("com error");
            
           // console.error('There was an error!', error.message);
        }
    });
}
}
