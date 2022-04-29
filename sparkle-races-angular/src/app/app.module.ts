import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnicornsPageComponent } from './unicorns-page/unicorns-page.component';
import { UnicornDetailComponent } from './unicorn-detail/unicorn-detail.component';
import { NewUnicornPageComponent } from './new-unicorn-page/new-unicorn-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UnicornsPageComponent,
    UnicornDetailComponent,
    NewUnicornPageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
