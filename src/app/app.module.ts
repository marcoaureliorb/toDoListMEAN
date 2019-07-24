import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationService  } from 'AuthenticationService';
import { authenticationGard } from 'authenticationGuard';
import { RegisterComponent } from './register/register.component';
import { DialogComponent } from './shared/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,    
    MatIconModule,
    MatButtonModule
  ],
  entryComponents: [DialogComponent],
  providers: [AuthenticationService , authenticationGard],
  bootstrap: [AppComponent]
})
export class AppModule { }
