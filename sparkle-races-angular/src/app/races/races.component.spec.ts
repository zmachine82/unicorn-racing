import { TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider, MockProviders } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { IsAdminDirective } from '../is-admin.directive';
import { Race } from '../models/race';
import { RaceService } from '../race.service';

import { RacesComponent } from './races.component';

describe('RacesComponent', () => {
  let component: RacesComponent;
  let fixture: ComponentFixture<RacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RacesComponent, IsAdminDirective],
      providers: [MockProviders(RaceService, AuthService)],
      imports: [RouterTestingModule, MatCardModule, MatButtonModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacesComponent);
    component = fixture.componentInstance;

    let now = new Date();
    let twoHoursInTheFuture = new Date(now);
    twoHoursInTheFuture.setHours(now.getHours() + 2);
    jest.spyOn(TestBed.inject(AuthService), 'isAdmin$').mockReturnValue(of(false));
    console.log(now.toISOString())
    console.log(twoHoursInTheFuture.toISOString())
    jest.useFakeTimers().setSystemTime(now)

    jest.spyOn(TestBed.inject(RaceService), 'getRaces').mockReturnValue(
      of([
        new Race({
          id: 1,
          name: 'race1',
          start_ts: new Date('May 10, 2022 12:00:00'),
          race_result: {},
        }),
        new Race({
          id: 2,
          name: 'race2',
          start_ts: twoHoursInTheFuture,
          race_result: null,
        }),
      ])
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy();
  });

  describe('race list', () => {
    beforeEach(() => {


      fixture.detectChanges();
    });

    it('should display a title of "Unicorn Races"', () => {
      let title = fixture.debugElement.query(By.css('h1'));

      expect(title.nativeElement.textContent.trim()).toEqual('Unicorn Races');
    });

    it('should display "name: Finished" if race is completed', () => {
      let links = fixture.debugElement.queryAll(By.css('a'));
      expect(links[0].nativeElement.textContent.trim()).toEqual(
        'race1: Finished'
      );
    });

    it('should display "name: xx:xx:xx" if race is unfinished', () => {
      let links = fixture.debugElement.queryAll(By.css('a'));
      expect(links[1].nativeElement.textContent.trim()).toEqual(
        'race2: 02:00:00'
      );
    });

    xit('should route to race detail page when clicked', () => {
      let links = fixture.debugElement.queryAll(By.css('a'));

      expect(links[0].attributes['ng-reflect-router-link']).toEqual('1');
      expect(links[1].attributes['ng-reflect-router-link']).toEqual('2');
    });
  });

  describe('new race link', () => {
    it('should not be visible if user is not logged in and not admin', () => {
      jest.spyOn(TestBed.inject(AuthService), 'isAdmin').mockReturnValue(false);
      jest.spyOn(TestBed.inject(AuthService), 'isAdmin$').mockReturnValue(of(false));
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.new-race-link'))).toBeFalsy();
    });

    it('should route to new race page', () => {
      jest.spyOn(TestBed.inject(AuthService), 'isAdmin').mockReturnValue(true);
      jest.spyOn(TestBed.inject(AuthService), 'isAdmin$').mockReturnValue(of(true));
      fixture.detectChanges();
      let link = fixture.debugElement.query(By.css('.new-race-link'));

      expect(link.nativeElement.textContent.trim()).toEqual('Create a Race');
      expect(link.attributes['ng-reflect-router-link']).toEqual('new');
    });
  });

  describe('finish races link', () => {
    it('should not be visibile if user is not logged in and not admin', () => {
      jest.spyOn(TestBed.inject(AuthService), 'isAdmin').mockReturnValue(false);
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('.finish-races-link'))
      ).toBeFalsy();
    });

  });
});
