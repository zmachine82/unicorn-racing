import { Component, OnInit } from '@angular/core';
import { UnicornService } from '../unicorn.service';

@Component({
  selector: 'app-unicorns-page',
  templateUrl: './unicorns-page.component.html',
  styleUrls: ['./unicorns-page.component.scss']
})
export class UnicornsPageComponent implements OnInit {

  unicorns: any[] = [];

  constructor(private unicornService: UnicornService) { }

  ngOnInit(): void {
    this.unicornService.getAllUnicorns().subscribe(data => {
      console.log('http complete')
      this.unicorns = data
    });
  }

}
