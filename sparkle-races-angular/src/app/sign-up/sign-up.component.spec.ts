import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

import { SignUpComponent } from './sign-up.component';
import { MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        NoopAnimationsModule,
        MatCardModule,
        RouterTestingModule
      ],
      providers: [
        MockProvider(AuthService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should be able to sumbmit a valid user sign up', () => {
      const spy = jest.spyOn(TestBed.inject(AuthService), 'signUp').mockReturnValue(of())
      
      const usernameField = fixture.debugElement.query(By.css('#email'))
      const passwordField = fixture.debugElement.query(By.css('#password'))
      const passwordConfirmationField = fixture.debugElement.query(By.css('#passwordConfirmation'))

      usernameField.nativeElement.value = 'owenwilson123@wow.com'
      usernameField.nativeElement.dispatchEvent(new Event('input'))
      passwordField.nativeElement.value = 'wowAPAssword!'
      passwordField.nativeElement.dispatchEvent(new Event('input'))

      passwordConfirmationField.nativeElement.value = 'wowAPAssword!'
      passwordConfirmationField.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('#submitButton'))
      submitButton.nativeElement.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith({
        email: 'owenwilson123@wow.com',
        password: 'wowAPAssword!',
        passwordConfirmation: 'wowAPAssword!'
      })
      

    });

    it('should not sumbmit sign up when passwords do not match', () => {
      const spy = jest.spyOn(TestBed.inject(AuthService), 'signUp').mockReturnValue(of())
      
      const usernameField = fixture.debugElement.query(By.css('#email'))
      const passwordField = fixture.debugElement.query(By.css('#password'))
      const passwordConfirmationField = fixture.debugElement.query(By.css('#passwordConfirmation'))

      usernameField.nativeElement.value = 'owenwilson123@wow.com'
      usernameField.nativeElement.dispatchEvent(new Event('input'))
      passwordField.nativeElement.value = 'wowAPAssword!'
      passwordField.nativeElement.dispatchEvent(new Event('input'))

      passwordConfirmationField.nativeElement.value = 'wowAPAssw!'
      passwordConfirmationField.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('#submitButton'))
      submitButton.nativeElement.click();
      fixture.detectChanges();
      
      expect(submitButton.attributes['ng-reflect-disabled']).toEqual('true')
      expect(spy).not.toHaveBeenCalled();
      

    });

    it('should not sumbmit sign up when email is empty', () => {
      const spy = jest.spyOn(TestBed.inject(AuthService), 'signUp').mockReturnValue(of())
      
      const usernameField = fixture.debugElement.query(By.css('#email'))
      const passwordField = fixture.debugElement.query(By.css('#password'))
      const passwordConfirmationField = fixture.debugElement.query(By.css('#passwordConfirmation'))

      usernameField.nativeElement.value = ''
      usernameField.nativeElement.dispatchEvent(new Event('input'))
      passwordField.nativeElement.value = 'wowAPAssword!'
      passwordField.nativeElement.dispatchEvent(new Event('input'))

      passwordConfirmationField.nativeElement.value = 'wowAPAssword!'
      passwordConfirmationField.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('#submitButton'))
      submitButton.nativeElement.click();
      fixture.detectChanges();
      
      expect(submitButton.attributes['ng-reflect-disabled']).toEqual('true')
      expect(spy).not.toHaveBeenCalled();
      

    });

    it('should not sumbmit sign up when password is empty', () => {
      const spy = jest.spyOn(TestBed.inject(AuthService), 'signUp').mockReturnValue(of())
      
      const usernameField = fixture.debugElement.query(By.css('#email'))
      const passwordField = fixture.debugElement.query(By.css('#password'))
      const passwordConfirmationField = fixture.debugElement.query(By.css('#passwordConfirmation'))

      usernameField.nativeElement.value = 'owenWilson123@wow.com'
      usernameField.nativeElement.dispatchEvent(new Event('input'))
      passwordField.nativeElement.value = ''
      passwordField.nativeElement.dispatchEvent(new Event('input'))

      passwordConfirmationField.nativeElement.value = ''
      passwordConfirmationField.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('#submitButton'))
      submitButton.nativeElement.click();
      fixture.detectChanges();
      
      expect(submitButton.attributes['ng-reflect-disabled']).toEqual('true')
      expect(spy).not.toHaveBeenCalled();
      

    });
  })
});
