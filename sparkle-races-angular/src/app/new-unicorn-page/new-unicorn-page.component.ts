import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UnicornService } from '../unicorn.service';

@Component({
  selector: 'app-new-unicorn-page',
  templateUrl: './new-unicorn-page.component.html',
  styleUrls: ['./new-unicorn-page.component.scss']
})
export class NewUnicornPageComponent implements OnInit {

  constructor(private unicornService: UnicornService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.unicornService.addUnicorn(form.value).subscribe(() => {
      this.router.navigate(["/"])
    });
  }

}
