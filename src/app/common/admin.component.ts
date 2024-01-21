import { AdminService } from './../services/admin.service';
import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../animations';

@Component({
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    constructor(private adminService: AdminService) { }

    profile: string = '';

    getProfile() {
        this.adminService
            .getProfile()
            .subscribe(
                response => this.profile = response
            );
    }
}