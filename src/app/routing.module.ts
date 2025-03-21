import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPageComponent } from './pages/my-page/my-page.component';

const routes: Routes = [
  { path: 'my-page', component: MyPageComponent }, // Define the route
  { path: '**', redirectTo: 'my-page' } // Optional: Redirect unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }