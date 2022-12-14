import { Component, OnInit } from '@angular/core';
import { SocketioService } from './socketio.service';
import { Observable, Subscription, Subscriber} from 'rxjs';
import { environment } from 'environment';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
 
  title = 'socketio-angular';
  
  
}
