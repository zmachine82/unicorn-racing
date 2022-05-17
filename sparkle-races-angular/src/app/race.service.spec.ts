import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Race } from './models/race';

import { RaceService } from './race.service';

let service: RaceService;
let httpController: HttpTestingController;
const now = new Date()

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  });
  service = TestBed.inject(RaceService);
  httpController = TestBed.inject(HttpTestingController);
  jest.useFakeTimers().setSystemTime(now)
});

afterEach(() => {
  httpController.verify()
  jest.useRealTimers()
})

it('should be created', () => {
  expect(service).toBeTruthy();
});

describe('get all races', () => {
  it('should return races from backend', done => {
    service.getRaces().subscribe(data => {
      expect(data).toEqual([new Race({id: 1, name: 'Fantasy 500', start_ts: now, race_result:  {race_id: 1} })])
      expect(data[0].isFinished).toEqual(true)
      done()
    });
    
    const req = httpController.expectOne({
      method: 'GET',
      url: `http://localhost:3000/api/v1/races`,
    });

    req.flush([{id: 1, name: 'Fantasy 500', start_ts: now, race_result: {race_id: 1} }]);
    
  })
});