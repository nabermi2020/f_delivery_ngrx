import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  author: string = 'M.Naberezhnyi';

  constructor() {}

  ngOnInit() {}

  getCurrentYear() {
    return new Date().getFullYear();
  }
}
