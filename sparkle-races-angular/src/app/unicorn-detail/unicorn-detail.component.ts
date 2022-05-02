import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnicornService } from '../unicorn.service';

@Component({
  selector: 'app-unicorn-detail',
  templateUrl: './unicorn-detail.component.html',
  styleUrls: ['./unicorn-detail.component.scss']
})
export class UnicornDetailComponent implements OnInit {

  unicorn: any;

  constructor(private unicornService: UnicornService, private route: ActivatedRoute, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.unicornService.getById(params['id']).subscribe(unicorn => { 
        this.unicorn = unicorn
      })
    })
  }

  destroyUnicorn() {
    this.unicornService.destroyById(this.unicorn.id).subscribe(() => {
      this.router.navigate(["/"])
    })
  }

}
