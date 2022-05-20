import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetComponent } from './bet/bet.component';
import { NewUnicornPageComponent } from './new-unicorn-page/new-unicorn-page.component';
import { RacesComponent } from './races/races.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UnicornDetailComponent } from './unicorn-detail/unicorn-detail.component';
import { UnicornsPageComponent } from './unicorns-page/unicorns-page.component';

export const routes: Routes = [
  {
    path: 'unicorns',
    component: UnicornsPageComponent
  },
  {
    path: '',
    redirectTo: 'unicorns',
    pathMatch: 'full'
  },
  {
    component: NewUnicornPageComponent,
    path: 'unicorns/new',
  },
  {
    component: UnicornDetailComponent,
    path: 'unicorns/:id',
  },
  {
    component: SignUpComponent,
    path: 'sign-up',
  },
  {
    component: SignInComponent,
    path: 'sign-in',
  },
  {
    component: RacesComponent,
    path: 'races',
  },
  {
    component: BetComponent,
    path: 'bets'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
