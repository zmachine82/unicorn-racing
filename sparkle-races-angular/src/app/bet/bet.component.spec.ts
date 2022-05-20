import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockProvider, MockProviders } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { BetService } from '../bet.service';

import { BetComponent } from './bet.component';

describe('BetComponent', () => {
  let component: BetComponent;
  let fixture: ComponentFixture<BetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetComponent],
      providers: [MockProviders(BetService, AuthService)],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        FormsModule,
        MatCardModule,
        MatInputModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetComponent);
    component = fixture.componentInstance;

    jest.spyOn(TestBed.inject(BetService), 'getBetData').mockReturnValue(of({
      unicorns: [{
        created_at: "2022-05-13T00:30:54.458Z",
        id: 1,
        name: "Steve",
        updated_at: "2022-05-13T00:30:54.458Z",
      }], races: [{
        created_at: "2022-05-13T00:30:51.017Z",
        id: 1,
        name: "wow a race",
        start_ts: "2022-05-18T12:00:00.000Z",
        updated_at: "2022-05-13T00:30:51.017Z"
      }]
    }))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('bet form', () => {
  
    describe('race dropdown', () => {
      it('should have options of available races', () => {
        const raceSelect = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement.click()
        fixture.detectChanges()
        expect(fixture.debugElement.query(By.css('mat-option')).nativeElement.textContent.trim()).toEqual('wow a race')
      });
    })

    describe('unicorn dropdown', () => {
      it('should have options of available unicorns', () => {
        const raceSelect = fixture.debugElement.queryAll(By.css('.mat-select-trigger'))[1].nativeElement.click()
        fixture.detectChanges()
        expect(fixture.debugElement.query(By.css('mat-option')).nativeElement.textContent.trim()).toEqual('Steve')
      });
    })

    describe('bet amount', () => {
      it('should have a place to bet unicoins', () => {
        const unicoinInput = fixture.debugElement.queryAll(By.css('mat-label'))[2];
        // unicoinInput.nativeElement.value = '5'
        // unicoinInput.nativeElement.dispatchEvent(new Event('input'))
        fixture.detectChanges()
        expect(unicoinInput.nativeElement.textContent).toEqual('How Many UniKoins')
      });
    })

    it('user should be able to bet, thats the point', () => {
      const spy = jest.spyOn(TestBed.inject(BetService), 'submitBet').mockReturnValue(of({}))
      console.log("trying")
      const raceSelect = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement.click()
      fixture.detectChanges()
      fixture.debugElement.query(By.css('mat-option')).nativeElement.click()

      const unicornSelect = fixture.debugElement.queryAll(By.css('.mat-select-trigger'))[1].nativeElement.click()
      fixture.detectChanges()
      fixture.debugElement.query(By.css('mat-option')).nativeElement.click()
      const unicoinInput = fixture.debugElement.query(By.css('input'))
      unicoinInput.nativeElement.value = 5
      unicoinInput.nativeElement.dispatchEvent(new Event('input'))

      const submit = fixture.debugElement.query(By.css('button')).nativeElement.click()

        expect(spy).toHaveBeenCalledWith({race_id: 1, unicorn_id: 1, amount: 5 })
    })
  })
});
