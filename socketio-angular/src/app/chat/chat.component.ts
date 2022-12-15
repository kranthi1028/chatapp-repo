import { Component } from '@angular/core';
import { environment } from 'environment';
import { io } from 'socket.io-client';
import { LoginComponent } from '../login/login.component';
import { ChatService } from './chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
message:any;
  name:any = localStorage.getItem('name');
  
  messages:any = [];
  users:any;
  userList: any;
  selectedUser:any;
  isSelected:any=false;
  selectedUserObj:any = {messages : []};
  title = 'socketio-angular';
  socket:any;
  errorMessage:any;
  todayString : string = new Date().toDateString();
  constructor( private loginComponent: LoginComponent, private chatService: ChatService) {
    

    setTimeout (() => {
         this.startSocket();
      }, 10000);
    // this.getUsers();
     
  }
  getUsers(){
     this.chatService.getUsers().subscribe({
        next: data => {
            this.userList = data.data;
            console.log("users list",this.users);
        },
        error: error => {
            this.errorMessage = error.message;
            console.log("com error");
            
           // console.error('There was an error!', error.message);
        }
    });
  }

  ngOnDestroy() {
  if (this.socket) {
        this.socket.disconnect();
        console.log("disconn",this.socket)
    }   
  }

  // ngAfterViewInit(){
  //   console.log("wwbfwe");
    
  //   this.socketService
  //     .getMessages()
  //     .subscribe((message: any) => {
  //       console.log("client",message)
  //       this.messages.push(message);
  //     });
  // }

 sendMessage() {
  //console.log(this.selectedUserObj.userdata.userID);

    let data = {name: this.name,message:this.message}
    if (this.selectedUser) {
    this.socket.emit("private message", {
      data,
      to: this.selectedUserObj.userdata.userID,
    });
    for (let i = 0; i < this.users.length; i++) {
    const user = this.users[i];
    if (user.userID === this.selectedUserObj.userdata.userID) {
      user.messages.push({
        data:data,
        fromSelf: true,
      });
      break;
    }
  }
  }
    
    // this.socket.emit('new-message', data);
    // console.log("send",data);
    
    // this.messages.push({name:this.name,message:this.message});
    // this.message = '';
  }

  startSocket(){ 
    //connection
    this.socket = io(environment.URL);

    const uniqID = localStorage.getItem('uniqID')
    console.log("un",uniqID)
    this.socket.uniqID = uniqID;
    console.log('soc',this.socket);
    
    //set the auth
    this.socket.auth = { "uniqID" : uniqID, "name" : this.name};
   // console.log(this.socket.auth);
    
    //console.log("conn",this.socket);
   // get the users list
    this.socket.on('users',(data:any)=>{
      console.log("users_list",data);
      this.users=data;
    })


   // add the new connected user to users list
    this.socket.on("user connected", (user:any) => {
      this.users.push(user);
    });


    //action when getting message
    this.socket.on("private message", (data:any) => {
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        if (user.userID === data.from) {
          user.messages.push({
            data:data.data,
            fromSelf: false,
          });
          if (user !== this.selectedUser) {
            user.hasNewMessages = true;
          }
          break;
        }
      }
    });

    this.socket.on('message-broadcast', (data:any) => {
    //console.log(data);
    this.messages.push(data);
    //console.log("mess",this.messages);
    });

    //

    this.socket.onAny((event:any, ...args:any) => {
    console.log("event-msg",event, args);
    });
  }

  updateSelectedUser(user:any){
    this.isSelected=true;
    this.selectedUser = user.username; 
    this.selectedUserObj.userdata=user;
    //console.log("selected user",this.selectedUserObj);
    console.log("users",this.users);
    
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if(user.userID == this.selectedUserObj.userdata.userID){
        this.messages = user.messages;
        break;
      }
    }
  }

}
