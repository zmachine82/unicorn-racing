import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from "ng-mocks";
import { of } from 'rxjs';
import { routes } from '../app-routing.module';
import { UnicornService } from '../unicorn.service';
import { UnicornsPageComponent } from './unicorns-page.component';


describe('UnicornsPageComponent', () => {
  let component: UnicornsPageComponent;
  let fixture: ComponentFixture<UnicornsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnicornsPageComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        MockProvider(UnicornService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnicornsPageComponent);
    component = fixture.componentInstance;

    jest.spyOn(TestBed.inject(UnicornService), 'getAllUnicorns').mockReturnValue(of([{name: 'steve'}]))

  
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('unicorn list', () => {

    beforeEach(() => {
      jest.spyOn(TestBed.inject(UnicornService), 'getAllUnicorns').mockReturnValue(of([
        {id: 1, name: 'steve'}, 
        {id: 2, name: 'not steve'}
      ]))
      fixture.detectChanges();
    })
  
    
    it('should display number of unicorns',  () => {
      
      let title = fixture.debugElement.query(By.css('h1'));
      
      expect(title.nativeElement.textContent.trim()).toEqual('Unicorn Racers (2)')
    });

    it('should display name of each unicorn', () => {
     
      let links = fixture.debugElement.queryAll(By.css('a'));
      expect(links.length).toEqual(2);
      expect(links[0].nativeElement.textContent.trim()).toEqual('steve')
      expect(links[1].nativeElement.textContent.trim()).toEqual('not steve')
    });

    it('should route to unicorn detail page when clicked', () => {
      
      let links = fixture.debugElement.queryAll(By.css('a'));
    
      expect(links[0].attributes['ng-reflect-router-link']).toEqual('1');
      expect(links[1].attributes['ng-reflect-router-link']).toEqual('2');

    });


  
  });

  describe('new unicorn link', () => {
    it('should route to new unicorn page', () => {
      let link = fixture.debugElement.query(By.css('.new-unicorn-link'));
    
      expect(link.nativeElement.textContent.trim()).toEqual('Add A Unicorn');
      expect(link.attributes['ng-reflect-router-link']).toEqual('new');
    });
  })
})


