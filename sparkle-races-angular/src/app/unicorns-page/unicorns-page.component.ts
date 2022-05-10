import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UnicornService } from '../unicorn.service';


@Component({
  selector: 'app-unicorns-page',
  templateUrl: './unicorns-page.component.html',
  styleUrls: ['./unicorns-page.component.scss']
})
export class UnicornsPageComponent implements OnInit {

  unicorns: any[] = [];

  constructor(private unicornService: UnicornService, private auth: AuthService) { }

  ngOnInit(): void {
    this.unicornService.getAllUnicorns().subscribe(data => {
      this.unicorns = data
    });
  }

  isAdmin() {
    return this.auth.isAdmin()
  }

}
