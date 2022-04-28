import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UnicornService } from './unicorn.service';

describe('UnicornService', () => {
  let service: UnicornService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UnicornService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get all unicorns', () => {
    it('should return unicorns from backend', done => {
      service.getAllUnicorns().subscribe(data => {
        expect(data).toEqual([])
        done()
      });
      
      const req = httpController.expectOne({
	      method: 'GET',
	      url: `http://localhost:3000/api/v1/unicorns`,
	    });

	    req.flush([{name: 'jose'}]);
      
    })
  })
});
