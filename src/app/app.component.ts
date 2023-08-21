import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from './core/Interfaces/auth-status';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/home');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/authenticate/login');
        return;
    }
  });
}
