import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    template: `
        <h2>Advanced Router Demo</h2>
        <div>
            This app is used to illustrates the use of advanced Routing features:
            <ul>
                <li>Auxiliary routes (ComposeMessage component displayed in 'side' router-outlet)</li>
                <li>Router trace for diagnostics</li>
                <li>Route Guard (Secure access to Admin component)</li>
                <li>Route Resolver (pre-fetch product details before navigating)</li>
                <li>Navigation Transitions</li>
                <li>Lazy loading (products routes)</li>
                <li>Preloading (products routes)</li>
                <li>Router events</li>
            </ul>
        </div>
    `
})
export class Home {
    constructor() { }

}