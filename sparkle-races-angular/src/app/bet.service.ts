import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  constructor(private http: HttpClient) {
    this.getBetData().subscribe(console.log)
  }

  getBetData() {
    return this.http.get('http://localhost:3000/api/v1/bets/new');
  }

  submitBet(bet: {race_id: number, unicorn_id: number, amount: number}) {
    return this.http.post('http://localhost:3000/api/v1/bets/create', bet)
  }
}
