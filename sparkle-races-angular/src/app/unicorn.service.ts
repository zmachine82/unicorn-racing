import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnicornService {
  

  constructor(private http: HttpClient) { }

  getAllUnicorns(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/v1/unicorns').pipe(map(x =>  x.filter(y => y.name !== 'jose')))
  }
}
