import { Routes } from '@angular/router';
import { Home } from './shared/home';
import { Contact } from './shared/contact';
import { AppError } from './shared/app-error';
import { Admin } from './shared/admin';
import { Login } from './shared/login';
import { NavError } from './shared/nav-error';
import { ComposeMessage } from './shared/compose-message';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home},
    { path: 'contact', component: Contact },
    { path: 'admin', component: Admin },
    { path: 'login', component: Login},
    { path: 'error', component: AppError },
    { path: '**', component: NavError },
];
