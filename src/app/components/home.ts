import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <h1>Currency Exchange Calculator</h1>
      
      <div class="form-group">
        <label for="amount">Amount</label>
        <input 
          type="number" 
          id="amount" 
          class="form-control" 
          [(ngModel)]="amount" 
          (ngModelChange)="calculateExchange()"
        >
      </div>

      <div class="form-group">
        <label for="fromCurrency">From Currency</label>
        <select 
          id="fromCurrency" 
          class="form-control" 
          [(ngModel)]="fromCurrency"
          (ngModelChange)="calculateExchange()"
        >
          <option *ngFor="let currency of currencies" [value]="currency">
            {{currency}}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="toCurrency">To Currency</label>
        <select 
          id="toCurrency" 
          class="form-control" 
          [(ngModel)]="toCurrency"
          (ngModelChange)="calculateExchange()"
        >
          <option *ngFor="let currency of currencies" [value]="currency">
            {{currency}}
          </option>
        </select>
      </div>

      <div class="result" *ngIf="result !== null">
        <h3>Exchange Result:</h3>
        <p>{{amount}} {{fromCurrency}} = {{result}} {{toCurrency}}</p>
        <p class="rate-info">Rate: 1 {{fromCurrency}} = {{getExchangeRate()}} {{toCurrency}}</p>
      </div>
    </div>
  `,
  styles: [`
    .rate-info {
      font-size: 0.9em;
      color: #666;
      margin-top: 8px;
    }
  `]
})
export class ConverterComponent {
  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  result: number | null = null;
  
  rates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    AUD: 1.35,
    CAD: 1.25
  };

  currencies = Object.keys(this.rates);

  calculateExchange() {
    if (this.amount && this.fromCurrency && this.toCurrency) {
      const fromRate = this.rates[this.fromCurrency];
      const toRate = this.rates[this.toCurrency];
      const conversionRate = toRate / fromRate;
      this.result = +(this.amount * conversionRate).toFixed(2);
    } else {
      this.result = null;
    }
  }

  getExchangeRate(): string {
    const fromRate = this.rates[this.fromCurrency];
    const toRate = this.rates[this.toCurrency];
    return (toRate / fromRate).toFixed(4);
  }
}