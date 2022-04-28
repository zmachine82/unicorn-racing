import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnicornsPageComponent } from './unicorns-page/unicorns-page.component';

const routes: Routes = [
  {
    path: 'unicorns',
    component: UnicornsPageComponent
  },
  {
    path: '',
    redirectTo: 'unicorns',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
