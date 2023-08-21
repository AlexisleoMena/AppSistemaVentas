import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'authenticate',
    loadChildren: () =>
      import('../app/modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () =>
      import('../app/modules/home/home.module').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: 'authenticate' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
