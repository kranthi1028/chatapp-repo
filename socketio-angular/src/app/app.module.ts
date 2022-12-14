import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SocketioService } from './socketio.service';
import {FormsModule} from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component'
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { WelcomeComponent } from './welcome/welcome.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [SocketioService, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
