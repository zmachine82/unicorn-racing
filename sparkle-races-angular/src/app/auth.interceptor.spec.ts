import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptor,
      MockProvider(AuthService),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add auth header to request', () => {
    jest.spyOn(TestBed.inject(AuthService), 'getToken').mockReturnValue('aToken')

    const httpController = TestBed.inject(HttpTestingController);
    TestBed.inject(HttpClient).get('/test').subscribe()

    const req = httpController.expectOne({
      method: 'GET',
      url: `/test`,
    });

    req.flush({})

    expect(req.request.headers.has('Authorization'))
    expect(req.request.headers.get('Authorization')).toEqual('Bearer aToken')

    httpController.verify()
  });
});