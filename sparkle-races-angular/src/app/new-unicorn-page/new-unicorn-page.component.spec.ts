import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { UnicornService } from '../unicorn.service';

import { NewUnicornPageComponent } from './new-unicorn-page.component';

describe('NewUnicornPageComponent', () => {
  let component: NewUnicornPageComponent;
  let fixture: ComponentFixture<NewUnicornPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUnicornPageComponent ],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        MockProvider(UnicornService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUnicornPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('add unicorn form', () => {
  
    it('should have a name field', () => {
      let nameInput = fixture.debugElement.query(By.css('.name'));

      expect(nameInput.attributes['placeholder']).toEqual('Name')
    });

    describe('submit button', () => {
      it('should say submit', () => {
        let submitButton = fixture.debugElement.query(By.css('button'));

        expect(submitButton.nativeElement.textContent.trim()).toEqual('Submit')
      });

      it('should submit data to backend when clicked', () => {

        let nameInput = fixture.debugElement.query(By.css('.name'));
        nameInput.nativeElement.value = 'NewName'
        nameInput.nativeElement.dispatchEvent(new Event('input'));


        let spy = jest.spyOn(TestBed.inject(UnicornService), 'addUnicorn').mockReturnValue(of())
        let submitButton = fixture.debugElement.query(By.css('button'));
        submitButton.nativeElement.click();

        fixture.detectChanges();

        expect(spy).toHaveBeenCalledWith({name: 'NewName'})
      });

      it('should redirect user after submit', () => {
      
        let spy = jest.spyOn(TestBed.inject(Router), 'navigate').mockReturnValue(Promise.resolve(true))
        jest.spyOn(TestBed.inject(UnicornService), 'addUnicorn').mockReturnValue(of({}));
        let submitButton = fixture.debugElement.query(By.css('button'));
        submitButton.nativeElement.click();
  
        fixture.detectChanges();
      
        expect(spy).toHaveBeenCalledWith(['/'])
      });
      
      it('should display error if backend returns error', () => {

        jest.spyOn(TestBed.inject(UnicornService), 'addUnicorn').mockReturnValue(throwError({error: {name: ["is too short (minimum is 3 characters)"]}}))
        let submitButton = fixture.debugElement.query(By.css('button'));
        submitButton.nativeElement.click();

        fixture.detectChanges();

        let displayedError = fixture.debugElement.query(By.css('p'));
        expect(displayedError.nativeElement.textContent).toEqual("Name is too short (minimum is 3 characters).")
      })

      

    })
    
  })
  describe('back to list link', () => {
    let navLink: any;
    beforeEach(() => {
      navLink = fixture.debugElement.query(By.css('.cancel'));

    })

    it('should say "Back to List"', () => {
    expect(navLink.nativeElement.textContent).toEqual("Back to List");
    })

    it('should navigate to unicorn list', () => {

      let spy = jest.spyOn(TestBed.inject(Router), 'navigate').mockReturnValue(Promise.resolve(true))

      navLink.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(['/']);
      
      
    })

  })

});
