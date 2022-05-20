import { Component, OnInit } from '@angular/core';
import { BetService } from '../bet.service';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit {

  betData: any;
  
  constructor(private betService: BetService) { 

  }

  ngOnInit(): void {
    this.betService.getBetData().subscribe(betData => this.betData = betData)
  }

  submitForm(data: any) {
    this.betService.submitBet(data.value).subscribe()
  }

}
