import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUnicornPageComponent } from './new-unicorn-page/new-unicorn-page.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
