import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MatToolbarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('title', () => {
    it('should display title of Sparkle Races', () => {
      const toolbar = fixture.debugElement.query(By.css('mat-toolbar'))
      expect(toolbar.children[0].nativeElement.textContent.trim()).toEqual('Sparkle Races')
    });

    it('should route to home page', () => {
      const toolbar = fixture.debugElement.query(By.css('mat-toolbar'))
      expect(toolbar.children[0].attributes['routerLink']).toEqual('/')
    });
  })

  describe('sign up link', () => {
    it('should exist', () => {
      expect(fixture.debugElement.query(By.css('.sign-up')).nativeElement.textContent.trim())
          .toEqual('Sign Up')
    });

    it('should route to the sign up component', () => {
      let links = fixture.debugElement.queryAll(By.css('.sign-up'));
  
    
      expect(links[0].attributes['routerLink']).toEqual('sign-up');
    });
  })
  
  describe('sign in link', () => {
    it('should exist', () => {
      expect(fixture.debugElement.query(By.css('.sign-in')).nativeElement.textContent.trim())
          .toEqual('Sign In')
    });

    it('should route to the sign in component', () => {
      let links = fixture.debugElement.queryAll(By.css('.sign-in'));
  
    
      expect(links[0].attributes['routerLink']).toEqual('sign-in');
    });
  })


});
