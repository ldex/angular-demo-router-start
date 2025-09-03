import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    standalone: true
})
export class HomeComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {

    }

}