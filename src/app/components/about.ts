import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="container">
      <h1>About Currency Converter</h1>
      <p>This is a simple currency converter application that helps you convert between major currencies.</p>
      <p>Current supported currencies:</p>
      <ul>
        <li>USD - United States Dollar</li>
        <li>EUR - Euro</li>
        <li>GBP - British Pound</li>
      </ul>
    </div>
  `
})
export class AboutComponent {}