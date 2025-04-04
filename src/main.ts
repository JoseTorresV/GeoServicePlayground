import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  // src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes)]
// }).catch(err => console.error(err));
