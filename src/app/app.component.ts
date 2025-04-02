import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appMapTester';
}

// src/app/app.component.ts
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   template: '<router-outlet></router-outlet>',
//   standalone: true
// })
// export class AppComponent {}
