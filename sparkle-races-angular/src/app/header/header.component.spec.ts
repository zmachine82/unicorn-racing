import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { MockProvider, MockProviders } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { BetService } from '../bet.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatToolbarModule,
        MatIconModule
      ],
      providers: [
        MockProviders(AuthService, BetService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    jest.spyOn(authService, 'getUser$').mockReturnValue(of({balance: 0}));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when user not logged in', () => {

    beforeEach(() => {
      jest.spyOn(authService, 'isLoggedIn').mockReturnValue(false);

      fixture.detectChanges();
    })



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

    
    it('should hide the sign out link', () => {
      expect(fixture.debugElement.query(By.css('.sign-out'))).toBeFalsy()
    })
  })

  describe('when user is logged in', () => {
    let balance = getRandomInt(1, 10000)
  
    beforeEach(() => {
      jest.spyOn(authService, 'isLoggedIn').mockReturnValue(true);
      jest.spyOn(authService, 'getUser$').mockReturnValue(of({balance: balance}));

      fixture.detectChanges();
    });

    it('should hide sign in and sign up links', () => {
      expect(fixture.debugElement.query(By.css('.sign-in'))).toBeFalsy()
      expect(fixture.debugElement.query(By.css('.sign-up'))).toBeFalsy()
    })

    it('should see the sign out link', () => {
      expect(fixture.debugElement.query(By.css('.sign-out')).nativeElement.textContent.trim())
      .toEqual('Sign Out')
    })

    it('should log user out when sign out button clicked', () => {
      const spy = jest.spyOn(TestBed.inject(AuthService), 'signOut')
      fixture.debugElement.query(By.css('.sign-out')).nativeElement.click()
      fixture.detectChanges()

      expect(spy).toHaveBeenCalled();
      
    });

    it('should have link to races', () => {
      expect(fixture.debugElement.query(By.css('.races')).nativeElement.textContent.trim())
      .toEqual('Races')
    })

    it('races link should route to the races component', () => {
      let links = fixture.debugElement.queryAll(By.css('.races'));


      expect(links[0].attributes['routerLink']).toEqual('races');
    });

    it('should display users balance', () => {
      expect(fixture.debugElement.query(By.css('.balance')).nativeElement.textContent).toEqual(balance.toString())
    });

    
  })

  
});

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}