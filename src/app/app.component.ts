import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'food-delivery';

  onActivate(event) {
    window.scrollTo(0, 0);
  } 
}
