import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers:[],
  template: `
    <div class="container">
      <h1>Current Exchange Rates</h1>
      <p>Base currency: USD</p>
      <div class="rates-list">
        <div *ngFor="let rate of rates | keyvalue" class="rate-item">
          <strong>{{rate.key}}:</strong> {{rate.value}}
        </div>
      </div>
    </div>
  `
})


export class RatesComponent implements OnInit{
  constructor(private httpClient: HttpClient) {}
  rates: any;

  ngOnInit(): void {
    console.log("ngOnit is call")
    this.httpClient.get("https://v6.exchangerate-api.com/v6/16920bd1391942c22c16cc46/latest/USD").subscribe((res: any) => {
      console.log(res.conversion_rates);
      this.rates = res.conversion_rates;
    })
  }
}