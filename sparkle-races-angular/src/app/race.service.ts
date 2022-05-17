import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Race } from './models/race';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  constructor(private http: HttpClient) {}

  getRaces(): Observable<Race[]> {
    return this.http.get<Race[]>('http://localhost:3000/api/v1/races').pipe(map(races => races.map(r => new Race(r))));
  }
}
