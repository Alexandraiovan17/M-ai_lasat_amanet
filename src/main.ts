import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet, RouterLink, provideRouter, Routes } from '@angular/router';
import { ConverterComponent } from './app/components/converter';
import { RatesComponent } from './app/components/rates';
import { AboutComponent } from './app/components/about';

const routes: Routes = [
  { path: '', component: ConverterComponent },
  { path: 'rates', component: RatesComponent },
  {path: 'about', component: AboutComponent},
  { path: '**', redirectTo: '' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: ` <div class="app-container">
  <nav>
    <a routerLink="/" routerLinkActive="active">
      Currency Converter
    </a>
    <a routerLink="/rates" routerLinkActive="active">
      Exchange Rates 
    </a>
    <a routerLink="/about" routerLinkActive="active">
      About 
    </a>
  </nav>
  <router-outlet></router-outlet>
</div>
`})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});