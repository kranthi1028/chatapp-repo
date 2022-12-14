import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(){
     setTimeout (() => {
         window.location.href = 'http://localhost:4200/login';
      }, 5000);
  }
}
