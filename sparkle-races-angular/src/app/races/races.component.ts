import { Component, OnInit } from '@angular/core';
import { Race } from '../models/race';
import { RaceService } from '../race.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {

races: Race[]=[];

  constructor(private race: RaceService) { }

  ngOnInit(): void {
    this.race.getRaces().subscribe(races => this.races = races)
  }

}

