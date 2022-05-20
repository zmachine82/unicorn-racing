import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BetService } from '../bet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user:any;

  constructor(private auth: AuthService, private betService: BetService) { }

  ngOnInit(): void {
    this.auth.getUser$().subscribe(user => this.user = user)
  }

  isLoggedIn() {
    return this.auth.isLoggedIn()
  }

  signOut() {
    this.auth.signOut();
  }

}
