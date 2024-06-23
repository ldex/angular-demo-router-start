import { Routes } from '@angular/router';
import { AdminComponent } from './common/admin.component';
import { ComposeMessageComponent } from './common/compose-message.component';
import { ErrorComponent } from './common/error.component';
import { HomeComponent } from './common/home.component';
import { LoginComponent } from './common/login.component';
import { ContactComponent } from './common/contact.component';

export const routes: Routes = [
    { path: '', redirectTo:'/home', pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo:'/error?reason=NavError' }
];