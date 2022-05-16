import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  constructor() {}

  getRaces(): unknown {
    throw new Error('Not yet implemented');
  }
}
