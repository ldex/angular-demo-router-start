import { Component, HostBinding } from '@angular/core';
import { Router }                 from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: './compose-message.component.html',
    styleUrl: './compose-message.component.css',
    imports: [FormsModule]
})
export class ComposeMessageComponent {

  details: string;
  sending = false;
  message: string = '';

  constructor(private router: Router) {}

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.clearSideOutlet();
    }, 1000);
  }

  cancel() {
    this.clearSideOutlet();
  }

  clearSideOutlet() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { side: null }}]);
  }
}
