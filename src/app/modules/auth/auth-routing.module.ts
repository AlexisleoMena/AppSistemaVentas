import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './Pages/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

const routes: Routes = [

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent },
      {path: 'register', component: RegisterComponent},
      {path: '**', redirectTo: 'login'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
