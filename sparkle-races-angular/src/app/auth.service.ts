import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(signUpRequest: any){
    return this.http.post('http://localhost:3000/api/v1/users/create', signUpRequest)
  }
}
