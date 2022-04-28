import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { UnicornService } from '../unicorn.service';

import { UnicornsPageComponent } from './unicorns-page.component';

describe('UnicornsPageComponent', () => {
  let component: UnicornsPageComponent;
  let fixture: ComponentFixture<UnicornsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnicornsPageComponent ],
      providers: [
        {
          provide: UnicornService, useValue: {getAllUnicorns: () => of([{namez: 'unicorn'}, {name: 'njkasdfgnokasd'}])}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnicornsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have a title of Unicorn Racers', () => {
  //   let title = fixture.debugElement.query(By.css('h1'));

  
    
  //   expect(title.nativeElement.textContent.trim()).toEqual('Unicorn Racers')
  // });

  it('should display number of unicorns',  () => {
    
    let title = fixture.debugElement.query(By.css('h1'));
      
    expect(title.nativeElement.textContent.trim()).toEqual('Unicorn Racers (2)')
  })
});
