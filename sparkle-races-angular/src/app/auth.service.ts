import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  
  private user: Subject<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new Subject<any>()
  
   }

  // Auth Functions \\

  signUp(signUpRequest: any){
    return this.http.post('http://localhost:3000/api/v1/users/create', signUpRequest)
    .pipe( tap(this.onLogIn.bind(this)))
  }

  signIn(signInRequest: any) {
    return this.http.post('http://localhost:3000/api/v1/users/login', signInRequest)
    .pipe( tap(this.onLogIn.bind(this)))
  }

  onLogIn(response: any){
    this.user.next(response.payload.user)
    localStorage.setItem( 'token', response.payload.token.value)
  }


  // User Functions \\

  isLoggedIn() {
   return localStorage.getItem('token') ? true : false;
  }

  signOut() {
    localStorage.removeItem('token');
    this.user.next(null)
    this.router.navigate(['/'])
  }

  isAdmin(): boolean {
    return this.isLoggedIn();
  }

  isAdmin$() {
    return this.user.asObservable()
  }
}
