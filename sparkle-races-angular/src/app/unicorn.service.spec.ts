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
  });

  describe('add unicorn', () => {
    it('should return data from backend', done => {
      service.addUnicorn({name: 'Unimule'}).subscribe(data => {
        expect(data).toEqual({id: 1, name: 'Unimule'})
        done()
      });
      
      const req = httpController.expectOne({
	      method: 'POST',
	      url: `http://localhost:3000/api/v1/unicorns`,
	    });

	    req.flush({id: 1, name: 'Unimule'});
    });
  })

  describe('getById', () => {
    it('should return data from backend', done => {
      service.getById(3).subscribe(data => {
        expect(data).toEqual({id: 3, name: 'Unimule'})
        done()
      });
      
      const req = httpController.expectOne({
	      method: 'GET',
	      url: `http://localhost:3000/api/v1/unicorns/3`,
	    });

	    req.flush({id: 3, name: 'Unimule'});
    });
  })
  
  describe('destroyById', () => {
    it('should delete data from backend', done => {
      service.destroyById(3).subscribe(data => {
        done()
      });
      
      const req = httpController.expectOne({
	      method: 'DELETE',
	      url: `http://localhost:3000/api/v1/unicorns/3`,
	    });

	    req.flush(null);
    });
  })


  
});
