import { AdminService } from './services/admin.service';
import { ErrorComponent } from './common/error.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './common/login.component';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './common/admin.component';
import { ContactComponent } from './common/contact.component';
import { HomeComponent } from './common/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ComposeMessageComponent } from './common/compose-message.component';
import { ProductsModule } from './products/products.module';
import { JwtModule } from '@auth0/angular-jwt';
import { config } from 'src/environments/environment';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        AdminComponent,
        LoginComponent,
        ErrorComponent,
        ComposeMessageComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ProductsModule,
        AppRoutingModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem(config.storageTokenKey);
                },
                allowedDomains: ['localhost:4200']
            }
        })], providers: [
        AuthService,
        AdminService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
