import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { RaceService } from '../race.service';

import { RacesComponent } from './races.component';

describe('RacesComponent', () => {
  let component: RacesComponent;
  let fixture: ComponentFixture<RacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RacesComponent],
      providers: [MockProvider(RaceService)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('race list', () => {
    beforeEach(() => {
      let twoHoursAgo = new Date();
      twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
      jest.spyOn(TestBed.inject(RaceService), 'getRaces').mockReturnValue(
        of([
          {
            id: 1,
            name: 'race1',
            startTime: new Date('May 10, 2022 12:00:00'),
            result: {},
          },
          {
            id: 2,
            name: 'race2',
            startTime: twoHoursAgo,
            result: null,
          },
        ])
      );

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

    it('should route to race detail page when clicked', () => {
      let links = fixture.debugElement.queryAll(By.css('a'));

      expect(links[0].attributes['ng-reflect-router-link']).toEqual('1');
      expect(links[1].attributes['ng-reflect-router-link']).toEqual('2');
    });
  });

  describe('new race link', () => {
    it('should not be visibile if user is not logged in and not admin', () => {
      jest.spyOn(TestBed.inject(AuthService), 'isAdmin').mockReturnValue(false);
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.new-race-link'))).toBeFalsy();
    });

    it('should route to new race page', () => {
      jest.spyOn(TestBed.inject(AuthService), 'isAdmin').mockReturnValue(true);
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

    it('should be labeled "Finish All Races"', () => {
      jest.spyOn(TestBed.inject(AuthService), 'isAdmin').mockReturnValue(true);
      fixture.detectChanges();
      let link = fixture.debugElement.query(By.css('.finish-races-link'));

      expect(link.nativeElement.textContent.trim()).toEqual('Finish All Races');
    });

    it.todo('should finish all races and reflect that on the page');
  });
});
