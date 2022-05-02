import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { UnicornService } from '../unicorn.service';

import { UnicornDetailComponent } from './unicorn-detail.component';

describe('UnicornDetailComponent', () => {
  let component: UnicornDetailComponent;
  let fixture: ComponentFixture<UnicornDetailComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnicornDetailComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        MockProvider(UnicornService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnicornDetailComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.params = of({id: '2'})
    jest.spyOn(TestBed.inject(UnicornService), 'getById').mockReturnValue(of({id: 2, name: 'Steve'}))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unicorn detail data', () => {
    it('should display the unicorns name', () => {
      
      const name = fixture.debugElement.query(By.css('h2'))
      expect(name.nativeElement.textContent.trim()).toEqual('Steve')
      expect(TestBed.inject(UnicornService).getById).toHaveBeenCalledWith('2');
    });
  })

  // mess after this point


  describe('destroy button', () => {
    let destroyButton: any;
    beforeEach(() => {
      destroyButton = fixture.debugElement.query(By.css('button'))
    })
    it('should say Annihilate Adorable Unicorn', () => {

      expect(destroyButton.nativeElement.textContent.trim()).toEqual('Annihilate Adorable Unicorn')
    });

    it('should destroy data to backend when clicked', () => {

      let spy = jest.spyOn(TestBed.inject(UnicornService), 'destroyById').mockReturnValue(of())
      destroyButton.nativeElement.click();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(2)
    });

    it('should redirect user after delete', () => {
      let spy = jest.spyOn(TestBed.inject(Router), 'navigate').mockReturnValue(Promise.resolve(true))
      jest.spyOn(TestBed.inject(UnicornService), 'destroyById').mockReturnValue(of({}))
      destroyButton.nativeElement.click();

      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(['/'])
    });
  })


});
