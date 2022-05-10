import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers: [
        MockProvider(AuthService)
      ],
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        NoopAnimationsModule,
        MatCardModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should be able to sumbmit a valid user sign up', () => {
      const spy = jest.spyOn(TestBed.inject(AuthService), 'signIn').mockReturnValue(of())
      
      const usernameField = fixture.debugElement.query(By.css('#email'))
      const passwordField = fixture.debugElement.query(By.css('#password'))

      usernameField.nativeElement.value = 'owenwilson123@wow.com'
      usernameField.nativeElement.dispatchEvent(new Event('input'))
      passwordField.nativeElement.value = 'wowAPAssword!'
      passwordField.nativeElement.dispatchEvent(new Event('input'))

      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('#submitButton'))
      submitButton.nativeElement.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith({
        email: 'owenwilson123@wow.com',
        password: 'wowAPAssword!'
      })
      

    });

    it('should redirect user back to home page after signin', () => {
      jest.spyOn(TestBed.inject(AuthService), 'signIn').mockReturnValue(of({}))
      const spy = jest.spyOn(TestBed.inject(Router), 'navigate').mockReturnValue(Promise.resolve(true))
      
      const usernameField = fixture.debugElement.query(By.css('#email'))
      const passwordField = fixture.debugElement.query(By.css('#password'))

      usernameField.nativeElement.value = 'owenwilson123@wow.com'
      usernameField.nativeElement.dispatchEvent(new Event('input'))
      passwordField.nativeElement.value = 'wowAPAssword!'
      passwordField.nativeElement.dispatchEvent(new Event('input'))

      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('#submitButton'))
      submitButton.nativeElement.click();
      
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(['/'])
    });



    it('should not sumbmit sign up when email is empty', () => {
      const spy = jest.spyOn(TestBed.inject(AuthService), 'signIn').mockReturnValue(of())
      
      const usernameField = fixture.debugElement.query(By.css('#email'))
      const passwordField = fixture.debugElement.query(By.css('#password'))

      usernameField.nativeElement.value = ''
      usernameField.nativeElement.dispatchEvent(new Event('input'))
      passwordField.nativeElement.value = 'wowAPAssword!'
      passwordField.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('#submitButton'))
      submitButton.nativeElement.click();
      fixture.detectChanges();
      
      expect(submitButton.attributes['ng-reflect-disabled']).toEqual('true')
      expect(spy).not.toHaveBeenCalled();
      

    });

    it('should not sumbmit sign up when password is empty', () => {
      const spy = jest.spyOn(TestBed.inject(AuthService), 'signIn').mockReturnValue(of())
      
      const usernameField = fixture.debugElement.query(By.css('#email'))
      const passwordField = fixture.debugElement.query(By.css('#password'))

      usernameField.nativeElement.value = 'owenWilson123@wow.com'
      usernameField.nativeElement.dispatchEvent(new Event('input'))
      passwordField.nativeElement.value = ''
      passwordField.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('#submitButton'))
      submitButton.nativeElement.click();
      fixture.detectChanges();
      
      expect(submitButton.attributes['ng-reflect-disabled']).toEqual('true')
      expect(spy).not.toHaveBeenCalled();
      

    });
  })
});
