 // Angular Modules
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 // Components and Services
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UnicornsPageComponent } from './unicorns-page/unicorns-page.component';
import { UnicornDetailComponent } from './unicorn-detail/unicorn-detail.component';
import { NewUnicornPageComponent } from './new-unicorn-page/new-unicorn-page.component';
import { HeaderComponent } from './header/header.component';
 // Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { SignInComponent } from './sign-in/sign-in.component';
import { IsAdminDirective } from './is-admin.directive';

@NgModule({
  declarations: [
    AppComponent,
    UnicornsPageComponent,
    UnicornDetailComponent,
    NewUnicornPageComponent,
    HeaderComponent,
    SignUpComponent,
    SignInComponent,
    IsAdminDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
