import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
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
          <option *ngFor="let currency of ['USD']" [value]="currency">
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

      <div class="result" *ngIf="result">
        <h3>Exchange Result:</h3>
        <p>{{amount}} {{fromCurrency}} = {{result}} {{toCurrency}}</p>
      </div>
    </div>
  `
})
export class ConverterComponent implements OnInit {
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

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get("https://v6.exchangerate-api.com/v6/16920bd1391942c22c16cc46/pair/USD/EUR").subscribe((res: any) => {
      console.log(res.conversion_rate);
      this.rates['EUR'] = res.conversion_rate;
    });
    this.httpClient.get("https://v6.exchangerate-api.com/v6/16920bd1391942c22c16cc46/pair/USD/GBP").subscribe((res: any) => {
      console.log(res.conversion_rate);
      this.rates['GBP'] = res.conversion_rate;
    })
    this.httpClient.get("https://v6.exchangerate-api.com/v6/16920bd1391942c22c16cc46/pair/USD/JPY").subscribe((res: any) => {
      console.log(res.conversion_rate);
      this.rates['JPY'] = res.conversion_rate;
    })
    this.httpClient.get("https://v6.exchangerate-api.com/v6/16920bd1391942c22c16cc46/pair/USD/AUD").subscribe((res: any) => {
      console.log(res.conversion_rate);
      this.rates['AUD'] = res.conversion_rate;
    })
    this.httpClient.get("https://v6.exchangerate-api.com/v6/16920bd1391942c22c16cc46/pair/USD/CAD").subscribe((res: any) => {
      console.log(res.conversion_rate);
      this.rates['CAD'] = res.conversion_rate;
    })
  }


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