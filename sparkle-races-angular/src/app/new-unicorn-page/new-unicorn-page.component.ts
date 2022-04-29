import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UnicornService } from '../unicorn.service';

@Component({
  selector: 'app-new-unicorn-page',
  templateUrl: './new-unicorn-page.component.html',
  styleUrls: ['./new-unicorn-page.component.scss']
})
export class NewUnicornPageComponent implements OnInit {

  constructor(private unicornService: UnicornService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.unicornService.addUnicorn(form.value).subscribe();
  }

}
