import { ComposeMessageComponent } from './common/compose-message.component';
import { ErrorComponent } from './common/error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './common/login.component';
import { AdminComponent } from './common/admin.component';
import { ContactComponent } from './common/contact.component';
import { HomeComponent } from './common/home.component';
import { environment } from '../environments/environment';
import { LoginRouteGuardService } from './services/login-route-guard.service';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [LoginRouteGuardService] },
  { path: 'contact', component: ComposeMessageComponent, outlet: 'side' },
  { path: 'products', loadChildren: () =>
                        import('./products/products.module')
                        .then(m => m.ProductsModule) },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo:'/error?reason=NavError' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: environment.production ? false : true,
      relativeLinkResolution: 'legacy'
     })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
