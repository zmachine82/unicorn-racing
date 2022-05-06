import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {BehaviorSubject} from 'rxjs';
describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthService);

    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signup', () => {
    it('should call backend with sign up request', done => {
      service.signUp({
        email: 'owen@wow.com',
        password: '1234',
        passwordConfirmation: '1234'
      }).subscribe(data => {
        expect(data).toEqual({
          "success": true,
          "payload": {
              "user": {
                  "id": 16,
                  "email": "22222d@gmail.com",
                  "first_name": null,
                  "last_name": null,
                  "name": " ",
                  "phone": null
              },
              "token": {
                  "id": 4,
                  "created_at": "2022-05-06T00:34:48.505Z",
                  "expiry": "2022-05-13T00:34:48.492Z",
                  "ip": "127.0.0.1",
                  "revocation_date": null,
                  "updated_at": "2022-05-06T00:34:48.505Z",
                  "user_id": 16,
                  "value": "28311cd04fe7f9a5e3d427e10dc2da6adecec3d0"
              }
          }
      })
        done()
      });
      
      const req = httpController.expectOne({
	      method: 'POST',
	      url: `http://localhost:3000/api/v1/users/create`,
	    });

	    req.flush({
        "success": true,
        "payload": {
            "user": {
                "id": 16,
                "email": "22222d@gmail.com",
                "first_name": null,
                "last_name": null,
                "name": " ",
                "phone": null
            },
            "token": {
                "id": 4,
                "created_at": "2022-05-06T00:34:48.505Z",
                "expiry": "2022-05-13T00:34:48.492Z",
                "ip": "127.0.0.1",
                "revocation_date": null,
                "updated_at": "2022-05-06T00:34:48.505Z",
                "user_id": 16,
                "value": "28311cd04fe7f9a5e3d427e10dc2da6adecec3d0"
            }
        }
    });
    });

    it('should save token response with sign up request', done => {
      localStorage.clear();
      service.signUp({
        email: 'owen@wow.com',
        password: '1234',
        passwordConfirmation: '1234'
      }).subscribe(data => {
        expect(data).toEqual({
          "success": true,
          "payload": {
              "user": {
                  "id": 16,
                  "email": "22222d@gmail.com",
                  "first_name": null,
                  "last_name": null,
                  "name": " ",
                  "phone": null
              },
              "token": {
                  "id": 4,
                  "created_at": "2022-05-06T00:34:48.505Z",
                  "expiry": "2022-05-13T00:34:48.492Z",
                  "ip": "127.0.0.1",
                  "revocation_date": null,
                  "updated_at": "2022-05-06T00:34:48.505Z",
                  "user_id": 16,
                  "value": "28311cd04fe7f9a5e3d427e10dc2da6adecec3d0"
              }
          }
      })

      expect(localStorage.getItem('token')).toEqual('28311cd04fe7f9a5e3d427e10dc2da6adecec3d0')
        done()
      });
      
      const req = httpController.expectOne({
	      method: 'POST',
	      url: `http://localhost:3000/api/v1/users/create`,
	    });

	    req.flush({
        "success": true,
        "payload": {
            "user": {
                "id": 16,
                "email": "22222d@gmail.com",
                "first_name": null,
                "last_name": null,
                "name": " ",
                "phone": null
            },
            "token": {
                "id": 4,
                "created_at": "2022-05-06T00:34:48.505Z",
                "expiry": "2022-05-13T00:34:48.492Z",
                "ip": "127.0.0.1",
                "revocation_date": null,
                "updated_at": "2022-05-06T00:34:48.505Z",
                "user_id": 16,
                "value": "28311cd04fe7f9a5e3d427e10dc2da6adecec3d0"
            }
        }
    });
    });
  })

  describe('signin', () => {
    it('should call backend with sign up request', done => {
      service.signIn({
        email: 'owen@wow.com',
        password: '1234'
      }).subscribe(data => {
        expect(data).toEqual({
          "success": true,
          "payload": {
              "user": {
                  "id": 16,
                  "email": "22222d@gmail.com",
                  "first_name": null,
                  "last_name": null,
                  "name": " ",
                  "phone": null
              },
              "token": {
                  "id": 4,
                  "created_at": "2022-05-06T00:34:48.505Z",
                  "expiry": "2022-05-13T00:34:48.492Z",
                  "ip": "127.0.0.1",
                  "revocation_date": null,
                  "updated_at": "2022-05-06T00:34:48.505Z",
                  "user_id": 16,
                  "value": "28311cd04fe7f9a5e3d427e10dc2da6adecec3d0"
              }
          }
      })
        done()
      });
      
      const req = httpController.expectOne({
	      method: 'POST',
	      url: `http://localhost:3000/api/v1/users/login`,
	    });

	    req.flush({
        "success": true,
        "payload": {
            "user": {
                "id": 16,
                "email": "22222d@gmail.com",
                "first_name": null,
                "last_name": null,
                "name": " ",
                "phone": null
            },
            "token": {
                "id": 4,
                "created_at": "2022-05-06T00:34:48.505Z",
                "expiry": "2022-05-13T00:34:48.492Z",
                "ip": "127.0.0.1",
                "revocation_date": null,
                "updated_at": "2022-05-06T00:34:48.505Z",
                "user_id": 16,
                "value": "28311cd04fe7f9a5e3d427e10dc2da6adecec3d0"
            }
        }
    });
    });

    it('should save token response with sign up request', done => {
      localStorage.clear();
      service.signIn({
        email: 'owen@wow.com',
        password: '1234'
      }).subscribe(data => {
        expect(data).toEqual({
          "success": true,
          "payload": {
              "user": {
                  "id": 16,
                  "email": "22222d@gmail.com",
                  "first_name": null,
                  "last_name": null,
                  "name": " ",
                  "phone": null
              },
              "token": {
                  "id": 4,
                  "created_at": "2022-05-06T00:34:48.505Z",
                  "expiry": "2022-05-13T00:34:48.492Z",
                  "ip": "127.0.0.1",
                  "revocation_date": null,
                  "updated_at": "2022-05-06T00:34:48.505Z",
                  "user_id": 16,
                  "value": "28311cd04fe7f9a5e3d427e10dc2da6adecec3d0"
              }
          }
      })

      expect(localStorage.getItem('token')).toEqual('28311cd04fe7f9a5e3d427e10dc2da6adecec3d0')
        done()
      });
      
      const req = httpController.expectOne({
	      method: 'POST',
	      url: `http://localhost:3000/api/v1/users/login`,
	    });

	    req.flush({
        "success": true,
        "payload": {
            "user": {
                "id": 16,
                "email": "22222d@gmail.com",
                "first_name": null,
                "last_name": null,
                "name": " ",
                "phone": null
            },
            "token": {
                "id": 4,
                "created_at": "2022-05-06T00:34:48.505Z",
                "expiry": "2022-05-13T00:34:48.492Z",
                "ip": "127.0.0.1",
                "revocation_date": null,
                "updated_at": "2022-05-06T00:34:48.505Z",
                "user_id": 16,
                "value": "28311cd04fe7f9a5e3d427e10dc2da6adecec3d0"
            }
        }
    });
    });
  })

  describe('isLoggedIn', () => {
    it('should return true when token in local storage', () => {
      localStorage.setItem('token', '1234');
      expect(service.isLoggedIn()).toEqual(true)
    });

    it('should return true when token in local storage', () => {
      localStorage.clear();
      expect(service.isLoggedIn()).toEqual(false)
    });
  })
});
