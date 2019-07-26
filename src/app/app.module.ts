import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationService  } from 'src/app/_services/AuthenticationService';
import { authenticationGard } from 'src/app/_guards/authenticationGuard';
import { RegisterComponent } from './register/register.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { MainComponent } from './main/main.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { FakeBackendInterceptor } from './_helpers/fakeBackendInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    DialogComponent,
    MainComponent,
    MenuLeftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,    
    MatIconModule,
    MatButtonModule
  ],
  entryComponents: [DialogComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    AuthenticationService, 
    authenticationGard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
