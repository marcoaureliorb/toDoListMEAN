import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { authenticationGard } from 'authenticationGuard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: ContentComponent, canActivate: [authenticationGard] },

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
