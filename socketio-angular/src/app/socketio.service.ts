import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'environment';
import { Observable, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket:any;
  constructor() {
     this.socket = io(environment.URL);
  }
  // setupSocketConnection() {
  //   this.socket = io(environment.SOCKET_ENDPOINT);
  //   // console.log("conn",this.socket);
  //   this.socket.emit('my message', 'hello');
  //   console.log("hi");

  //   this.socket.on('my broadcast', (data: string) => {
  //   console.log(data);
  //   });
  // }

  public sendMessage(message:any) {
        this.socket.emit('new-message', message);
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
        console.log("disconn",this.socket)
    }    
  }


 
  getMessages(){
     console.log("rrrrrrrrrrrrrrrrrrrgererfe");
  return  new Observable((observer: Observer<any>)=>{
      this.socket.on('message', (message:any)=>{
        observer.next(message)
      })
    })
  }

}

