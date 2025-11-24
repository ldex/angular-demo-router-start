import { Component, computed, inject, signal, VERSION } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth-service';
import { debounceTime, filter, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './app.html'
})
export class App {
  private router = inject(Router);
  private authService = inject(AuthService);

  protected readonly title = signal('Angular Store');
  protected readonly version = signal(VERSION.full);

  readonly isLoggedIn = computed(() => this.authService.isLoggedIn());

  login() {
    this.router.navigateByUrl("/login");
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/home");
  }
}
