import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, ViewChild, AfterViewInit, ElementRef, OnInit, HostBinding } from '@angular/core';
import { NgForm, FormsModule } from "@angular/forms";
import { fadeInAnimation } from '../animations';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [FormsModule]
})
export class LoginComponent implements AfterViewInit, OnInit {
    error = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    loginUser(form: NgForm) {
        if (form.valid) {
            this.authService
                .login(form.value.username, form.value.password)
                .subscribe(
                    result => {
                        if (result) {
                            this.router.navigateByUrl('/admin');
                        } else {
                            this.error = 'Invalid username or password!';
                        }
                    }
                );
        }
    }

    ngAfterViewInit(): void {
        this.setFocus();
    }

    @ViewChild('username') myInput: ElementRef;

    setFocus() {
        this.myInput.nativeElement.focus();
    }

    ngOnInit() {
    }
}