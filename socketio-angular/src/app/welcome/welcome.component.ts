import { Component } from '@angular/core';
import { environment } from 'environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(){
    
     setTimeout (() => {
      if(environment.production == false){
                 window.location.href = 'http://localhost:4200/login';
      }
      else{
        window.location.href = 'https://chatapp-c.vercel.app/login'
      }
      }, 5000);
  }
}
